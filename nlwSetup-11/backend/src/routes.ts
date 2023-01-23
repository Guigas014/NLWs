import { FastifyInstance } from 'fastify';
import { prisma } from './lib/prisma';
import { z } from 'zod';
import dayjs from 'dayjs';


export async function appRoutes(app: FastifyInstance) {

  //Cria o hábito com os dias em que será executado.
  app.post('/habits', async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(
        z.number().min(0).max(6)
      )
    })

    //Essa linha chama a validação acima.
    const { title, weekDays } = createHabitBody.parse(request.body);

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        habitWeekDays: {

          create: weekDays.map(day => {
            return {
              week_day: day,
            }
          })
        }
      }
    })
  })

  //Lista os Possiveis habitos de um dia e mostra o id dos habitos completados
  app.get('/day', async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date()
    })

    const { date } = getDayParams.parse(request.query)

    //Pega só o dia da data.
    const day = dayjs(date).get('day')

    const parsedDate = dayjs(date).startOf('day') 


    //Todos hábitos possiveis
    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        habitWeekDays: {
          some: {
            week_day: day,
          }
        }
      },
    })

    const habitsOfDay = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      }
    })

    const completedHabits = habitsOfDay?.dayHabits.map(dayHabit => {
      return dayHabit.habit_id
    }) ?? []


    return { possibleHabits, completedHabits }
  })

  //Busca o dia atual testa se existe hábitos nesse dia
  //e pelo id muda o estado(toggle) do hábito
  app.patch('/habits/:id/toggle', async (request) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    })

    const { id } = toggleHabitParams.parse(request.params)

    const today = dayjs().startOf('day').toDate()

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      }
    })

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        }
      })
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        }
      }
    })

    if (dayHabit) {
      //remover a marcação
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        }
      })
    }
    else {
      //Completar o hábito
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        }
      })
    }
  })

  app.get('/summary', async () => {
    //$queryRaw - indica para o prisma que será usado SQL puro.
    const summary = await prisma.$queryRaw`
      SELECT 
        D.id, 
        D.date,
        (SELECT 
          cast(count(*) as float) 
        FROM day_habits DH WHERE DH.day_id = D.id
        ) as completed, 
        (SELECT 
          cast(count(*) as float) 
        FROM habit_week_days HWD 
        JOIN habits H ON H.id = HWD.habit_id
        WHERE 
          HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
          AND H.created_at <= D.date
        ) as amount
      FROM days D
    `
    
    return summary
  })

}


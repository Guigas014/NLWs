import { FastifyInstance } from 'fastify';
import { prisma } from './lib/prisma';
import { z } from 'zod';
import dayjs from 'dayjs';


export async function appRoutes(app: FastifyInstance) {

  app.post('/habits', async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      habitWeekDays: z.array(
        z.number().min(0).max(6)
      )
    })

    //Essa linha chama a validação acima.
    const { title, habitWeekDays } = createHabitBody.parse(request.body);

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        habitWeekDays: {

          create: habitWeekDays.map(day => {
            return {
              week_day: day,
            }
          })
        }
      }
    })
  })

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
    })


    return { possibleHabits, completedHabits }
  })



}


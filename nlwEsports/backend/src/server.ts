import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

import { convertHourToMinutes } from './utils/convert-hour-to-minutes'
import { convertMinutesToHours } from './utils/convert-minutes-to-hours'



const app = express();

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
  log: ['query']
})


//Listagem de games com contagem de anúncios
app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  })

  return res.json(games);
})

//Criação de novo anúncio
app.post('/games/:id/ads', async (request, res) => {
  const gameId = request.params.id;
  const body: any = request.body;


  const ad = await prisma.ad.create({
    data: {
      gameId: gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourToMinutes(body.hourStart),
      hourEnd: convertHourToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  })

  return res.status(201).json(ad);
})

//Listagem de anúncio por game
app.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
		  name: true,
		  yearsPlaying: true,
		  weekDays: true,
		  hourStart: true,
		  hourEnd: true,
		  useVoiceChannel: true,
    },
    where: {
      gameId: gameId,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  return res.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHours(ad.hourStart),
      hourEnd: convertMinutesToHours(ad.hourEnd)
    }
  }))
})

//Buscar discord pelo ID do anúncio
app.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  })

  return res.json(ad)
})



app.listen(3333, () => console.log("Server is running!"))


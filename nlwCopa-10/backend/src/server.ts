import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { poolRoutes } from './routes/pool'
import { userRoutes } from './routes/user'
import { guessRoutes } from './routes/guess'
import { gameRoutes } from './routes/game'
import { authRoutes } from './routes/auth'



async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  //O secret deve ser uma variável de ambiente.
  await fastify.register(jwt, {
    secret: 'nlwcopa',
  })

  //Pool
  await fastify.register(poolRoutes)

  //User
  await fastify.register(userRoutes)

  //Guess
  await fastify.register(guessRoutes)

  //Game
  await fastify.register(gameRoutes)

  //Auth
  await fastify.register(authRoutes)



  //O host é para o mobile
  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}


bootstrap()


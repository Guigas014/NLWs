import Fastify from 'fastify'
import cors from '@fastify/cors'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient({
  log: ['query'],
})


async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  //quantidade de bolões
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()

    return { count }
  })

  //quantidade de usuários
  fastify.get('/users/count', async () => {
    const count = await prisma.user.count()

    return { count }
  })
  //quantidade de apostas
  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count()

    return { count }
  })

  //Cria o bolão
  fastify.post('/pools', async (request, response) => {
    //validação not null já faz a tipagem(string)
    const createPoolBody = z.object({
      title: z.string(),
    })

    const { title } = createPoolBody.parse(request.body)

    const generate = new ShortUniqueId({ length: 6 })
    const code = String(generate()).toUpperCase()

    await prisma.pool.create({
      data: {
        title,
        code,
      }
    })

    return response.status(201).send({ code })
  })



  //O host é para o mobile
  await fastify.listen({ port: 3333, /*host: '0.0.0.0'*/ })
}


bootstrap()


import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'


export async function userRoutes(fastify: FastifyInstance) {

  //Quantidade de usuários
  fastify.get('/users/count', async () => {
    const count = await prisma.user.count()

    return { count }
  })
}

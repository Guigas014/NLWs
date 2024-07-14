import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import nodemailer from "nodemailer"

import { prisma } from "../lib/prisma"
import { getMailClient } from "../lib/mail"
import { dayjs } from "../lib/dayjs"
import { ClientError } from "../errors/client-error"
import { env } from "../env"

export async function confirmTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/confirm",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { tripId } = request.params

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
        include: {
          participants: {
            where: {
              is_owner: false,
            },
          },
        },
      })

      //Testa se a viagem existe
      if (!trip) {
        throw new ClientError("Trip not found!")
      }

      //Testa se a viagem já está confirmada
      if (trip.is_confirmed) {
        return reply.redirect(`${env.WEB_BASE_URL}/trips/${tripId}`)
      }

      //Confirma a viagem se ainda não estiver confirmada
      await prisma.trip.update({
        where: { id: tripId },
        data: { is_confirmed: true },
      })

      //Busca todos os participantes da viagem
      // const participants = await prisma.participant.findMany({
      //   where: {
      //     trip_id: tripId,
      //     is_owner: false,
      //   },
      // })

      const formattedStartDate = dayjs(trip.starts_at).format("LL")
      const formattedEndDate = dayjs(trip.ends_at).format("LL")

      const mail = await getMailClient()

      await Promise.all(
        trip.participants.map(async (participant) => {
          const confirmationLink = `${env.API_BASE_URL}/participants/${participant.id}/confirm`

          const message = await mail.sendMail({
            from: {
              name: "Equipe plann.er",
              address: "oi@plann.er.com",
            },
            to: participant.email,
            subject: `Confirme sua presença na viagem para ${trip.destination} em ${formattedStartDate}`,
            html: `
            <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
            <p>Você foi convidado(a) para participar de uma viagem para <strong>${trip.destination}</strong>. Nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
            <p></p>
            <p>Para confirmar sua presença na viagem, clique no link abaixo:</p>
            <p></p>
            <p>
                  <a href="${confirmationLink}">Confirmar presença</a>
            </p>
            <p></p>
            <p>Caso esteja usando o dispositivo móvel, você também pode confirmar presença pelos aplicativos:</p>
            <p></p>
            <p>Aplicativo para iPhone</p>
            <p>Aplicativo para Android</p>
            <p></p>
            <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
            </div>
        `.trim(),
          })

          console.log(nodemailer.getTestMessageUrl(message))
        })
      )

      return reply.redirect(`${env.WEB_BASE_URL}/trips/${tripId}`)
    }
  )
}

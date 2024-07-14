import fastify from "fastify"
import cors from "@fastify/cors"
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"

import { createTrip } from "./routes/create-trip"
import { confirmTrip } from "./routes/confirm-trip"
import { confirmParticipant } from "./routes/confirm-participant"
import { createActivity } from "./routes/create-activity"
import { listActivities } from "./routes/list-activities"
import { createLink } from "./routes/create-link"
import { listLinks } from "./routes/list-links"
import { listParticipants } from "./routes/list-participants"
import { createInvite } from "./routes/create-invite"
import { updateTrip } from "./routes/update-trip"
import { listTripDetails } from "./routes/list-trip-details"
import { listParticipant } from "./routes/list-participant"
import { errorHandler } from "./error-handler"
import { env } from "./env"
// import { prisma } from "./lib/prisma"

const app = fastify()

app.register(cors, {
  origin: env.WEB_BASE_URL,
})

//Para essas linhas o ZOD deve estar instalados
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

//Tratamento dos error
app.setErrorHandler(errorHandler)

//Rotas
app.register(createTrip)
app.register(confirmTrip)
app.register(updateTrip)
app.register(listTripDetails)

app.register(confirmParticipant)
app.register(listParticipants)
app.register(listParticipant)

app.register(createActivity)
app.register(listActivities)

app.register(createLink)
app.register(listLinks)

app.register(createInvite)

// app.get("/cadastrar", async () => {
//   await prisma.trip.create({
//     data: {
//       destination: "Paris",
//       starts_at: new Date(),
//       ends_at: new Date(),
//     },
//   })

//   return "Registro cadastrado com sucesso!!"
// })

// app.get("/listar", async () => {
//   const trips = await prisma.trip.findMany()

//   return trips
// })

app.listen({ port: env.PORT }).then(() => {
  console.log("Server is running!!")
})

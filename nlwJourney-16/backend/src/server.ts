import fastify from "fastify"
import cors from "@fastify/cors"
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"

import { createTrip } from "./routes/create-trip"
import { confirmTrip } from "./routes/confirm-trip"
// import { prisma } from "./lib/prisma"

const app = fastify()

app.register(cors, {
  origin: "http://localhost:3000",
})

//Para essas linhas o ZOD deve estar instalados
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

//Rotas
app.register(createTrip)
app.register(confirmTrip)

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

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running!!")
})

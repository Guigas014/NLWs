import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod"

import { env } from "./env.ts"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: "http://localhost:5173",
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get("/health", () => {
  return "OK"
})

app.listen({ port: env.PORT }).then(() => {
  console.log("HTTP server is running!!")
})

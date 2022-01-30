import "dotenv/config"
import express from 'express' 
import http from "http"
import cors from 'cors'

import { Server } from 'socket.io'

import { router } from "./routes"


const app = express() 
app.use(cors())

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
})

io.on("connection", socket => {
  console.log(`Usuário conectado no socket ${socket.id}`)
})

app.use(express.json())

app.use(router);


// requisição do login
app.get('/github', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
}) 

// requisição do callback(retorno) do login
app.get("/signin/callback", (req, res) => {
  const { code } = req.query;

  return res.json(code)
})

//serverHttp.listen(3000, () => console.log('Server is running'))
export { serverHttp, io }


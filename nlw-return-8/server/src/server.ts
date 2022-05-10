import express from 'express' 
import nodemailer from 'nodemailer'

import { prisma } from './prisma'


const app = express() 

app.use(express.json())

//Configuração do envio de email
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "cc88ddcb185987",
    pass: "29b031168c8b07"
  }
});


app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prisma.feedback.create({
    data: {
      type: type,
      comment: comment,
      screenshot: screenshot,
    }
  })
  
  // Envio do email
  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Guilherme <guilherme-allves@hotmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
      `</div>`
    ].join('\n')  
  })


  return res.status(201).json({ data: feedback })
}) 



app.listen(3333, () => console.log('Server is running'))


import express from 'express'

import { FeedbackService } from './services/feedback-service'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository'
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter'


export const routes = express.Router()


//Configuração do envio de email
//const transport = nodemailer.createTransport({
  //host: "smtp.mailtrap.io",
  //port: 2525,
  //auth: {
    //user: "cc88ddcb185987",
    //pass: "29b031168c8b07"
  //}
//});


routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()


  const feedbackService = new FeedbackService(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  ) 
  
  await feedbackService.execute({
    type,
    comment,
    screenshot,
  })


  // Envio do email
  //await transport.sendMail({
    //from: 'Equipe Feedget <oi@feedget.com>',
    //to: 'Guilherme <guilherme-allves@hotmail.com>',
    //subject: 'Novo feedback',
    //html: [
      //`<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        //`<p>Tipo do feedback: ${type}</p>`,
        //`<p>Comentário: ${comment}</p>`,
      //`</div>`
    //].join('\n')  
  //})


  return res.status(201).send()
}) 



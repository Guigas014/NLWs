import { MailAdapter, SendMailData } from '../mail-adapter'
import nodemailer from 'nodemailer'


//Configuração do envio de email
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "cc88ddcb185987",
    pass: "29b031168c8b07"
  }
});


export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {

  // Envio do email
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Guilherme <guilherme-allves@hotmail.com>',
      subject: subject,
      html: body 
    })
  };
}


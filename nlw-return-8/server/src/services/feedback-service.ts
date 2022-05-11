import { FeedbacksRepository } from '../repositories/feedbacks-repository'
import { MailAdapter } from '../adapters/mail-adapter'


interface FeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}


export class FeedbackService {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}


  async execute(request: FeedbackServiceRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
          `<p>Tipo do feedback: ${type}</p>`,
          `<p>Comentário: ${comment}</p>`,
          screenshot ? 
            `<img 
              style="width: 200px; height: 200px; border: solid transparent; border-radius: 10px; " 
              src="${screenshot}" 
            />` 
          : null,
        `</div>`
      ].join('\n')  
    })
  }
}

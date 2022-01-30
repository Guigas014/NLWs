import { Request, Response } from "express";
import { ProfileUserService } from "../services/ProfileUserService";


class ProfileUserController {
  async handle(req: Request, res: Response) {
    const { user_id } = req
    const service = new ProfileUserService()  
    
    const result = await service.execute(user_id)

    return res.json(result);

    //try {
    //} catch (err) {
      //return res.json({ error:err.message })
    //}
  }
}

export { ProfileUserController }


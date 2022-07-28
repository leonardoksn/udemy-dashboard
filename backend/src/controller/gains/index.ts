import { Request, Response } from 'express'
import { sql } from './sql'

async function gains(req: Request, res: Response) {
  try {
    const gains = await sql()

    return res.status(200).send(gains)
  } catch (error) {
    return res.status(400).send({ status: 'error', error: error })
  }
}

export default gains

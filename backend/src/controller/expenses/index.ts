import { Request, Response } from 'express'
import { sql } from './sql'

async function expenses(req: Request, res: Response) {
  try {
    const expenses = await sql()

    return res.status(200).send(expenses)
  } catch (error) {
    return res.status(404).send({ status: 'error', error: error })
  }
}

export default expenses

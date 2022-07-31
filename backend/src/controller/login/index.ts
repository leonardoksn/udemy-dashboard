import { Request, Response } from 'express'
import { User } from '../../models/User'
// import db from '../../../infra/db'
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // validation
  if (!email) {
    return res.status(422).json({ status: 'error', error: "O email é obrigatório" })
  }
  if (!password) {
    return res.status(422).json({ status: 'error', error: "A senha é obrigatória" })
  }
  //check if user exists

  const user = await User.findOne({ email: email })

  if (!user) {
    return res.status(422).json({ status: 'error', error: "Usuário não encontrado" })
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password)

  if (!checkPassword) {
    return res.status(422).json({ status: 'error', error: "Senha inválida" })
  }


  try {
    const secret = process.env.SECRET;

    const token = sign({
      id: user._id
    },
      String(secret))

    return res.status(200).send({ msg: "Autenticação realizada com sucesso!", token })

  } catch (error) {

    return res.status(404).send({ status: 'error', error: error })

  }
}

export { login }

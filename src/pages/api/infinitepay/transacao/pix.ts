import axios from 'axios'
import { randomUUID } from 'crypto'

import NextCors from 'nextjs-cors'
export default async function handler(req: any, res: any) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  try {
    const { amount } = req.body

    const token = req.headers.authorization.split(' ')[1]

    const uuid = randomUUID()

    const result = await axios.post(
      'https://api.infinitepay.io/v2/transactions',
      {
        amount: amount,
        capture_method: 'pix',
        metadata: {
          origin: 'criscell',
          payment_method: 'pix',
          order_id: uuid,
          callback: {
            validate: `https://www.criscell.com.br/validation_callback?order_id=${uuid}`,
            confirm: `https://www.criscell.com.br/confirmation_callback?order_id=${uuid}`,
            secret: uuid,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return res
      .status(200)
      .json({ error: false, message: 'sucesso!', results: result.data })
  } catch (error: any) {
    console.log(error)
    res.status(500).json(error)
  }
}


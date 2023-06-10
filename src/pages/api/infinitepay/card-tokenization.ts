import axios from 'axios'

import NextCors from 'nextjs-cors'
export default async function handler(req: any, res: any) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  try {
    //get bearer authorization

    const token = req.headers.authorization.split(' ')[1]

    const { number, expiration_month, expiration_year } = req.body
    /*    const authorization = req. */
    const result = await axios.post(
      'https://authorizer.infinitepay.io/v2/cards/tokenize',
      {
        number: number,
        expiration_month: expiration_month,
        expiration_year: expiration_year,
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
    res.status(error.response.status).json({
      error: true,
      message: error.response.data.message,
    })
  }
}


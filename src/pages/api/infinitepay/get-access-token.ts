import axios from 'axios'
import NextCors from 'nextjs-cors'

interface IScope {
  scope: 'card_tokenization' | 'transactions'
}

export default async function handler(req: any, res: any) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  try {
    const query = req.query
    const { scope }: { scope: IScope } = query

    const result = await axios.post(
      'https://api.infinitepay.io/v2/oauth/token',
      {
        grant_type: 'client_credentials',
        client_id: process.env.INFINITY_CLIENT_ID,
        client_secret: process.env.INFINITY_PAY_SECRET,
        scope: scope,
      }
    )

    return res
      .status(200)
      .json({ error: false, message: 'sucesso!', results: result.data })
  } catch (error: any) {
    console.log('getAccessToken', error)
    res.status(error.response.status).json(error.response.data)
  }
}


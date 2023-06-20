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
    const client = require('twilio')(
      process.env.TWILIO_ACCOUNT_SID as string,
      process.env.TWILIO_AUTH_TOKEN as string
    )

    const response = await client.messages
      .create({
        body: 'Obrigado por entrar em contato conosco, aguarde alguns minutos que entraremos em contato.',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5521989578285',
      })
      .done()

    return res
      .status(200)
      .json({ error: false, message: 'sucesso!', results: response })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: true,
      message: 'Erro ao enviar mensagem',
      results: error,
    })
  }
}


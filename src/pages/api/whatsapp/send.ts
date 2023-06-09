import axios from 'axios'
import NextCors from 'nextjs-cors'
import twilio from 'twilio'
export default async function handler(req: any, res: any) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  try {
    const client = twilio(
      process.env.TWILIO_API_SID,
      process.env.TWILIO_AUTH_TOKEN,
      { accountSid: process.env.TWILIO_ACCOUNT_SID }
    )

    const {
      name,
      document_number,
      email,
      phone,
      address,
      shipping_company_name,
      shipping_amount,
      shipping_time,
    } = req.body

    const response = await client.messages
      .create({
        body: `**NOTIFICAÇÂO** Um cliente acabou de preencher o formulário, por favor, verifique a sua conta do banco para confirmar o pagamento. Nome: ${name}  CPF: ${document_number}  Frete: ${shipping_amount}, ${shipping_company_name},  Email: ${email}  Telefone: ${phone} Endereço: ${address} TEMPO DE ENTREGA => ${shipping_time} dias`,
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
      message: `${error}`,
      results: error,
    })
  }
}


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
    const {
      fingerprint, //
      payment_token, //
      amount, //
      cvv, //
      card_holder_name, //
      document_number,
      fist_name,
      last_name,
      email,
      phone_number,
      address,
      complement,
      city,
      state,
      country,
      zip,
      payer_ip, //
      card_token,
      installments,
    } = req.body

    const token = req.headers.authorization.split(' ')[1]

    const result = await axios.post(
      'https://api.infinitepay.io/v2/transactions',
      {
        payment: {
          amount: amount * 100,
          capture_method: 'ecommerce',
          payment_method: 'credit',
          installments: 1,
        },
        card: {
          token: card_token,
          cvv: cvv,
          card_holder_name: card_holder_name,
        },
        customer: {
          document_number: document_number,
          first_name: fist_name,
          last_name: last_name,
          email: email,
          phone_number: phone_number,
          address: complement,
          complement: complement,
          city: city,
          state: state,
          zip: zip,
          country: country,
        },
        order: {
          id: 'pedido-1234',
          amount: amount * 100,
          items: [
            {
              id: 'item1',
              description: 'criscell - detector de curto',
              quantity: 1,
              amount: amount * 100,
            },
          ],
          delivery_details: {
            document_number: document_number,
            name: card_holder_name,
            email: email,
            phone_number: phone_number,
            address: {
              line1: address,
              line2: complement,
              city: city,
              state: state,
              country: country,
              zip: zip,
            },
          },
        },
        billing_details: {
          document_number: document_number,
          name: card_holder_name,
          email: email,
          phone_number: phone_number,
          address: {
            line1: address,
            line2: complement,
            city: city,
            state: state,
            country: country,
            zip: zip,
          },
        },
        metadata: {
          origin: 'criscell.com.br',
          store_url: 'https://www.criscell.com.br/',
          risk: {
            session_id: fingerprint,
            payer_ip: payer_ip,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          acept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    console.log(result)
    return res
      .status(200)
      .json({ error: false, message: 'sucesso!', results: result.data })
  } catch (error: any) {
    console.log(error.response.data)
    res.status(error.response.status).json({
      error: true,
      message: error.response.data.message,
      results: [],
    })
  }
}


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

    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMDA0NjIwLCJzY29wZSI6InRyYW5zYWN0aW9uIiwiZXhwIjoxNjg2NDYzNjAxfQ.wKnxEimupPKrvOvYNSjwCNEF9OsK467cDUDJ2i1CTGQ'
    console.log(token)
    const result = await axios.post(
      'https://api.infinitepay.io/v2/transactions',
      /* {
        payment: {
          amount: amount * 10,
          capture_method: 'ecommerce',
          payment_method: 'credit',
        },
        card: {
          cvv: cvv,
          token: payment_token,
          card_holder_name: card_holder_name,
        },
        customer: {
          document_number: document_number,
          first_name: fist_name,
          last_name: last_name,
          email: email,
          phone_number: phone_number,
          address: address,
          complement: complement,
          city: city,
          state: state,
          country: country,
          zip: zip,
        },
        order: {
          id: randomUUID(),
          amount: amount * 10,
          items: [
            {
              id: 1,
              description: 'Criscell, detector de curto-circuito',
              quantity: 1,
              amount: amount * 10,
            },
          ],
          delivery_details: {
            email: email,
            name: card_holder_name,
            phone_number: phone_number,
            address: {
              line1: complement,
              line2: complement,
              city: city,
              state: state,
              country: 'BR',
              zip: zip,
            },
          },
        },
        billing_details: {
          document_number: document_number,
          email: email,
          name: card_holder_name,
          phone_number: phone_number,
          address: {
            line1: complement,
            line2: state,
            city: city,
            state: state,
            country: 'BR',
            zip: zip,
          },
        },
        metadata: {
          origin: 'Criscell - Detectores de curto-circuito',
          store_url: 'https://www.criscell.com.br/',
          risk: {
            session_id: fingerprint,
            payer_ip: payer_ip,
          },
        },
      }, */
      {
        payment: {
          amount: 1000,
          capture_method: 'ecommerce',
          payment_method: 'credit',
          installments: installments,
        },
        card: {
          cvv: cvv,
          token: card_token,
          card_holder_name: card_holder_name,
        },
        customer: {
          document_number: document_number,
          first_name: fist_name,
          last_name: last_name,
          email: email,
          phone_number: document_number,
          address: complement,
          complement: complement,
          city: city,
          state: state,
          country: 'BR',
          zip: zip,
        },
        order: {
          id: 'pedido-1234',
          amount: 1000,
          items: [
            {
              id: 'item1',
              description: 'Item1',
              quantity: 2,
              amount: 500,
            },
          ],
          delivery_details: {
            email: email,
            name: card_holder_name,
            phone_number: document_number,
            address: {
              line1: address,
              line2: complement,
              city: city,
              state: state,
              country: 'BR',
              zip: zip,
            },
          },
        },
        billing_details: {
          document_number: '01234567890',
          email: 'pagador@provider.com',
          name: card_holder_name,
          phone_number: document_number,
          address: {
            line1: address,
            line2: complement,
            city: city,
            state: state,
            country: 'BR',
            zip: zip,
          },
        },
        metadata: {
          origin: 'Criscell - Detectores de curto-circuito',
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
        },
      }
    )

    return res
      .status(200)
      .json({ error: false, message: 'sucesso!', results: result.data })
  } catch (error: any) {
    console.log('credit', error)
    res.status(500).json(error)
  }
}


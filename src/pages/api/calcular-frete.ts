import NextCors from 'nextjs-cors'
import MelhorEnvioSdk from 'melhor-envio'
export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  try {
    const { cep_origem, cep_destino, peso, altura, largura, comprimento } =
      req.body
    const me = new MelhorEnvioSdk({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      sandbox: true,
      bearer: process.env.NEXT_PUBLIC_CLIENT_BEARER,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      request_scope:
        'cart-read cart-write companies-read companies-write coupons-read coupons-write notifications-read orders-read products-read products-write purchases-read shipping-calculate shipping-cancel shipping-checkout shipping-companies shipping-generate shipping-preview shipping-print shipping-share shipping-tracking ecommerce-shipping transactions-read users-read users-write webhooks-read webhooks-write',
      state: 'BPMDruWTWzd',
    })

    const result = await me.shipment.calculate({
      from: {
        postal_code: cep_origem as string,
        address: 'Rua Arco-íres',
        number: '24',
      },
      to: {
        postal_code: cep_destino as string,
        address: 'Rua Pomba Branca',
        number: '18',
      },
      package: {
        weight: peso,
        width: largura,
        height: altura,
        length: comprimento,
      },
      options: {
        insurance_value: 300,
        receipt: false,
        own_hand: false,
        collect: false,
      },
    })
    if (result.status === 200) {
      const serializedData = result.data.map((item: any) => {
        return {
          name: `${item.name}`,
          price: item.price,
          logo_company_url: item.company.picture,
          delivery_time: item.delivery_time,
        }
      })

      return res
        .status(200)
        .json({ error: false, message: 'sucesso!', results: serializedData })
    }
  } catch (error: any) {
    res.status(error.response.status).json(error.response.data)
  }
}


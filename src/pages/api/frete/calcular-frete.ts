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
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      sandbox: false,
      bearer: process.env.CLIENT_BEARER,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,

      state: 'BPMDruWTWzd',
    })

    const result = await me.shipment.calculate({
      from: {
        postal_code: cep_origem as string,
      },
      to: {
        postal_code: cep_destino as string,
      },
      package: {
        weight: peso,
        width: largura,
        height: altura,
        length: comprimento,
      },
      options: {
        custom_delivery_time: 1,
        insurance_value: 0,
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


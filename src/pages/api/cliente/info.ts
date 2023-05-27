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
    const me = new MelhorEnvioSdk({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      sandbox: true,
      bearer: process.env.CLIENT_BEARER,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      request_scope:
        'cart-read cart-write companies-read companies-write coupons-read coupons-write notifications-read orders-read products-read products-write purchases-read shipping-calculate shipping-cancel shipping-checkout shipping-companies shipping-generate shipping-preview shipping-print shipping-share shipping-tracking ecommerce-shipping transactions-read users-read users-write webhooks-read webhooks-write',
      state: 'BPMDruWTWzd',
    })

    const result = await me.user.me()

    return res
      .status(200)
      .json({ error: false, message: 'sucesso!', results: result.data })
  } catch (error: any) {
    res.status(error.response.status).json(error.response.data)
  }
}


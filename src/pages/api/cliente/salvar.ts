import NextCors from 'nextjs-cors'
import connection from '../../../database/mongodb/connection'
import { NextRequest, NextResponse } from 'next/server'
export default async function handler(req: any, res: any) {
  interface ILeads {
    zip: string
    city: string
    number: string
    state: string
    complement: string
    address: string
    email: string
    phone_number: string
    cardholder_cpf: string
    name: string
    created_at: Date
  }
  await NextCors(req, res, {
    // Options
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  try {
    let data: ILeads = req.body
    const currentDate = new Date()
    data = { ...data, created_at: currentDate }

    const { db, client } = await connection()

    // salvando no banco de dados
    const result = await db.collection('leads').insertOne(data)

    return res
      .status(200)
      .json({ error: false, message: 'sucesso!', results: result })
  } catch (error: any) {
    res.status(error.response.status).json(error.response.data)
  }
}


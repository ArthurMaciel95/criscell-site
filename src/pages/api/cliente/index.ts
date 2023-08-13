import NextCors from 'nextjs-cors'
import connection from '../../../database/mongodb/connection'
import { NextRequest, NextResponse } from 'next/server'
export default async function handler(req: any, res: any) {
  interface ILeads {
    cep: string
    cidade: string
    numero: string
    estado: string
    complemento: string
    bairro: string
    email: string
    telefone: string
    cpf: string
    nome_completo: string
  }
  await NextCors(req, res, {
    // Options
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  try {
    const { db, client } = await connection()

    // pegando informações do banco de dados mongodb
    const result = await db
      .collection('leads')
      .find(
        {},
        {
          sort: { _id: -1 },
        }
      )
      .toArray()

    console.log(result)

    return res
      .status(200)
      .json({ error: false, message: 'sucesso!', results: result })
  } catch (error: any) {
    res.status(error.response.status).json(error.response.data)
  }
}


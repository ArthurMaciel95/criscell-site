import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

interface ILead {
  _id: string

  zip: string
  name: string
  city: string
  number: string
  email: string
  phone_number: string
  cardholder_cpf: string
  address: string
  complement: string
  state: string

  created_at: string
}

const Leads = () => {
  const router = useRouter()
  const [leads, setLeads] = useState<ILead[]>([])

  async function getLeads() {
    try {
      const response = await fetch('/api/cliente')
      const leads = await response.json()
      setLeads(leads.results)

      console.log(leads)
    } catch (err) {
      console.log(err)
      toast.error('Erro ao buscar Contatos')
    }
  }

  function verifyIfExistsTokeninLocalStorage() {
    if (!localStorage.getItem('token')) {
      router.push('/login')
    }
  }

  useEffect(() => {
    verifyIfExistsTokeninLocalStorage()
    getLeads()
  }, [])

  return (
    <main className="main_container ">
      <div className="mt-32 mb-10">
        {leads.length ? (
          <table className="table-auto  w-full text-sm hidden md:block">
            <thead className="bg-gray-800 text-white">
              <tr className="text-left p-2">
                <th className="p-2">Data</th>
                <th className="p-2">Nome</th>
                <th className="p-2">Email</th>
                <th className="p-2">Telefone</th>
                <th className="p-2">Cpf</th>
                <th className="p-2">Endereço</th>
                <th className="p-2">Complemento</th>
              </tr>
            </thead>
            <tbody className="text-white/80">
              {leads &&
                leads?.map((lead) => {
                  return (
                    <tr
                      key={lead?.data?._id}
                      className="hover:bg-gray-700 cursor-pointer border-b border-gray-700"
                    >
                      <td
                        className={`p-2 ${!lead.created_at && 'text-red-500'}`}
                      >
                        {lead?.created_at
                          ? new Date(lead.created_at).toLocaleDateString(
                              'pt-BR'
                            )
                          : 'Não informado'}
                      </td>
                      <td className="p-2">{lead?.data?.name}</td>
                      <td className="p-2">{lead?.data?.email}</td>
                      <td className="p-2">{lead?.data?.phone_number}</td>
                      <td className="p-2">{lead?.data?.cardholder_cpf}</td>
                      <td className="p-2">{`${lead?.data?.address} - ${lead?.data?.city}, ${lead?.data?.state}`}</td>
                      <td className="p-2">{lead?.data?.complement}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        ) : (
          <p className="text-white text-center">Carregando....</p>
        )}
        <div className="md:hidden block">
          <div className="text-white">
            {leads &&
              leads.map((lead) => {
                return (
                  <div
                    key={lead?.data?._id}
                    className="border-b border-gray-700"
                  >
                    <p
                      className={`p-2 ${
                        !lead?.created_at && 'text-red-500'
                      }   `}
                    >
                      {lead?.created_at
                        ? new Date(lead?.created_at).toLocaleDateString('pt-BR')
                        : 'Não informado'}
                    </p>
                    <p className="p-2">nome: {lead?.data?.name}</p>
                    <p className="p-2">email: {lead?.data?.email}</p>
                    <p className="p-2">telefone: {lead?.data?.phone_number}</p>
                    <p className="p-2">CPF: {lead?.data?.cardholder_cpf}</p>
                    <p className="p-2">
                      Endereço:{' '}
                      {`${lead?.data?.address} - ${lead?.data?.city}, ${lead?.data?.state}`}
                    </p>
                    <p className="p-2">Complemento: {lead?.data?.complement}</p>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Leads


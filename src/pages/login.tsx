import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const Leads = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  function handleForm(e: any) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (
        form.email === 'criscell@contato.com.br' &&
        form.password === 'admin'
      ) {
        setLoading(false)
        localStorage.setItem('token', '1h1k2j1h2k3j1l23jh12l3jh')
        toast.success('Logado com sucesso')
        router.push('/leads')
      } else {
        setLoading(false)
        toast.error('Email ou senha incorretos')
      }
    }, 2000)
  }

  useEffect(() => {
    console.log(form)
  }, [form])
  return (
    <main className="main_container ">
      <div className="mt-32 mb-10 max-w-screen-md">
        <h1 className="text-white text-4xl mb-5 max-w-[500px]">
          Faça o login para ter funções de administrador
        </h1>
        <form action="">
          <div className="flex gap-10 flex-col">
            <div className="md:col-span-2 col-span-5  text-white">
              <label>Email *</label>
              <input
                name="email"
                className="input-text"
                type="email"
                placeholder="Seu email"
                onChange={handleForm}
                value={form.email}
              />
            </div>
            <div className="md:col-span-2 col-span-5 text-white">
              <label>Senha *</label>

              <input
                name="password"
                type="password"
                placeholder="Sua senha"
                className="input-text"
                onChange={handleForm}
                value={form.password}
              />
            </div>
          </div>
          <button
            className="py-3 mt-4 px-6 bg-brand-green-400 text-white font-semibold text-xl rounded-lg disabled:bg-brand-gray-50 disabled:cursor-not-allowed"
            onClick={(e) => {
              handleSubmit(e)
            }}
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default Leads


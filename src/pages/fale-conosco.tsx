import React from 'react'
import { Icon } from '@iconify/react'
import ReactInputMask from 'react-input-mask'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import axios from 'axios'
const FaleConosco = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  async function handlePost(data) {
    const toastId = toast.loading('Aguarde...')

    try {
      const formatPhone = data.telefone.replace(' ', '')
      data.telefone = formatPhone
      console.log(formatPhone)
      const result = await axios.post('/api/fale-conosco', data)
      toast.success('mensagem enviada com sucesso!')
      reset({
        nome: '',
        email: '',
        tipo: '',
        assunto: '',
        telefone: '',
        texto: '',
      })
      window.scrollTo(0, 0)
    } catch (error) {
      toast.error(error.response.data.message)
      toast.dismiss(toastId)
    }
    toast.dismiss(toastId)
  }
  return (
    <div className="my-9">
      {/* Breadcrumbs */}
      <div className="bg-brand-blue-500 py-8 mt-28 md:mt-44">
        <div className="main_container">
          <h3 className="text-white text-2xl font-bold mb-4">Fale Conosco</h3>

          <div className="relative py-3">
            <div className="overflow-x-auto pb-4 w-full absolute">
              <div className="text-white font-light flex items-center gap-2 whitespace-nowrap">
                <span className="text-white">Você está em Home</span>

                <Icon icon="ep:arrow-right-bold" width={20} />

                <span className="text-white font-bold">Fale Conosco</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="main_container">
          <div className="flex flex-col lg:flex-row mb-2">
            <div className="flex flex-col w-full lg:w-1/2">
              <div className="mb-6 text-white">
                <p className="text-brand-blue-700 text-2xl font-normal mb-2">
                  Mande sua mensagem e estaremos retornando o mais breve
                  possível
                </p>
                <p>
                  Utilize também nossos canais de atendimento: Facebook,
                  instagram, whatsapp, e-mail ou memos nossos números
                  comerciais.
                </p>
              </div>
              <div className="py-4 border-b-2 border-brand-blue-500 mb-4">
                <p className="text-2xl font-semibold text-white">Endereço</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="w-full lg:w-1/2 p-2 flerx flex-col lg:flex-row text-center md:text-start text-white">
                  <p className="text-brand-black-50 font-semibold">
                    Unidade Praça Brasil
                  </p>
                  <a
                    href="https://goo.gl/maps/YJ8AMzJmFRGnCgjD9"
                    target="_blanc"
                  >
                    Rua D. Pedro I, nº 1000
                  </a>
                  <p>Belém-PA</p>
                </div>
                {/*    <div className="w-full lg:w-1/2 p-2 text-center md:text-start">
                  <p className="text-brand-black-50 font-semibold">Unidade Cidade Nova</p>
                  <a href="https://goo.gl/maps/1dC765sYUbNGFJ5C7" target="_banc">Cidade Nova IV, Tv. SN 17,Nº 152-C, entre WE 30 e WE 31</a>
                  <p>Ananindeua-PA</p>
                </div> */}
                <div className="w-full lg:w-1/2 p-2 text-center md:text-start text-white">
                  <p className=" font-semibold">Canais de Atendimento</p>
                  <div className="flex flex-col">
                    {/*   <a href="tel:+559133463106">(91) 3346-3106</a> */}
                    <a
                      href="https://api.whatsapp.com/send?phone=5591993743000"
                      target="_blank"
                      rel="noreferrer"
                    >
                      (91) 99374-3000 (Whatsapp)
                    </a>
                  </div>
                  <a href="mailto:site@artmil.com.br">site@artmil.com.br</a>
                </div>
              </div>
            </div>

            <div className="p-4 w-full lg:w-1/2">
              <form action="" onSubmit={handleSubmit(handlePost)}>
                <label className="flex flex-col items-center mb-3 ">
                  <input
                    className="input-default w-full"
                    type="text"
                    placeholder="Nome"
                    {...register('nome', { required: true })}
                  />
                  {errors.nome && (
                    <span className="text-red-500 label-float">
                      O Nome é obrigatório
                    </span>
                  )}
                </label>
                <label className="flex flex-col items-center mb-3 ">
                  <ReactInputMask
                    mask={'(99)99999-9999'}
                    type="text"
                    placeholder="(99) 99999-9999"
                    className="input-default w-full"
                    {...register('telefone', { required: true })}
                  />
                  {/*  <input
                    className="input-default w-full"
                    type="number"
                    placeholder="Telefone"
                    
                  /> */}
                  {errors.telefone && (
                    <span className="text-red-500 flex label-float">
                      O Telefone é obrigatório
                    </span>
                  )}
                </label>
                <label className="flex flex-col items-center mb-3 ">
                  <input
                    className="input-default w-full"
                    type="email"
                    placeholder="Email"
                    {...register('email', { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-500 label-float">
                      O Email é obrigatório
                    </span>
                  )}
                </label>
                <label className="flex flex-col items-center mb-3 ">
                  <input
                    className="input-default w-full"
                    type="text"
                    placeholder="Assunto"
                    {...register('assunto', { required: true })}
                  />
                  {errors.assunto && (
                    <span className="text-red-500 label-float">
                      O Assunto é obrigatório
                    </span>
                  )}
                </label>
                <label className="flex flex-col items-center mb-3">
                  <select
                    className="p-2 w-full bg-transparent border border-[#c7c7c7] rounded-none h-[58px] flex items-center justify-between input-default"
                    {...register('tipo', { required: true })}
                  >
                    <option value="">Selecione um Setor</option>
                    <option value="ADMINISTRACAO">Administrativo</option>
                    <option value="FINANCEIRO">Financeiro</option>
                    <option value="VENDAS">Vendas</option>
                  </select>

                  {errors.tipo && (
                    <span className="text-red-500 label-float">
                      O Setor é obrigatório
                    </span>
                  )}
                </label>
                <label className="flex flex-col items-center mb-3">
                  <textarea
                    {...register('texto', { required: true })}
                    className="textarea flex-col textarea-bordered text-brand-gray-100 py-3 font-normal px-4 border w-full mb-6"
                    placeholder="Mensagem"
                  ></textarea>
                  {errors.texto && (
                    <span className="text-red-500 label-float">
                      O texto é obrigatório
                    </span>
                  )}
                </label>
                <div className="mb-4">{/* <Hcaptcha /> */}</div>

                {isSubmitting ? (
                  <span className="btn h-14 text-white bg-brand-blue-500 hover:bg-brand-blue-700 rounded-none px-10 py-3">
                    loading...
                  </span>
                ) : (
                  <button className="btn h-14 text-white bg-brand-blue-500 hover:bg-brand-blue-700 rounded-none px-10 py-3">
                    Enviar
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FaleConosco


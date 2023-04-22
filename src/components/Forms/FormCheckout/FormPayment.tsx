import React, { useEffect, useState } from 'react'
import { Label } from '../components/Label'
import { TextForm } from '../components/TextForm'
import { useForm } from 'react-hook-form'
import { TextFormMask } from '../components/TextFormMask'
import SelectInput from '../components/SelectInput'
import { useFetch } from '../../../services/useFetch'
import axios from 'axios'
export const FormPayment = ({ step, setStep }: { step: 1 | 2 | 3 }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  interface IState {
    cep: string
    logradouro: string
    complemento: string
    bairro: string
    localidade: string
    uf: string
    ibge: string
    gia: string
    ddd: string
    siafi: string
  }

  /*   if (typeof window !== 'undefined') {
    const cepLocalStorage = JSON.parse(
      window.localStorage.getItem('selectedShipping')
    ).cep
    setCepState(cepLocalStorage)
  } */

  const { data: cep, error }: { data: IState; error: any } = useFetch(
    `https://viacep.com.br/ws/${'22710255'}/json/`
  )

  async function handlePayment() {
    try {
    } catch (error) {
      console.log(error)
    }
  }

  async function getCardToken() {
    try {
      const response = await axios.get('/infinitepay/card-token')

      setAccessTokenIpay(response.data.data.access_token)
    } catch (error) {
      alert(
        'Ocorreu um erro ao finalizar sua transação, tente novamente, se o erro persistir entre em contato com o suporte'
      )
      console.log(
        'Serviço indisponível no momento, tenta outra forma de pagamento, por favor.'
      )
    }
  }

  async function generateForm() {
    var ipay = new IPay({ access_token: accessTokenIpay })

    ipay.listeners = {
      'result:success': function () {
        postTransaction()
      },
      'result:error': function (errors) {
        alert(
          'Ocorreu um erro ao finalizar sua transação, tente novamente, se o erro persistir entre em contato com o suporte'
        )
        console.log(errors) // erro da tokenização, mostra no console
      },
    }

    ipay.generate(formElement.current)
  }

  console.log(watch('cidade'))

  return (
    <form
      action=""
      onSubmit={handleSubmit(handlePayment)}
      className="mt-5 gap-4"
    >
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          <div className="md:col-span-3 col-span-5">
            <TextForm
              name="name"
              label="Nome"
              errors={errors}
              register={register}
              disabled={false}
              placeholder="ex: João da Silva"
            />
          </div>
          <div className="md:col-span-2 col-span-5 ">
            <TextFormMask
              name="cpf"
              label="CPF"
              mask="999.999.999-99"
              errors={errors}
              register={register}
              disabled={false}
              placeholder="999.999.999-99"
            />
          </div>
          <div className="md:col-span-2 col-span-5">
            <TextForm
              name="cidade"
              label="Cidade"
              errors={errors}
              value={cep?.localidade}
              register={register}
              disabled={false}
              placeholder="Selecione uma cidade"
            />
          </div>
          <div className="md:col-span-3 col-span-5">
            <TextForm
              name="estado"
              label="Estado"
              errors={errors}
              value={cep?.uf}
              register={register}
              disabled={false}
              placeholder="Selecione uma estado"
            />
          </div>

          <div className="md:col-span-1 col-span-3">
            <TextForm
              name="number"
              label="Número"
              errors={errors}
              register={register}
              disabled={false}
              placeholder=""
            />
          </div>
          <div className="md:col-span-2 col-span-3">
            <TextForm
              name="complemento"
              label="Complemento"
              errors={errors}
              register={register}
              disabled={false}
              placeholder=""
            />
          </div>
          <div className="md:col-span-2 col-span-3">
            <TextForm
              name="bairro"
              label="Bairro"
              errors={errors}
              register={register}
              disabled={false}
              placeholder=""
            />
          </div>
          <div className="md:cols-span-2 col-span-5 flex justify-end">
            <button
              className="py-3 px-6 bg-brand-green-400 text-white font-semibold text-xl rounded-lg disabled:bg-brand-gray-50 disabled:cursor-not-allowed"
              onClick={() => setStep((step) => step + 1)}
              disabled={
                watch('name') === '' ||
                watch('cpf') === '' ||
                watch('cidade') === '' ||
                watch('estado') === '' ||
                watch('number') === '' ||
                watch('complemento') === '' ||
                watch('bairro') === ''
              }
            >
              Avançar
            </button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col">
          <h4 className="text-white font-bold text-2xl mb-6">
            Escolha o método de pagamento
          </h4>
          <table className="mt-6">
            <thead>
              <tr>
                <th className="text-white font-bold text-xl"></th>
                <th className="text-white font-bold text-xl"></th>
                <th className="text-white font-bold text-xl text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="radio"
                    name="credit"
                    id="1"
                    className="h-4 w-4"
                  />
                </td>
                <td className="flex justify-center">
                  <img src="/img/cartao.png" alt="" className="w-[180px]" />
                </td>
                <td className="text-white font-light">Cartão de Crédito</td>
              </tr>
              <tr>
                <td>
                  <input type="radio" name="pix" id="2" className="h-4 w-4" />
                </td>
                <td className="flex justify-center">
                  <img src="/img/pix.png" alt="" className="w-[100px]" />
                </td>
                <td className="text-white font-light">Pix</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between">
            <button
              className="py-3 px-6 bg-brand-gray-50/20 text-white font-semibold text-xl rounded-lg w-fit"
              onClick={() => setStep((step) => step - 1)}
            >
              Voltar
            </button>
            <button
              className="py-3 px-6 bg-brand-green-400 text-white font-semibold text-xl rounded-lg w-fit"
              onClick={() => setStep((step) => step + 1)}
            >
              Avançar
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          <div className="md:col-span-3 col-span-5">
            <TextForm
              data-ip="card-holder-name"
              name="cardholder_name"
              label="Nome completo do titular"
              errors={errors}
              register={register}
              disabled={false}
              required={true}
              placeholder="ex: João da Silva"
            />
          </div>
          <div className="md:col-span-2 col-span-5 ">
            <TextFormMask
              data-ip="card-holder-document"
              name="cardholder_cpf"
              label="CPF do titular"
              mask="999.999.999-99"
              errors={errors}
              register={register}
              disabled={false}
              required={true}
              placeholder="999.999.999-99"
            />
          </div>
          <div className="md:col-span-3 col-span-5">
            <TextForm
              data-ip="card-number"
              name="number"
              label="Número do cartão"
              errors={errors}
              register={register}
              disabled={false}
              required={true}
              placeholder="ex: 5256 6325 4015 6687"
            />
          </div>
          <div className="md:col-span-2 col-span-5">
            <TextForm
              data-ip="card-cvv"
              name="cvv"
              label="CVV"
              errors={errors}
              register={register}
              disabled={false}
              required={true}
              placeholder=" ex: 398"
            />
          </div>

          <div className="md:col-span-2 col-span-3">
            <TextForm
              data-ip="card-expiration-month"
              name="expiration_month"
              label="Mês de expiração"
              errors={errors}
              register={register}
              disabled={false}
              required={true}
              placeholder=""
            />
          </div>
          <div className="md:col-span-2 col-span-3">
            <TextForm
              data-ip="card-expiration-year"
              name="expiration_year"
              label="Ano de expiração"
              errors={errors}
              register={register}
              disabled={false}
              required={true}
              placeholder=""
            />
          </div>
          <div className="md:col-span-2 col-span-3">
            <TextForm
              name="bairro"
              label="Bairro"
              errors={errors}
              register={register}
              disabled={false}
              placeholder=""
            />
          </div>
          <div className="md:cols-span-2 col-span-5 flex justify-end">
            <button
              className="py-3 px-6 bg-brand-green-400 text-white font-semibold text-xl rounded-lg w-full"
              onClick={generateForm}
            >
              Realizar pagamento
            </button>
          </div>
        </div>
      )}
    </form>
  )
}


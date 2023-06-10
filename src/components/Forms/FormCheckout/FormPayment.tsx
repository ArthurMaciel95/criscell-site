import React, { useEffect, useRef, useState } from 'react'
import { Label } from '../components/Label'
import { TextForm } from '../components/TextForm'
import { useForm } from 'react-hook-form'
import { TextFormMask } from '../components/TextFormMask'
import SelectInput from '../components/SelectInput'
import { useFetch } from '../../../services/useFetch'
import { Icon } from '@iconify/react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { getIp } from '../../../helpers/getIp'
import { AddressForm } from './AddressForm'
import { PaymentMethodForm } from './PaymentMethodForm'
import { CreditCardForm } from './CreditCardForm'
export const FormPayment = ({
  step,
  setStep,
  cepDigited,
}: {
  step: 1 | 2 | 3
}) => {
  const [cep, setCep] = useState('')
  const [accessTokenIpay, setAccessTokenIpay] = useState('')
  const [accessTokenTransation, setAccessTokenTransation] = useState('')
  const [paymentToken, setPaymentToken] = useState('')
  const formElement = useRef(null)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [loading, setLoading] = useState(false)
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
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

  useEffect(() => {
    getCardToken()
  }, [])

  useEffect(() => {
    if (cepDigited) {
      getCep(cepDigited)
    }
  }, [watch('cep')])

  async function getCep(e: string) {
    try {
      const { data: cep } = await axios.get(
        `https://viacep.com.br/ws/${e}/json/`
      )
      reset({
        cep: cep.cep,
        cidade: cep.localidade,
        bairro: cep.bairro,
        complemento: cep.logradouro,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function handlePayment() {
    try {
    } catch (error) {
      console.log(error)
    }
  }

  async function getCardToken() {
    try {
      const response = await axios.get(
        '/api/infinitepay/get-access-token?scope=card_tokenization'
      )

      setAccessTokenIpay(response.data.results.access_token)
    } catch (error) {
      toast.error(error.message)
    }
  }

  async function getAccessTokenTransation() {
    try {
      const response = await axios.get(
        '/api/infinitepay/get-access-token?scope=transaction'
      )

      setAccessTokenTransation(response.data.results.access_token)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  async function cardTokenization() {
    try {
      const response = await axios.post(
        '/api/infinitepay/card-tokenization',
        {
          number: '5502098506232160',
          expiration_month: '05',
          expiration_year: '29',
        },
        {
          headers: {
            Authorization: `Bearer ${accessTokenIpay}`,
          },
        }
      )
      setPaymentToken(response.data.results.token)
      if (response.error) {
        toast.error(response.message)
      }
      console.log(response)
    } catch (error: any) {
      toast.error(error.message)
      console.log(error)
    }
  }

  async function generateForm() {
    await cardTokenization()
    var ipay = new IPay({ access_token: accessTokenIpay })

    ipay.listeners = {
      'result:success': function () {
        postTransaction()
      },
      'result:error': function (error: any) {
        /*     alert(
          'Ocorreu um erro ao finalizar sua transação, tente novamente, se o erro persistir entre em contato com o suporte'
        ) */
        toast.error(error.message)
        console.log(error) // erro da tokenização, mostra no console
      },
    }

    ipay.generate(formElement.current)
  }

  async function postTransaction() {
    setLoading(true)
    await getAccessTokenTransation()
    const payer_ip = await getIp()

    console.log(formElement)

    try {
      const response = await axios.post(
        `/api/infinitepay/transacao/credit`,
        {
          amount: 10,
          payment_token: paymentToken,
          cvv: '352',
          card_holder_name: 'ARTHUR NOGUEIRA MACIEL ROCHA',
          document_number: '15931601783',
          fist_name: 'Arthur',
          last_name: 'Rocha',
          email: 'arthurnmrocha@gmail.com',
          phone_number: '11955551111',
          address: 'Rua 1',
          complement: 'taquara, perto do portão amarelo',
          city: 'Rio de Janeiro',
          state: 'RJ',
          country: 'BR',
          zip: '22710255',
          payer_ip: payer_ip.ip,
          /* card_token: formElement.current.elements['ip[token]'].value, */
          fingerprint: formElement.current.elements['ip[session_id]'].value,
          parcelas: 1,
        },
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessTokenTransation}`,
          },
        }
      )
      console.log(response)
      toast.success('Pagamento realizado com sucesso')

      setLoading(false)
    } catch (error) {
      setLoading(false)

      toast.error(`${error}`)
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <form
      action="#"
      onSubmit={handleSubmit(handlePayment)}
      className="mt-5 gap-4"
      data-ip="form"
      ref={formElement}
    >
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          {/*  <div className="md:col-span-3 col-span-5">
      <TextForm
        name="name"
        label="Nome"
        errors={errors}
        register={register}
        disabled={false}
        placeholder="ex: João da Silva"
      />
    </div> */}
          {/* <div className="md:col-span-2 col-span-5 ">
      <TextFormMask
        name="cpf"
        label="CPF"
        mask="999.999.999-99"
        errors={errors}
        register={register}
        disabled={false}
        placeholder="999.999.999-99"
      />
    </div> */}
          <div className="md:col-span-2 col-span-5  text-white">
            <label>CEP *</label>
            <input
              name="cep"
              type="text"
              className="input-text"
              data-ip="cep"
              placeholder="ex: 99999-999"
              maxLength={8}
            />
          </div>
          <div className="md:col-span-2 col-span-5 text-white">
            <label>Cidade *</label>
            <input
              data-ip="cidade"
              name="cidade"
              type="text"
              placeholder="Selecione uma cidade"
              className="input-text"
            />
          </div>
          <div className="md:col-span-1 col-span-3 text-white">
            <label>Número *</label>
            <input
              data-ip="numero"
              name="number"
              type="text"
              placeholder=""
              className="input-text"
            />
          </div>
          <div className="md:col-span-2 col-span-5 text-white">
            <label>Estado *</label>
            <input
              data-ip="estado"
              name="estado"
              type="text"
              placeholder="Selecione uma estado"
              className="input-text"
            />
          </div>

          <div className="md:col-span-3 col-span-3 text-white">
            <label>Complemento *</label>
            <input
              name="complemento"
              data-ip="complemento"
              type="text"
              className="input-text"
            />
          </div>
          <div className="md:col-span-3 col-span-3 text-white">
            <label>Bairro *</label>
            <input
              name="bairro"
              type="text"
              data-ip="bairro"
              className="input-text"
              placeholder="ex: Centro"
            />
          </div>
          <div className="md:col-span-2 col-span-3 text-white">
            <label>Email *</label>
            <input
              name="email"
              data-ip="email"
              type="text"
              className="input-text"
            />
          </div>
          <div className="md:col-span-2 col-span-3 text-white">
            <label>Telefone *</label>
            <input
              name="phone_number"
              data-ip="phone_number"
              type="text"
              className="input-text"
            />
          </div>
          <div className="md:cols-span-2 col-span-5 flex justify-end">
            <button
              className="py-3 px-6 bg-brand-green-400 text-white font-semibold text-xl rounded-lg disabled:bg-brand-gray-50 disabled:cursor-not-allowed"
              onClick={() => setStep((step) => step + 1)}
              disabled={false}
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
                    name="payment-method"
                    onClick={() => setPaymentMethod('credit')}
                    className="h-4 w-4"
                    checked={paymentMethod === 'credit'}
                  />
                </td>
                <td className="flex justify-center">
                  <img src="/img/cartao.png" alt="" className="w-[180px]" />
                </td>
                <td className="text-white font-light">Cartão de Crédito</td>
              </tr>
              <tr>
                <td>
                  <input
                    id="credit"
                    type="radio"
                    name="payment-method"
                    onClick={() => setPaymentMethod('pix')}
                    className="h-4 w-4"
                    disabled={true}
                    checked={paymentMethod === 'pix'}
                  />
                </td>

                <td className="flex justify-center">
                  <img
                    src="/img/pix.png"
                    alt=""
                    className="w-[100px] brightness-50"
                  />
                </td>
                <td className="text-white/50 font-light">Pix (indisponível)</td>
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
              className="py-3 px-6 bg-brand-green-400 text-white font-semibold text-xl rounded-lg w-fit disabled:bg-brand-gray-50 disabled:cursor-not-allowed"
              onClick={() => setStep((step) => step + 1)}
              disabled={paymentMethod === ''}
            >
              Avançar
            </button>
          </div>
        </div>
      )}

      {step === 3 && paymentMethod === 'credit' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          <input
            type="text"
            data-ip="method"
            value="credit_card"
            className="hidden"
          />
          <div className="md:col-span-3 col-span-5">
            {/*  <TextForm
          data-ip="card-holder-name"
          name="cardholder_name"
          label="Nome completo do titular"
          errors={errors}
          register={register}
          disabled={false}
          required={true}
          placeholder="ex: João da Silva"
        /> */}
            <div className="flex flex-col text-white">
              <label>Nome completo do titular</label>
              <input
                type="text"
                data-ip="card-holder-name"
                name="cardholder_name"
                className="input-text"
                placeholder=" "
              />
            </div>
          </div>
          <div className="md:col-span-2 col-span-5 ">
            <div className="flex flex-col text-white">
              <label>CPF do titular</label>
              <input
                type="text"
                data-ip="card-holder-document"
                name="cardholder_cpf"
                placeholder=" "
                className="mask-cpf input-text"
              />
            </div>
            {/*  <TextFormMask
          data-ip="card-holder-document"
          name="cardholder_cpf"
          label="CPF do titular"
          mask="999.999.999-99"
          errors={errors}
          register={register}
          disabled={false}
          required={true}
          placeholder="999.999.999-99"
        /> */}
          </div>
          <div className="md:col-span-3 col-span-5 flex flex-col text-white">
            <label>Número do Cartão</label>
            <input
              type="text"
              data-ip="card-number"
              name="number"
              placeholder=" "
              className="mask-number-card input-text"
              value="5502098506232160"
            />

            {/* <TextForm
          data-ip="card-number"
          name="number"
          label="Número do cartão"
          errors={errors}
          register={register}
          disabled={false}
          required={true}
          placeholder="ex: 5256 6325 4015 6687"
        /> */}
          </div>
          <div className="md:col-span-2 col-span-5">
            <div className="text-white flex flex-col">
              <label>CVV</label>
              <input
                type="text"
                data-ip="card-cvv"
                name="cvv"
                placeholder=" "
                className="mask-cvv text-black input-text"
              />
            </div>
            {/*   <TextForm
          data-ip="card-cvv"
          name="cvv"
          label="CVV"
          errors={errors}
          register={register}
          disabled={false}
          required={true}
          placeholder=" ex: 398"
        /> */}
          </div>

          <div className="md:col-span-2 col-span-3">
            <div className="flex flex-col text-white">
              <label>Mês de expiração</label>
              <input
                type="text"
                data-ip="card-expiration-month"
                name="expiration_month"
                placeholder=" "
                className="mask-mes text-black input-text"
                value={'01'}
                maxLength={2}
              />
            </div>
            {/*  <TextForm
          data-ip="card-expiration-month"
          name="expiration_month"
          label="Mês de expiração"
          errors={errors}
          register={register}
          disabled={false}
          required={true}
          placeholder=""
        /> */}
          </div>
          <div className="md:col-span-2 col-span-3">
            <div className="text-white flex flex-col">
              <label>Ano de expiração</label>
              <input
                type="text"
                data-ip="card-expiration-year"
                name="expiration_year"
                placeholder=" "
                className="mask-ano input-text"
                value={'25'}
                maxLength={2}
              />
            </div>
            {/*   <TextForm
          data-ip="card-expiration-year"
          name="expiration_year"
          label="Ano de expiração"
          errors={errors}
          register={register}
          disabled={false}
          required={true}
          placeholder=""
        /> */}
          </div>

          <div className="md:cols-span-2 col-span-5 flex justify-between">
            <button
              className="py-3 px-6 bg-brand-gray-50/20 text-white font-semibold text-xl rounded-lg w-fit"
              onClick={() => setStep((step) => step - 1)}
            >
              Voltar
            </button>
            <button
              className="py-3 px-6 bg-brand-green-400 text-white font-semibold text-xl rounded-lg w-fit"
              onClick={generateForm}
              disabled={isSubmitting}
            >
              {loading ? 'carregando' : 'Realizar pagamento'}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}


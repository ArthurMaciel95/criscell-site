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
import { state } from '../../../helpers/states'
/* import { cities } from '../../../helpers/cities' */

interface IForm {
  zip: string
  city: string
  number: string
  state: string
  complement: string
  address: string
  email: string
  phone_number: string
  cardholder_name: string
  cardholder_cpf: string
  card_number: string
  card_cvv: string
  card_expiration_month: string
  card_expiration_year: string
  installments: number
}
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
  const [form, setForm] = useState<IForm>({
    zip: '',
    city: '',
    number: '',
    state: '',
    complement: '',
    address: '',
    email: '',
    phone_number: '',
    cardholder_name: '',
    cardholder_cpf: '',
    card_number: '',
    card_cvv: '',
    card_expiration_month: '',
    card_expiration_year: '',
    installments: 1,
  })
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
    if (cepDigited && step === 1) {
      getCep(cepDigited)
    }
  }, [step])

  async function getCep(e: string) {
    try {
      const { data: cep } = await axios.get(
        `https://viacep.com.br/ws/${e}/json/`
      )

      form.zip = cep.cep
      form.city = cep.localidade
      form.address = cep.bairro
      form.complement = cep.logradouro
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
        '/api/infinitepay/get-access-token?scope=transaction',
        {
          headers: {
            Authorization: `Bearer ${accessTokenIpay}`,
          },
        }
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

  function handleForm(e: any) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  async function generateForm() {
    setLoading(true)

    await cardTokenization()
    var ipay = new IPay({ access_token: accessTokenIpay })
    console.log(ipay)
    ipay.listeners = {
      'result:success': function () {
        postTransaction()
      },
      'result:error': function (error: any) {
        alert(
          'Ocorreu um erro ao finalizar sua transação, tente novamente, se o erro persistir entre em contato com o suporte'
        )
        toast.error(error.message)
        console.log(error) // erro da tokenização, mostra no console
      },
    }

    ipay.generate(formElement.current)
  }

  async function postTransaction() {
    const id = toast.loading('Processando pagamento...')
    await getAccessTokenTransation()
    const payer_ip = await getIp()
    const formPayment = document.forms[0]

    const payload = {
      amount: 10,
      payment_token: paymentToken,
      cvv: form.card_cvv,
      card_holder_name: form.cardholder_name,
      document_number: form.cardholder_cpf,

      email: form.email,
      phone_number: form.phone_number,
      address: form.address + ' ' + form.number,
      complement: form.complement,
      city: form.city,
      state: form.state,
      country: 'BR',
      zip: form.zip,
      payer_ip: payer_ip.ip,
      card_token: formPayment.querySelector('input[name="ip[token]"]').value,
      fingerprint: formPayment.querySelector('input[name="ip[session_id]"]')
        .value,
      installments: form.installments,
    }
    console.log(payload)

    try {
      const response = await axios.post(
        `/api/infinitepay/transacao/credit`,
        payload,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessTokenTransation}`,
          },
        }
      )

      toast.remove(id)
      toast.success('Pagamento realizado com sucesso!')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.remove(id)

      toast.error(error.response.statusText)
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <form
      action="#"
      onSubmit={handleSubmit(generateForm)}
      className="mt-5 gap-4"
      data-ip="form"
      ref={formElement}
      id="credit-card-form"
    >
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          <div className="md:col-span-2 col-span-5  text-white">
            <label>CEP *</label>
            <input
              name="zip"
              type="text"
              className="input-text"
              data-ip="zip"
              placeholder="ex: 99999-999"
              maxLength={8}
              value={form.zip}
              onChange={handleForm}
            />
          </div>
          <div className="md:col-span-2 col-span-5 text-white">
            <label>Cidade *</label>

            <input
              data-ip="city"
              name="city"
              type="text"
              placeholder="Selecione uma cidade"
              className="input-text"
              onChange={handleForm}
              value={form.city}
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
              onChange={handleForm}
              value={form.number}
            />
          </div>
          <div className="md:col-span-2 col-span-5 text-white">
            <label>Estado *</label>
            <select
              name="state"
              data-ip="state"
              className="input-text"
              onChange={handleForm}
              value={form.state}
            >
              {state.map((state) => (
                <option key={state.sigla} value={state.sigla}>
                  {state.sigla}
                </option>
              ))}
            </select>
            {/*             <input
              data-ip="state"
              name="state"
              type="text"
              placeholder="Selecione uma estado"
              className="input-text"
            /> */}
          </div>

          <div className="md:col-span-3 col-span-3 text-white">
            <label>Complemento *</label>
            <input
              name="complement"
              data-ip="complement"
              type="text"
              className="input-text"
              onChange={handleForm}
              value={form.complement}
            />
          </div>
          <div className="md:col-span-3 col-span-3 text-white">
            <label>Bairro *</label>
            <input
              name="address"
              type="text"
              data-ip="address"
              className="input-text"
              placeholder="ex: Centro"
              onChange={handleForm}
              value={form.address}
            />
          </div>
          <div className="md:col-span-2 col-span-3 text-white">
            <label>Email *</label>
            <input
              name="email"
              data-ip="email"
              type="text"
              className="input-text"
              onChange={handleForm}
              value={form.email}
            />
          </div>
          <div className="md:col-span-2 col-span-3 text-white">
            <label>Telefone *</label>
            <input
              name="phone_number"
              data-ip="phone_number"
              type="text"
              className="input-text"
              onChange={handleForm}
              value={form.phone_number}
            />
          </div>
          <div className="md:cols-span-2 col-span-5 flex justify-end">
            <button
              className="py-3 px-6 bg-brand-green-400 text-white font-semibold text-xl rounded-lg disabled:bg-brand-gray-50 disabled:cursor-not-allowed"
              onClick={() => setStep((step) => step + 1)}
              disabled={
                form.zip === '' ||
                form.city === '' ||
                form.state === '' ||
                form.address === '' ||
                form.number === '' ||
                form.complement === '' ||
                form.email === '' ||
                form.phone_number === ''
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
            <div className="flex flex-col text-white">
              <label>Nome completo do titular</label>
              <input
                type="text"
                data-ip="card-holder-name"
                name="cardholder_name"
                className="input-text"
                placeholder=" "
                onChange={handleForm}
                value={form.cardholder_name}
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
                onChange={handleForm}
                value={form.cardholder_cpf}
              />
            </div>
          </div>
          <div className="md:col-span-3 col-span-5 flex flex-col text-white">
            <label>Número do Cartão</label>
            <input
              type="text"
              data-ip="card-number"
              name="card_number"
              placeholder=" "
              className="mask-number-card input-text"
              value="5502098506232160"
              onChange={handleForm}
            />
          </div>
          <div className="md:col-span-2 col-span-5">
            <div className="text-white flex flex-col">
              <label>CVV</label>
              <input
                type="text"
                data-ip="card-cvv"
                name="card_cvv"
                placeholder=" "
                className="mask-cvv text-black input-text"
                onChange={handleForm}
                value={form.card_cvv}
              />
            </div>
          </div>

          <div className="md:col-span-2 col-span-3">
            <div className="flex flex-col text-white">
              <label>Mês de expiração</label>
              <input
                type="text"
                data-ip="card-expiration-month"
                name="card_expiration_month"
                placeholder=" "
                className="mask-mes text-black input-text"
                onChange={handleForm}
                value={form.card_expiration_month}
                maxLength={2}
              />
            </div>
          </div>
          <div className="md:col-span-2 col-span-3">
            <div className="text-white flex flex-col">
              <label>Ano de expiração</label>
              <input
                type="text"
                data-ip="card-expiration-year"
                name="card_expiration_year"
                placeholder=" "
                className="mask-ano input-text"
                maxLength={2}
                onChange={handleForm}
                value={form.card_expiration_year}
              />
            </div>
          </div>
          <div className="md:col-span-1 col-span-3">
            <div className="text-white flex flex-col">
              <label htmlFor="parcelas">Parcelas</label>
              <select
                name="installments"
                id="installments"
                className="input-text"
                onChange={handleForm}
                value={form.installments}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>
          <div className="md:cols-span-2 col-span-5 flex justify-between">
            <button
              className="py-3 px-6 bg-brand-gray-50/20 text-white font-semibold text-xl rounded-lg w-fit"
              onClick={() => setStep((step) => step - 1)}
            >
              Voltar
            </button>
            <button
              className="py-3 min-w-[228px] flex items-center justify-center px-6 bg-brand-green-400 text-white font-semibold text-xl rounded-lg w-fit"
              type="submit"
              disabled={isSubmitting}
            >
              {loading ? (
                <Icon
                  icon="eos-icons:bubble-loading"
                  color="white"
                  fontSize={28}
                />
              ) : (
                'Realizar pagamento'
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}


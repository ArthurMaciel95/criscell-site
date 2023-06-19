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
import { useRouter } from 'next/router'
/* import { cities } from '../../../helpers/cities' */

interface IPix {
  error: false
  message: string
  results: {
    data: {
      id: string
      type: string
      attributes: {
        nsu: string
        nsu_host: string
        card_brand: string
        card_pin_mode: null
        br_code: string
        metadata: {
          origin: string
          payment_method: string
          order_id: string
          callback: {
            validate: string
            confirm: string
            secret: string
          }
          billing_details: {}
        }
        authorization_id: null
        authorization_reason: null
        created_at: Date
        authorization_code: string
      }
    }
  }
}

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
  installments?: number
}
export const FormPayment = ({
  step,
  setStep,
  cepDigited,
  productValue,
}: {
  step: 1 | 2 | 3
  setStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>
  cepDigited: string
  productValue: any
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
    /*  installments: 1, */
  })
  const [copySuccess, setCopySuccess] = useState('Copiar Código')
  const [copyIconSuccess, setCopyIconSuccess] = useState(
    <Icon icon="iconamoon:copy" className="mr-2" />
  )
  const textCopy = useRef(null)
  const [pix, setPix] = useState('')
  const router = useRouter()
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
    getAccessTokenTransation()
  }, [])

  useEffect(() => {
    if (cepDigited && step === 1) {
      getCep(cepDigited)
    }
  }, [step, cepDigited])

  async function getCep(e: string) {
    try {
      const { data: cep } = await axios.get(
        `https://viacep.com.br/ws/${e}/json/`
      )
      console.log(cep)
      form.zip = cep.cep
      form.city = cep.localidade
      form.address = cep.bairro
      form.complement = cep.logradouro
      form.state = cep.uf
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

  async function getPixCode() {
    if (step !== 3 && paymentMethod !== 'pix') return

    setLoading(true)

    try {
      /*  cleanCart() */
      const response: IPix = await axios.post(
        `/api/infinitepay/transacao/pix`,
        {
          amount: productValue.price_pix,
        },
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessTokenTransation}`,
          },
        }
      )
      console.log(response)
      /*  setDataTransaction(response.data.data.transacao) */
      setPix(response.data.results.data.attributes.br_code)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getPixCode()
  }, [step])

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
        '/api/infinitepay/get-access-token?scope=transactions',
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
          number: form.card_number,
          expiration_month: form.card_expiration_month,
          expiration_year: form.card_expiration_year,
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

    ipay.listeners = {
      'result:success': async function () {
        await postTransaction()
      },
      'result:error': function (error: any) {
        setLoading(false)
        alert(
          'Ocorreu um erro ao finalizar sua transação, tente novamente, se o erro persistir entre em contato com o suporte'
        )
        toast.error(error.message)
        console.log(error) // erro da tokenização, mostra no console
      },
    }

    ipay.generate(formElement.current)
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(textCopy.current.innerText)
    setCopySuccess('Copiado!')
    setCopyIconSuccess(
      <Icon icon="mingcute:check-2-fill" className="mr-2 text-green-500" />
    )
  }

  async function postTransaction() {
    const id = toast.loading('Processando pagamento...')
    const payer_ip = await getIp()
    const formPayment = document.forms[0]

    const payload = {
      amount: productValue.price,
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
      /*  installments: form.installments, */
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

      router.push('/payment-success')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.remove(id)

      toast.error(error.response.data.message)
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
                    onClick={() =>
                      /* setPaymentMethod('credit') */ window.open(
                        `https://pay.infinitepay.io/sanceleletronica/480/`,
                        '_blank'
                      )
                    }
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
                    checked={paymentMethod === 'pix'}
                  />
                </td>

                <td className="flex justify-center">
                  <img src="/img/pix.png" alt="" className="w-[100px] " />
                </td>
                <td className="text-white ">
                  <p className="font-light">
                    {' '}
                    Pix{' '}
                    <span className="bg-brand-green-400 ml-4 text-white font-normal p-1 rounded-md">
                      Recomendado
                    </span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between">
            {/*  <button
              className="py-3 px-6 bg-brand-gray-50/20 text-white font-semibold text-xl rounded-lg w-fit"
              onClick={() => setStep((step) => step - 1)}
            >
              Voltar
            </button> */}
            <button
              className="py-3 px-6 bg-brand-green-400 text-white font-semibold text-xl rounded-lg w-fit disabled:bg-brand-gray-50 disabled:cursor-not-allowed"
              onClick={() => setStep((step) => step + 1)}
              disabled={paymentMethod !== 'pix'}
            >
              Avançar
            </button>
          </div>
        </div>
      )}
      {step === 3 && paymentMethod === 'pix' && (
        <>
          {pix ? (
            <div>
              <div className="p-4 w-full md:w-3/4 text-white">
                <ul className="">
                  <li className="mb-8">
                    1.Copie a chave Pix abaixo;
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src={`https://gerarqrcodepix.com.br/api/v1?brcode=${pix}`}
                        alt="chave pix"
                      />
                      <div className="max-w-[420px] p-3 overflow-hidden border-white/40 rounded-md my-3">
                        <p
                          ref={textCopy}
                          className="mb-4 text-sm font-semibold text-brand-blue-700 outline-0"
                          style={{ wordBreak: 'break-all' }}
                        >
                          {pix}
                        </p>
                      </div>
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center rounded-full border-2 outline-0 px-4 py-2"
                      >
                        {copyIconSuccess}
                        {copySuccess}
                      </button>
                    </div>
                  </li>
                  <li className="mb-4">
                    2. Abra o app do seu banco e encontre a opção de pagamento
                    &quot;Pix&quot;
                  </li>
                  <li className="mb-4">
                    3. Selecione a função colar, verifique os detalhes e
                    finalize o pedido;
                  </li>
                  <li className="mb-4">
                    4. Após a confirmação, envie o comprovante de compra
                    informando seu
                    <strong className="ml-1">Nome completo</strong> e{' '}
                    <strong>E-mail</strong> para um dos contatos abaixo:
                  </li>
                  <li className="mb-4">
                    Email:{' '}
                    <a
                      href="mailto:comprovante@artmil.com.br"
                      className="font-semibold text-brand-blue-700"
                    >
                      celio9@hotmail.com
                    </a>
                  </li>
                  <li className="mb-4">
                    Whatsapp:{' '}
                    <a
                      href="https://api.whatsapp.com/send?phone=553597632886"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-brand-blue-700"
                    >
                      (35) 9763-2886
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              <h2>Carregando pix...</h2>
            </>
          )}
        </>
      )}

      {step === 3 && paymentMethod === 'credit' && (
        <>
          <div className="flex flex-col items-start py-2 bg-brand-blue-500 p-4 rounded-md my-2">
            <p className=" text-white">
              Para realizar pagamento parcelado contatar no número:{' '}
            </p>
            <div className="flex text-white">
              <a
                href="https://api.whatsapp.com/send?phone=553597632886"
                target="_blank"
                rel="noreferrer"
                className="flex"
              >
                <Icon
                  icon="ic:twotone-whatsapp"
                  color="white"
                  className="mr-2 text-2xl"
                />
                <p>(35) 9763-2886</p>
              </a>
            </div>
          </div>
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
                  maxLength={3}
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
                value={form.card_number}
                onChange={handleForm}
              />
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
            {/* <div className="md:col-span-2 col-span-3">
            <div className="text-white flex flex-col">
              <label htmlFor="parcelas">Parcelas</label>
              <select
                name="installments"
                id="installments"
                className="input-text py-2 px-4"
                onChange={handleForm}
                value={form.installments}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                  <option
                    key={item}
                    className="text-base"
                    value={item}
                  >{`${item}x de ${new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(Number(productValue?.price / item))} `}</option>
                ))}
              </select>
            </div>
          </div> */}
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
                id="submit"
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
        </>
      )}
    </form>
  )
}


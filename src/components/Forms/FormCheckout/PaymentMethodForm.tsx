import React from 'react'

interface IProps {
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>
  paymentMethod: string
}

export const PaymentMethodForm = ({
  setPaymentMethod,
  paymentMethod,
}: IProps) => {
  return (
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
  )
}


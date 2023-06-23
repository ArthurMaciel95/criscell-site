import React from 'react'

export const StepperCheckout = ({ step = 1 }: { step: 1 | 2 | 3 }) => {
  return (
    <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 flex">
      <li
        className={`flex items-center md:flex-row flex-col md:text-left text-center ${
          step === 1 ? 'text-blue-600 ' : 'text-gray-500 '
        } space-x-2.5`}
      >
        <span
          className={`flex items-center justify-center w-8 h-8 border ${
            step === 1
              ? 'border-blue-600 '
              : step > 1
              ? ' border-green-400 bg-green-700 text-white font-bold'
              : 'border-gray-500 '
          } rounded-full shrink-0 `}
        >
          1
        </span>
        <span
          className={`${
            step === 1
              ? 'border-blue-600 '
              : step > 1
              ? ' border-green-400 text-green-700  font-bold'
              : 'border-gray-500 '
          }`}
        >
          <h3 className="font-medium leading-tight">Endereço</h3>
          <p className="text-sm">Informações Pessoais</p>
        </span>
      </li>
      <li
        className={`flex items-center h-full md:flex-row flex-col md:text-left text-center ${
          step === 2 ? 'text-blue-600 ' : 'text-gray-500 '
        } md:space-x-2.5`}
      >
        <span
          className={`flex items-center justify-center w-8 h-8 border ${
            step === 2
              ? 'border-blue-600 '
              : step > 2
              ? ' border-green-400 bg-green-700 text-white font-bold'
              : 'border-gray-500 '
          } rounded-full shrink-0 `}
        >
          2
        </span>
        <span
          className={`${
            step === 2
              ? 'border-blue-600 '
              : step > 2
              ? ' border-green-400 text-green-700  font-bold'
              : 'border-gray-500 '
          }`}
        >
          <h3 className="font-medium leading-tight">Metodo de Pagamento</h3>
          <p className="text-sm">Escolha um metodo</p>
        </span>
      </li>
      <li
        className={`flex items-center md:flex-row flex-col md:text-left text-center ${
          step === 3 ? 'text-blue-600 ' : 'text-gray-500 '
        } space-x-2.5`}
      >
        <span
          className={`flex items-center justify-center w-8 h-8 border ${
            step === 3
              ? 'border-blue-600 '
              : step > 3
              ? ' border-green-400 bg-green-700 text-white font-bold'
              : 'border-gray-500 '
          } rounded-full shrink-0 `}
        >
          3
        </span>
        <span
          className={`${
            step === 3
              ? 'border-blue-600 '
              : step > 3
              ? ' border-green-400 text-green-700  font-bold'
              : 'border-gray-500 '
          }`}
        >
          <h3 className="font-medium leading-tight">Pagamento</h3>
          <p className="text-sm">Finalização</p>
        </span>
      </li>
    </ol>
  )
}


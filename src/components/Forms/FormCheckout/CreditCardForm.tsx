import React from 'react'

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>
  isSubmitting: boolean
  loading: boolean
  generateForm: () => void
}

export const CreditCardForm = ({
  setStep,
  isSubmitting,
  loading,
  generateForm,
}: IProps) => {
  return (
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
  )
}


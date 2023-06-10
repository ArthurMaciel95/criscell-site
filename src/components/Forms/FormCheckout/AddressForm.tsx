import React from 'react'

export const AddressForm = ({ setStep }) => {
  return (
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
  )
}


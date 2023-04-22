import React from 'react'

export const InfoCheckout = ({ productValue }: { productValue: any }) => {
  return (
    <>
      <h4 className="text-white font-bold mb-2">RESUMO</h4>
      <div className="flex my-5">
        <img
          src="/img/produto/p1.png"
          alt=""
          className="aspect-square rounded-md h-[100px] "
        />
        <div className="ml-3">
          <p className="text-white/70 mb-2">
            <strong className="text-white">Marca:</strong> Criscell
          </p>
          <p className="text-white/70">
            <strong className="text-white">Descricão:</strong> Aparelho medidos
            de curto.
          </p>
        </div>
      </div>
      <p className="font-light text-white/70">
        Valor do produto:{' '}
        <span className="text-green-600 font-bold">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(450)}
        </span>
      </p>
      <p className="font-light text-white/70">
        Frete:{' '}
        <span className="font-bold text-white">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(productValue?.shippingInfo.price ?? 0)}
        </span>
      </p>
      <span className="bg-white/10 w-full h-[1px] flex my-4"></span>
      <div className="p-4 bg-brand-green-400 rounded-md">
        <h2>
          <strong>TOTAL: </strong>
          <strong className="font-bold text-white">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(productValue?.price ?? 0)}
          </strong>
        </h2>
      </div>
    </>
  )
}


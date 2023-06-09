import { Icon } from '@iconify/react'
import React from 'react'

export const InfoCheckout = ({ productValue }: { productValue: any }) => {
  return (
    <>
      <h4 className="text-white font-bold mb-2">RESUMO</h4>
      <div className="flex my-5">
        <img
          src="/img/produto/aparelho-5-.png"
          alt=""
          className="aspect-square rounded-md object-contain h-[110px] bg-white"
        />
        <div className="ml-3">
          <p className="text-white/70 mb-2 md:text-base text-xl">
            <strong className="text-white">Marca:</strong> Criscell
          </p>
          <p className="text-white/70">
            <strong className="text-white md:text-base text-xl">
              Descricão:
            </strong>{' '}
            Aparelho medidor de curto.
          </p>
        </div>
      </div>

      <p className="font-light text-white/70 md:text-base text-xl">
        Frete:{' '}
        <span className="font-bold text-white">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(productValue?.shippingInfo.price ?? 0)}
        </span>
        <img
          src={productValue?.shippingInfo.logo_company_url}
          alt=""
          className="w-24 my-2 bg-white p-2 rounded-md"
        />
        <p className=" text-white/70 md:text-base text-xl">
          Prazo de entrega:{' '}
          <strong>{productValue?.shippingInfo.delivery_time} dias</strong>
        </p>
        <p>Valor no Cartão de Crédito: R$ 480,00</p>
      </p>
      <span className="bg-white/10 w-full h-[1px] flex my-4"></span>
      <div className="p-4 bg-gray-800 rounded-md pointer-events-none select-none">
        <p className="text-white font-normal text-base items-center flex">
          <Icon icon="ic:round-pix" className="text-2xl mr-2" color="#00bdae" />
          À vista no PIX (Melhor opção)
        </p>
        <h2 className="flex items-center my-1">
          <strong className="text-xl mr-4">TOTAL: </strong>
          <strong className="font-bold text-white">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(productValue?.price_pix ?? 0)}
          </strong>
        </h2>
      </div>
    </>
  )
}


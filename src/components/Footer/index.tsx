import React from 'react'
import { Copyright } from './Copyright'
import Link from 'next/link'
import { Icon } from '@iconify/react'

export const Footer = () => {
  return (
    <footer className="gradient-footer pt-10">
      <div className="main_container text-white flex gap-10 flex-wrap">
        <div className="md:space-y-0 space-y-4">
          <h3 className="text-base uppercase font-bold mb-2">Navegação</h3>
          <Link href="/politica-de-privacidade">
            <p className="hover:underline cursor-pointer">
              Politica de Privacidade
            </p>
          </Link>

          <Link href="/condicoes-de-uso">
            <p className="hover:underline cursor-pointer">Condições de uso</p>
          </Link>
          <Link href="/fale-conosco">
            <p className="hover:underline cursor-pointer">Fale Conosco</p>
          </Link>
        </div>
        <div>
          <h3 className="text-base uppercase font-bold mb-2">
            Forma de pagamento
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <img
              src="/img/bandeiras/visa.svg"
              alt="bandeira visa"
              title="VISA"
              className="w-[50px] aspect-video bg-white rounded-md"
            />
            <img
              src="/img/bandeiras/master.svg"
              alt="bandeira visa"
              title="MASTERCARD"
              className="w-[50px] aspect-video bg-white rounded-md"
            />
            <img
              src="/img/bandeiras/maestro.svg"
              alt="bandeira visa"
              title="MASTERCARD MAESTRO"
              className="w-[50px] aspect-video bg-white rounded-md"
            />
            <img
              src="/img/bandeiras/elo.svg"
              alt="bandeira visa"
              title="ELO"
              className="w-[50px] aspect-video bg-white rounded-md"
            />
            <img
              src="/img/bandeiras/hipercard.svg"
              alt="bandeira visa"
              title="HIPERCARD"
              className="w-[50px] aspect-video bg-white rounded-md"
            />
            <img
              src="/img/bandeiras/hiper-color.svg"
              alt="bandeira visa"
              title="HIPER"
              className="w-[50px] aspect-video bg-white rounded-md"
            />
            <img
              src="/img/bandeiras/pix.svg"
              alt="bandeira visa"
              title="PIX"
              className="w-[50px] aspect-video object-contain bg-white rounded-md"
            />
          </div>
        </div>
        <div className="">
          <h3 className="text-base uppercase font-bold mb-4">CONTATO</h3>
          <div className="md:space-y-0 space-y-4">
            <p className="flex items-center">
              <Icon
                icon="solar:phone-linear"
                className="mr-1"
                fontSize={20}
                color="white"
              />{' '}
              (35) 9763-2886
            </p>
            <p className="flex items-center">
              {' '}
              <Icon
                icon="mi:email"
                className="mr-1"
                fontSize={20}
                color="white"
              />{' '}
              celio9@hotmail.com
            </p>
            <p className="flex items-center">
              <Icon
                icon="uil:map-marker"
                className="mr-1"
                fontSize={20}
                color="white"
              />
              Rua São Paulo n860. Centro. Poços de Caldas MG. Cep 37701-012
            </p>
          </div>
        </div>
        {/* <div className="flex items-end ">
          <small className="text-white">versão da aplicação: 1.0 (beta)</small>
        </div> */}
      </div>
      <Copyright />
    </footer>
  )
}


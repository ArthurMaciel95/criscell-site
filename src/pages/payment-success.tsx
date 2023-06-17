import React from 'react'
import PageContent from '../components/Layout/PageContent'
import { Icon } from '@iconify/react'

const CheckoutSuccessful = () => {
  return (
    <PageContent>
      <section className="flex">
        <div className="flex flex-col bg-black/50 rounded-md p-5 mt-32 md:mt-0 w-full">
          <h1 className="text-white font-bold text-2xl flex items-center">
            <Icon
              icon="icon-park-solid:success"
              className="text-green-600 mr-4"
              fontSize={45}
            />
            Pagamento realizado com sucesso!
          </h1>
          <span className="my-4 flex bg-gray-800 w-full h-[1px]"></span>
          <p className="text-white text-base">
            Entre em contato conosco para informar a compra do produto e o frete
            escolhido.
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=553597632886"
            target="_blank"
            rel="noreferrer"
            className="w-fit py-4"
          >
            <p className="flex items-center text-white">
              <Icon
                icon="ic:twotone-whatsapp"
                color="white"
                className="mr-2 text-2xl"
              />{' '}
              (35) 9763-2886
            </p>
          </a>
          {/* <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-10">
            <div className=" p-4  border rounded-lg border-white/20">
              <h2 className="font-light text-white mb-2 text-2xl border-b pb-1 border-white/10 border-dashed">
                Detalhes da compra
              </h2>
              <div className="space-y-2">
                <p className="text-gray-400">
                  <strong className="text-white mr-2">ID:</strong>123123
                </p>
                <p className="text-gray-400">
                  <strong className="text-white mr-2">Situação:</strong>{' '}
                  Pagamento Aprovado
                </p>
                <p className="text-gray-400">
                  <strong className="text-white mr-2">Total:</strong> R$477,98
                </p>
                <p className="text-gray-400">
                  {' '}
                  <strong className="text-white mr-2">
                    Forma de Pagamento:
                  </strong>{' '}
                  Cartão de Crédito
                </p>
                <p className="text-gray-400">
                  <strong className="text-white mr-2">Transportadora:</strong>
                  JADLOG (PACKAGE)
                </p>
                <p className="text-gray-400">
                  <strong className="text-white mr-2">
                    Endereço de Entrega:
                  </strong>{' '}
                  Estrada da Vila Nova, nº 21231 Ananindeua - PA Cidade Nova -
                  67130600 1231
                </p>
              </div>
            </div>
            <div className=" p-4  border rounded-lg border-white/20 ">
              <h2 className="font-light text-white mb-2 text-2xl border-b pb-1 border-white/10 border-dashed">
                Informações do comprador
              </h2>
              <div className="space-y-2">
                <p className="text-gray-400">
                  <strong className="text-white mr-2">Nome:</strong>ARTHUR
                  FELIPE DOS SANTOS
                </p>
                <p className="text-gray-400">
                  <strong className="text-white mr-2">CPF:</strong>
                  159.312.007-83
                </p>
                <p className="text-gray-400">
                  <strong className="text-white mr-2">Cidade:</strong> Rio de
                  janeiro
                </p>
                <p className="text-gray-400">
                  {' '}
                  <strong className="text-white mr-2">Estado:</strong> RJ
                </p>
                <p className="text-gray-400">
                  <strong className="text-white mr-2">Email:</strong>
                  arthurnmrocha@gmail.com
                </p>
                <p className="text-gray-400">
                  <strong className="text-white mr-2">Telefone:</strong> (21) 9
                  8957-8585
                </p>
                <p className="text-gray-400">
                  <strong className="text-white mr-2">Complemento:</strong>{' '}
                  Taquara
                </p>
              </div>
            </div>
            <small className="text-white italic">
              * Essas informações não ficam disponível para outros usuários.
            </small>
          </div> */}
        </div>
      </section>
      <section className="mt-20 flex justify-center items-center">
        <div>
          <img
            src="/img/site-seguro.webp"
            alt="site seguro"
            className="aspect-[500/240] w-[200px] bg-white p-2"
          />
        </div>
        <div>
          <img
            src="/img/ssl.png"
            alt="ssl verificado"
            className=" w-[200px]  p-2"
          />
        </div>
      </section>
    </PageContent>
  )
}

export default CheckoutSuccessful


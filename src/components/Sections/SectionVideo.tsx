import React from 'react'
import { TitleHeader } from '../Partials/TitleHeader'

export const SectionVideo = () => {
  return (
    <section className="main_container">
      <TitleHeader title=" Conheça o nosso detector de curto CrisCell" />

      <div className="flex items-center justify-center">
        {' '}
        <iframe
          className="aspect-video w-full md:w-[800px] md:h-[450px]"
          src="https://www.youtube.com/embed/qD93B-3SW1U"
          title="Como detectar curtos em qualquer placa eletrônica."
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <div className="mx-auto flex mt-20  max-w-[700px] items-center justify-center">
        <div className=" w-full  bg-gradient-to-b from-[#0e92ff]  to-[#449bff10] p-1 ">
          <div className="h-full w-full bg-[#121212] py-7 px-5">
            <h2 className="text-white font-normal text-4xl text-center">
              Detecta curto em qualquer placa eletrônica. Celulares, TVs,
              aparelhos de Som, porteiro eletrônico, placas inverter, enfim,
              qualquer placa de circuitos eletrônicos.
            </h2>
          </div>
        </div>
      </div>
      <div className="my-20 flex justify-center">
        {' '}
        <a
          href="https://celio8.mercadoshops.com.br/MLB-2618106233-detector-de-curtos-em-placas-electronica-_JM"
          target="_blank"
          rel="noreferrer"
        >
          <button className="bg-gradient-to-t px-9 py-7 md:w-[600px] text-4xl justify-center flex text-white font-semibold rounded-lg from-brand-green-400  to-brand-green-700 items-center">
            Comprar Agora{' '}
            <img src="/svg/bag.svg" className="h-14 ml-2" alt="" />
          </button>
        </a>
      </div>
    </section>
  )
}


import Link from 'next/link'
import React from 'react'

export const SectionOffer = () => {
  return (
    <section className="main_container flex flex-col justify-center w-full">
      <div className="my-32 text-center flex justify-center flex-col items-center">
        <h3 className="text-white font-bold text-5xl">Alguma dúvida?</h3>
        <p className="text-white/50 font-light text-3xl mt-5">
          Fale conosco nesse momento
        </p>{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://api.whatsapp.com/send?phone=553597632886"
        >
          <button className=" mt-10 bg-gradient-to-t px-9 py-7 md:w-[600px] text-4xl justify-center flex text-white font-semibold rounded-lg from-brand-green-400  to-brand-green-700 items-center">
            {' '}
            <img src="/svg/whats.svg" className="h-10 mr-4" alt="" />
            Conversar Pelo Whatsapp{' '}
          </button>
        </a>
      </div>
      <div className="my-20 text-center flex justify-center flex-col items-center ">
        <img src="/img/pin.png" alt="pin azul" className="w-20 mb-10" />
        <h3 className="text-white font-bold text-5xl">
          Entrega para todo o Brasil
        </h3>
        <img src="/img/produto/aparelho-3-.png" alt="" className="mt-20" />{' '}
        {/*  <div className="mx-auto flex mt-20  max-w-[700px] items-center justify-center">
          <img src="/img/offer-1.png" alt="" />
        </div> */}
        <Link href="/product">
          <button className="mt-20 bg-gradient-to-t px-9 py-7 md:w-[600px] text-4xl justify-center flex text-white font-semibold rounded-lg from-brand-green-400  to-brand-green-700 items-center">
            Comprar Agora{' '}
            <img src="/svg/bag.svg" className="h-14 ml-2" alt="" />
          </button>
        </Link>{' '}
        <img
          src="/img/payment-method.png"
          alt=""
          className="my-10 primary-color-radial"
        />
      </div>
    </section>
  )
}


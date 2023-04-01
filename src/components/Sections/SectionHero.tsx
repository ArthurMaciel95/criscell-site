import React from 'react'

export const SectionHero = () => {
  return (
    <section className="primary-color-radial md:h-[800px] w-full" id="inicio">
      <div className="main_container ">
        <div className="flex items-center flex-col md:flex-row md:pt-32 pt-56">
          <div className="md:flex-1">
            <h1 className="text-white md:text-6xl text-4xl font-bold drop-shadow-  text-shadow md:text-left text-center">
              Conheça o melhor detector de curtos em placas eletrônicas
            </h1>
            <p className="text-3xl mt-10 text-shadow font-light text-white md:text-left text-center">
              Feito por quem entende do assunto.
            </p>
          </div>
          <div className="md:flex-1">
            <img src="/img/produtohero.png" alt="" className="w-full h-full" />
          </div>
        </div>
        <div className="flex justify-center animate-bounce">
          <img src="/svg/arrow-down-bounce.svg" alt="" />
        </div>
      </div>
    </section>
  )
}


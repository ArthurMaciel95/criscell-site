import React from 'react'
import { TitleHeader } from '../Partials/TitleHeader'

export const SectionPhotos = () => {
  return (
    <section className="main_container" id="galeria">
      <TitleHeader title="Fotos do Produto" />
      <div className="grid md:grid-cols-3 grid-rows-2 gap-4">
        <div className="grid col-start-1 col-end-3">
          <img
            className="bg-contain w-full h-full"
            src="/img/produto/p4.png"
            alt=""
          />
        </div>
        <img
          className="bg-contain w-full h-full"
          src="/img/produto/p1.png"
          alt=""
        />
        <img
          className="bg-contain w-full h-full"
          src="/img/produto/p2.png"
          alt=""
        />
        <img
          className="bg-contain w-full h-full"
          src="/img/produto/p3.png"
          alt=""
        />
      </div>
    </section>
  )
}


import React from 'react'
import { TitleHeader } from '../Partials/TitleHeader'

export const SectionPhotos = () => {
  return (
    <section className="main_container " id="galeria">
      <TitleHeader title="Fotos do Produto" />
      <div className="flex flex-col space-y-5">
        <img
          className="bg-contain w-full h-full"
          src="/img/produto/aparelho-1.jpeg"
          alt=""
        />

        <img
          className="bg-contain w-full h-full"
          src="/img/produto/aparelho-5.jpeg"
          alt=""
        />

        <img
          className="bg-contain w-full h-full bg-white"
          src="/img/produto/aparelho-3-.png"
          alt=""
        />
      </div>
    </section>
  )
}


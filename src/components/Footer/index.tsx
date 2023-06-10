import React from 'react'
import { Copyright } from './Copyright'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="gradient-footer pt-10">
      <div className="main_container text-white flex gap-10 ">
        <div>
          <h3 className="text-xl uppercase font-bold mb-2">Páginas</h3>
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
      </div>
      <Copyright />
    </footer>
  )
}


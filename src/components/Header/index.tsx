import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import { DropdownNavItem } from './DropdownNavItem'
import { navLinks } from './NavLinks'
import { Icon } from '@iconify/react'
import Link from 'next/link'
export const Header = () => {
  return (
    <header className="backdrop-blur h-auto bg-black/50 p-4  z-[999] flex  top-0 fixed w-full">
      <nav className="main_container flex justify-between items-center ">
        <div className="cursor-pointer">
          <Link href="/">
            <img src="/img/logo.png" alt="" />
          </Link>
        </div>
        <div>
          <ul className=" md:flex hidden">
            <li className="text-white font-light p-5 text-lg">
              <Link href="/#inicio">Início</Link>
            </li>
            <li className="text-white font-light p-5 text-lg">
              <Link href="/como-utilizar">Como Utilizar</Link>
            </li>
            <li className="text-white font-light p-5 text-lg">
              <Link href="/#galeria">Galeria</Link>
            </li>
            <li className="text-white font-light p-5 text-lg">
              <Link href="/#video">Vídeo</Link>
            </li>
          </ul>{' '}
          <div className="md:hidden flex">
            <DropdownNavItem links={navLinks} />
          </div>
        </div>
      </nav>
    </header>
  )
}


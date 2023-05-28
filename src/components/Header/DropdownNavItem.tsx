import { forwardRef, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { Icon } from '@iconify/react'
import Link from 'next/link'
interface DropdownNavItemProps {
  links: { route: string; name: string }[]
}

export function DropdownNavItem({ links = [] }: DropdownNavItemProps) {
  return (
    <Menu>
      <div className="relative mt-6 block sm:hidden">
        <Menu.Button className="navbar_item">
          <Icon
            icon="material-symbols:menu-rounded"
            color="white"
            fontSize={50}
            className="text-5xl text-brand-blue-600 "
          />
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="-bottom-42 absolute right-0 space-y-3 flex flex-col rounded-md w-[300px] text-gray-700 border-r-4 text-4xl border-brand-blue-600 bg-white p-4 py-5 shadow">
            {links.map((link) => (
              /* Use the `active` state to conditionally style the active item. */
              <Menu.Item
                key={link.route}
                as={Fragment}
                className="py-6 px-3 text-xl cursor-pointer"
              >
                <Link href={link.route}>
                  <span className="cursor-pointer">{link.name}</span>
                </Link>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  )
}


import React from 'react'
import { Icon } from '@iconify/react'

interface BreadcrumbProps {
  detalhes: {
    categoria: string
    subcategoria?: string
    descricao?: string
  }
}

export default function Breadcrumb({ detalhes }: BreadcrumbProps) {
  return (
    <div className="bg-brand-gray-50 py-7">
      <div className="main_container">
        <div className="text-white font-light items-center flex flex-col sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-brand-black-100 font-jost text-sm">
              {detalhes?.categoria}
            </span>

            {detalhes && detalhes.subcategoria && (
              <>
                <Icon
                  icon="ion:chevron-forward-sharp"
                  className="text-brand-black-100"
                />

                <span className="text-brand-black-100 font-jost text-sm">
                  {detalhes?.subcategoria}
                </span>
              </>
            )}

            {detalhes && detalhes.descricao && (
              <>
                <Icon
                  icon="ion:chevron-forward-sharp"
                  className="text-brand-black-100"
                />

                <strong className="text-brand-black-100 font-jost text-sm font-bold">
                  {detalhes?.descricao}
                </strong>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


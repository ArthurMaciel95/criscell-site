import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/Partials/BreadCrumb'
import PageContent from '../components/Layout/PageContent'
import { Icon } from '@iconify/react'
import SwiperProductZoom from '../components/Swiper/SwiperProductZoom'
import axios from 'axios'
import Link from 'next/link'

const ProductDetail = () => {
  const [cep, setCep] = useState('')
  const [loading, setLoading] = useState(false)
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([])
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingOption | null>(null)
  const VALUE_OF_PRODUCT = 450
  /* const [quantity, setQuantity] = useState(1) */
  interface ShippingOption {
    name: string
    price: number
    logo_company_url: string
    delivery_time: number
  }
  console.log(selectedShipping)
  interface RequestShippingOption {
    data: {
      error: boolean
      message: string
      results: ShippingOption[]
    }
  }

  function saveInfoOnLocalStorage() {
    if (!selectedShipping) return
    if (!cep) return

    let dataInfo = {
      cep,
      shippingInfo: selectedShipping,
      price: Number(selectedShipping.price) + VALUE_OF_PRODUCT,
    }

    localStorage.setItem('selectedShipping', JSON.stringify(dataInfo))
  }

  async function handleShippingCep() {
    try {
      setLoading(true)
      const result: RequestShippingOption = await axios.post(
        '/api/frete/calcular-frete',
        {
          cep_origem: '20241266',
          cep_destino: cep,
          peso: 0.3,
          altura: 11,
          largura: 15,
          comprimento: 18,
        }
      )
      setLoading(false)

      const filterAvailableShipping = result.data.results.filter(
        (shipping) => shipping.price
      )

      setShippingOptions(filterAvailableShipping)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    handleShippingCep()
  }, [])

  return (
    <PageContent>
      <div className="flex text-white items-center font-light">
        <span>Home</span>
        <Icon
          icon="material-symbols:arrow-forward-ios-rounded"
          fontSize={18}
          color="#35B6FF"
          className="mx-2"
        />
        <span>Detalhes do Produto</span>
        <Icon
          icon="material-symbols:arrow-forward-ios-rounded"
          fontSize={18}
          color="#35B6FF"
          className="mx-2"
        />
        <span>Detector de Curto CrisCell</span>
      </div>

      <div className="main_container">
        <div className="w-full mt-3 sm:hidden"></div>
        <section className="grid md:grid-cols-12 gap-10 my-10">
          <div className="md:col-span-4 xl:col-span-5 mb-6 sm:mb-0">
            <SwiperProductZoom
              images={[
                '/img/produto/p1.png',
                '/img/produto/p2.png',
                '/img/produto/p3.png',
                '/img/produto/p4.png',
              ]}
            />
          </div>

          <div className="md:col-span-8 xl:col-span-7 w-full">
            <div className="flex gap-8 flex-col sm:flex-col lg:flex-row">
              <div className="text-white">
                <h1 className="font-bold text-white drop-shadow-sm font-jost text-4xl">
                  Detector de Curto CrisCell (3.0)
                </h1>

                <div className="drop-shadow-lg p-4 bg-brand-blue-500 rounded-md w-fit my-5 flex ">
                  <div>
                    <h3 className="font-bold text-white text-xl">
                      25% DE DESCONTO
                    </h3>
                    <small className="text-gray-300">
                      Oferta acaba em 12 dias
                    </small>
                  </div>
                  <div className="p-4">
                    <Icon
                      icon="mdi:brightness-percent"
                      fontSize={25}
                      className="animate-ping"
                    />
                  </div>
                </div>
                <div className="flex">
                  <span className="flex items-center ">
                    <Icon
                      icon="material-symbols:star"
                      color="#f7a23b"
                      fontSize={20}
                    />

                    <small>4.9 Avaliações</small>
                  </span>
                  <span className="ml-2">
                    <strong className="text-sm text-green-500">
                      34 Produtos vendidos
                    </strong>
                  </span>
                </div>
                <div className="mt-2">
                  <div>
                    <h3 className="font-normal text-white/50 text-base line-through">
                      R$570,00
                    </h3>
                    <h2 className="font-bold text-white">
                      {selectedShipping
                        ? new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(Number(selectedShipping.price) + 450)
                        : new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(450)}
                      {/* {quantity <= 1 && ( */}
                      <small className="text-sm font-light">/cada</small>
                      {/*  )} */}
                    </h2>
                    {selectedShipping && (
                      <p className="my-2 text-sm text-green-500">
                        {selectedShipping.price &&
                          `Frete Incluido (${new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(Number(selectedShipping.price))})`}
                      </p>
                    )}
                  </div>

                  <h4 className="font-semibold text-xl text-gray-300 mb-4">
                    Descrição do Produto
                  </h4>
                  <p className="font-light">
                    Aparelho de detectar curtos em placas Eletrônicas. Detecta
                    curto em qualquer placa eletrônica. Celulares, TVs,
                    aparelhos de Som, porteiro eletrônico, placas inverter,
                    enfim, qualquer placa de circuitos eletrônicos.
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 w-full"></div>
            </div>
            <div className="my-6">
              <div className="flex">
                <Link href="/checkout">
                  <button
                    disabled={
                      !selectedShipping ||
                      loading ||
                      shippingOptions.length === 0
                    }
                    onClick={() => saveInfoOnLocalStorage()}
                    className="disabled:from-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all disabled:to-brand-gray-50 bg-gradient-to-t px-5 py-4 flex text-white font-semibold rounded-lg from-brand-green-400  to-brand-green-700 items-center"
                  >
                    Comprar Agora
                    <img src="/svg/bag.svg" className="h-7 ml-2" alt="" />
                  </button>
                </Link>
                {/*  <div className="ml-4">
                  <button
                    disabled={!selectedShipping || quantity === 1 || loading}
                    onClick={() => setQuantity((state) => state - 1)}
                    className="text-white text-xl h-full p-4 border disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="p-4 text-white">{quantity}</span>

                  <button
                    disabled={
                      !selectedShipping ||
                      loading ||
                      shippingOptions.length === 0
                    }
                    className="text-white text-xl h-full p-4 border disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => setQuantity((state) => state + 1)}
                  >
                    +
                  </button>
                </div> */}
              </div>
              {!selectedShipping && (
                <small className="text-red-500">
                  Selecione o frete para seguir com a Compra.
                </small>
              )}
            </div>
            <div className="flex flex-col">
              <small className="text-white">
                Consultar frete e prazo de entrega
              </small>
              <div>
                {' '}
                <input
                  type="text"
                  placeholder="Insira o cep"
                  className="px-4 mt-2 py-4 rounded-md max-w-[300px] text-lg bg-white/10 text-gray-300 font-normal"
                  onChange={(e) => setCep(e.target.value)}
                  value={cep}
                />
                <button
                  disabled={cep.length < 8}
                  className="px-4 text-white disabled:opacity-40"
                  onClick={() => handleShippingCep()}
                >
                  Calcular Frete
                </button>
              </div>

              {shippingOptions.length > 0 && (
                <div className="flex flex-col max-w-[400px] border-black p-2 mt-2 bg-gray-700 rounded-lg">
                  {shippingOptions.map((option, index: number) => {
                    return (
                      <span key={index} className="flex items-center my-2">
                        <img
                          src={option.logo_company_url}
                          alt=""
                          className="aspect-[10/3] object-contain ml-2 w-[100px] bg-white px-2"
                        />
                        <small className="text-white ml-2">{option.name}</small>
                        <small className="ml-2 font-bold text-base text-brand-green-700">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(option.price)}
                        </small>
                        <small className="ml-4 font-normal text-white">
                          Até {option.delivery_time} dias úteis
                        </small>
                        <div className="flex">
                          <input
                            type="radio"
                            name="frete"
                            id={index}
                            className="ml-4 h-5 w-5 "
                            onClick={() => setSelectedShipping(option)}
                          />
                        </div>
                      </span>
                    )
                  })}{' '}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </PageContent>
  )
}

export default ProductDetail


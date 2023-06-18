import React, { useState } from 'react'
import { useEffect } from 'react'
import PageContent from '../components/Layout/PageContent'
import { StepperCheckout } from '../components/Stepper'
import { InfoCheckout } from '../components/Partials/InfoCheckout'
import { FormPayment } from '../components/Forms/FormCheckout/FormPayment'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
const Checkout = () => {
  const router = useRouter()
  const [productValue, setProductValue] = useState(null)
  const [cep, setCep] = useState('')
  const [step, setStep] = useState<1 | 2 | 3>(2)
  useEffect(() => {
    const productValue = !!localStorage.getItem('selectedShipping')
      ? JSON.parse(localStorage.getItem('selectedShipping') || [])
      : null
    setCep(productValue.cep)
    if (!productValue) {
      router.push('/product')

      toast.error('Selecione um produto para continuar')
    }
    setProductValue(productValue)
  }, [])
  return (
    <PageContent>
      <section className="grid md:grid-cols-12 gap-5">
        <div className="md:col-span-8 col-span-12 bg-black/50 rounded-md p-5 mt-32 md:mt-0">
          <StepperCheckout step={step} />
          <span className="my-4 flex bg-gray-800 w-full h-[1px]"></span>
          <FormPayment
            step={step}
            setStep={setStep}
            cepDigited={cep}
            productValue={productValue}
          />
        </div>
        <div className="md:col-span-4 col-span-12 bg-black/50 rounded-md p-5 sticky top-28 h-fit w-full">
          <InfoCheckout productValue={productValue} />
        </div>
      </section>
      <section className="mt-20 flex justify-center items-center">
        <div>
          <img
            src="/img/site-seguro.webp"
            alt="site seguro"
            className="aspect-[500/240] w-[200px] bg-white p-2"
          />
        </div>
        <div>
          <img
            src="/img/ssl.png"
            alt="ssl verificado"
            className=" w-[200px]  p-2"
          />
        </div>
      </section>
    </PageContent>
  )
}
export default Checkout


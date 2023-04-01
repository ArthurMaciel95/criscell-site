import React from 'react'
import { TitleHeader } from '../Partials/TitleHeader'

export const SectionManual = () => {
  return (
    <section className="main_container text-white ">
      <div className="mb-20 mt-32 mx-5 md:mx-0">
        <TitleHeader title="Como Funciona o detector de curtos" />
        <p className="text-2xl font-bold mb-5">
          O Detector de curtos Versão 3.0 funciona da seguinte forma:
        </p>
        <ol className="list-decimal text-xl font-light ">
          <li className="mb-4">Ligue a chave on - off</li>{' '}
          <li className="mb-4">
            Faça a calibração do aparelho juntando as ponteiras e espere até
            bipar, depois solte, então o aparelho estará pronto para uso.
          </li>
          <li className="mb-4">
            dentifique se existe um curto na placa usando um multímetro digital.
            Se confirmar que há um curto na placa, use o detector de curtos
            medindo pelos capacitores.
          </li>{' '}
          <li className="mb-4">
            Os capacitores são responsáveis por 90% dos defeitos nas placas
            eletrônicas.{' '}
          </li>
          <li className="mb-4">
            Os capacitores SMDs tem vários outros capacitores dentro da sua
            construção , fechados com os contatos nas suas extremidades e é por
            isso que temos curtos totais, ou fugas nos capacitores, o que
            dificulta serem encontrados na placa eletrônica com ferramentas
            comuns.
          </li>{' '}
          <li className="mb-4">
            A medição é sempre feita direto nos capacitores.
          </li>
          <li className="mb-4">
            <strong className="text-red-600 font-bold">
              {' '}
              NÃO COLOQUE A PONTEIRA PRETA NO ATERRAMENTO E A POSITIVA NO
              CAPACITOR
            </strong>
            , isso vai gerar uma falsa analise, pois você vai medir a
            resistência ôhmica das trilhas também!
          </li>{' '}
          <li className="mb-4">
            Procure sempre pelo menor valor de sua resistência ôhmica, medindo
            diretamente no capacitor.
          </li>
          <li className="mb-4">
            Encontrando o menor valor, retire o componente e verifique se o
            curto acabou. Se terminou o curto, substitua o componente defeituoso
            e faça uma nova analise. Confirmando que não existem mais curtos,
            sua placa foi reparada com sucesso!
          </li>{' '}
          <li className="mb-4">
            Caso o curto continue onde você retirou o capacitor, significa que o
            curto continua na linha e será necessário que se faça uma nova
            analise . Normalmente quando isso acontece, é porque o curto esta em
            outro componente. Pode ser Mosfet, transistores, PWMs, Chipset, Cis,
            PCH, processadores , memórias.
          </li>
        </ol>{' '}
        <p className="text-4xl text-center mb-5">
          {' '}
          Qualquer dúvida entre em contato pelo whats app - (35)997632886
          Obrigado por adquirir nosso produto.
        </p>
        <p className="text-4xl text-center">
          Estamos sempre inovando para facilitar a vida dos técnicos na bancada
          Atenciosamente, Célio Rocha.
        </p>
      </div>
    </section>
  )
}


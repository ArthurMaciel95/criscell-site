import { Icon } from '@iconify/react'
import React from 'react'

const CondigoesDeUso = () => {
  return (
    <>
      <span id="inicio-uso"></span>
      <div className="my-9">
        {/* Breadcrumbs */}

        <div className="bg-brand-blue-500 py-8 mt-28 md:mt-44">
          <div className="main_container">
            <h3 className="text-white text-2xl font-bold mb-4">
              Condições de Uso
            </h3>

            <div className="relative py-3">
              <div className="overflow-x-auto pb-4 w-full absolute">
                <div className="text-white font-light flex items-center gap-2 whitespace-nowrap">
                  <span className="text-white">Você está em Home</span>

                  <Icon icon="ep:arrow-right-bold" width={20} />

                  <span className="text-white font-bold">Condições de Uso</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-8">
          <div className="main_container text-white">
            <div className="mb-6">
              <p className="text-2xl mb-4 text-brand-black-50 font-semibold">
                TERMOS E CONDIÇÕES DE USO
              </p>
              <p className="mb-2">
                Termo e Condições de Uso com Condições Gerais aplicáveis ao uso
                dos serviços oferecidos pela Empresa Carlos Navarro e Cia Ltda, 
                CNPJ sob n.º 05.881-752/0001-22, sito Tv. Dom Pedro I, 1000 -
                Belém - Pará, doravante denominada <strong>criscell</strong>,
                responsável pela comercialização e vendas de persianas através
                do portal 
                <a href="https://www.criscell.com.br">
                  https://www.criscell.com.br{' '}
                </a>
                Qualquer pessoa, doravante nominada Usuário, que pretenda
                utilizar os serviços da <strong>criscell</strong> deverá aceitar
                os Termos e Condições de Uso e as demais políticas que o regem.
              </p>
              <p className="mb-2">
                A aceitação destes Termos e condições de Uso é absolutamente
                indispensável à utilização do site e serviços prestados pela 
                <strong>criscell</strong>. O Usuário deverá ler, certificar-se
                de haver entendido e aceitar todas as condições estabelecidas
                nos Termos e Condições de Uso e na Política de Privacidade,
                antes de seu cadastro como Usuário da <strong>criscell</strong>.
                Por meio do site, você tem acesso a recursos e conteúdos. Apoio
                a Vendas e Páginas da Web, dados, mensagens, texto, imagens,
                fotografias, gráficos; A plataforma da <strong>criscell</strong>
                 pode revisar os Termos e Condições de Uso e a Política de
                Privacidade a qualquer momento, sem aviso prévio e entrarão em
                vigor quando publicados e permanece vigente por prazo
                indeterminado.
              </p>
              <p>
                E quais são essas informações? Bem, são aquelas necessárias para
                que possamos te identificar para fins de cadastro e cumprimento
                da legislação, como: nome completo, CPF, endereço de e-mail,
                data de nascimento, telefone, endereço para entrega de produtos,
                entre outros. Essas informações são armazenadas pela{' '}
                <strong>criscell</strong> decorações com o objetivo de otimizar
                a experiência de compra pelo usuário. Além dos dados cadastrais,
                coletamos também de forma automática, como por exemplo: IP (com
                data e hora), origem do IP, características do dispositivo de
                acesso, informações sobre cliques, páginas acessadas no site da{' '}
                <strong>criscell</strong> decorações e após a saída do nosso
                site, buscas realizadas, entre outras. Você também está ciente e
                de acordo que nós realizaremos a alimentação de sua base de
                dados com reunião de informações sobre o usuário oriunda de
                outras bases de dados legítimas.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-2xl mb-4 text-brand-black-50 font-semibold">
                DO CADASTRO
              </p>
              <p className="mb-2">
                Para acessar a totalidade dos conteúdos e serviços, a 
                <strong>criscell</strong> poderá coletar dados pessoais dos
                usuários. Os dados pessoais informados pelos usuários, bem como
                os dados disponibilizados durante o uso dos serviços, serão
                tratados em conformidade com o disposto na Política de
                Privacidade.
              </p>
              <p className="mb-2">
                Apenas será confirmado o cadastramento do Usuário que preencher
                todos os campos obrigatórios do cadastro, com informações
                exatas, precisas e verdadeiras. O Usuário declara e assume o
                compromisso de atualizar os dados inseridos em seu cadastro
                sempre que for necessário.
              </p>
              <p>
                O Usuário acessará sua conta através de login e senha e
                compromete-se a não informar a terceiros esses dados,
                responsabilizando-se integralmente pelo uso que deles seja
                feito.
              </p>
              <p className="mb-2">
                Fica ressalvada a guarda pela plataforma da 
                <strong>criscell</strong> das informações e/ou dados coletados
                para melhoria do site, ou cuja manutenção seja a ela imposta em
                razão de obrigações legais e/ou regulatórias ou, ainda, cuja
                manutenção seja necessária para cumprimento de ordem judicial,
                no âmbito de processos judiciais e/ou administrativos e
                questionamento de terceiros decorrentes das atividades
                desempenhadas pelos usuários no site.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-2xl mb-4 text-brand-black-50 font-semibold">
                FORMAS DE PAGAMENTO ACEITAS
              </p>

              <p className="mb-2">
                <strong>Pagamento à vista:</strong> plataforma Mercado Pago;
                Boleto bancário; Débito em conta; Cartão de crédito e PIX.
              </p>
              <p className="mb-2">
                <strong>Pagamento parcelado:</strong> plataforma Cielo e
                Pagar.me/Cartão de crédito.
              </p>
              <p className="mb-2">
                <strong>Para pagamentos com cartão de crédito</strong>, o pedido
                estará sujeito à aprovação da administradora do cartão. As
                informações contidas no cadastro são passíveis de confirmação.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-2xl mb-4 text-brand-black-50 font-semibold">
                RESERVA DE DIREITOS
              </p>
              <p className="mb-2">
                O Site e os produtos comercializados estão registrados no INPI
                (Instituto Nacional da Propriedade Industrial) e estão
                protegidas por direitos autorais da <strong>criscell</strong>.
                Neste caso, salvo disposição contrária, o conteúdo deste site
                pertence a <strong>criscell</strong> ou foram outorgados sob
                licença por seus titulares, de forma que somente a 
                <strong>criscell</strong> possa utilizar este material.
              </p>
              <p className="mb-2">
                O usuário ou cliente ao acessar o nosso site, declara respeito
                aos direitos de propriedade industrial, os decorrentes da
                proteção de marcas registradas, bem como os direitos a
                terceiros, que de alguma forma, estiveram presentes no site.
                Logo, o usuário ao utilizar da plataforma não poderá copiar,
                reproduzir, modificar, criar material derivado, alterar,
                distribuir publicamente, republicar, fazer upload, postar,
                transmitir, transferir, vender, espelhar, enquadrar, minerar
                dados ou, por qualquer meio, usar qualquer informação ou
                material obtido neste site ou por seu intermédio sem a prévia
                por escrito da <strong>criscell</strong>.
              </p>

              <p className="mb-2">
                A <strong>criscell</strong> pode, a seu exclusivo critério, a
                qualquer momento interromper o fornecimento ou limitar o seu
                acesso ao site, desde que verificado que você infringiu
                os Termos e Condições de Uso e os direitos autorais de
                terceiros.
              </p>
              <p className="mb-2">
                Ainda, reservamos o direito de, a qualquer momento e a nosso
                exclusivo critério, alterar, modificar, incluir ou excluir
                partes destes Termos e Condições. Cada vez que alterarmos,
                modificarmos, incluirmos ou excluirmos partes destes Termos e
                Condições, será solicitado que você leia a nova versão e clique
                no botão “Concordo” para confirmar que você está de acordo com
                os novos termos que passam a reger em nossa plataforma.
              </p>
              <p className="mb-2">
                Caso não concorde, você não terá permissões para acessar o site
                e seus dados serão excluídos de nossa plataforma.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-2xl mb-4 text-brand-black-50 font-semibold">
                ISENÇÃO DE RESPONSABILIDADE
              </p>
              <p className="mb-2">
                A <strong>criscell</strong> não se responsabiliza ou será
                responsável, contratualmente, civilmente, objetiva de qualquer
                natureza por quaisquer tipos de indenizações direta, indireta,
                ou ainda pela impossibilidade do uso ou acesso ao Site, falhas,
                interrupções, entre outros. O mesmo se aplica a qualquer
                conteúdo exibido em qualquer ambiente que vincule o nome da 
                <strong>criscell</strong>.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-2xl mb-4 text-brand-black-50 font-semibold">
                POLÍTICA DE PRIVACIDADE
              </p>
              <p>
                A <strong>criscell</strong> se preocupa com a privacidade de
                seus usuários e desenvolveu uma política para abordar questões
                de privacidade. Para obter mais informações, consulte a
                nossa Política de Privacidade. Qualquer informação pessoal
                coletada neste site pode ser acessada, armazenada e tratada de
                acordo com a Política de Privacidade da 
                <strong>criscell</strong>.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-2xl mb-4 text-brand-black-50 font-semibold">
                POLÍTICA DE TROCAS E DEVOLUÇÕES
              </p>
              <p>
                Quaisquer solicitações de trocas e devoluções são regidas pela
                nossa política de Trocas e Devoluções constante neste site. Ao
                fazer seu registro no site, você concorda com a nossa política
                de trocas e devoluções de mercadorias.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-2xl mb-4 text-brand-black-50 font-semibold">
                JURISDIÇÃO - LEIS APLICÁVEIS
              </p>
              <p className="mb-2">
                Todas as questões relacionadas ao seu acesso e uso do site e dos
                conteúdos fornecidos, serão regidos pelas Leis da República
                Federativa do Brasil. Qualquer ação legal ou processo
                relacionado ao seu acesso ou uso do site/aplicativo, fica
                eleito, desde já, o foro da cidade de Belém - Pará para dirimir
                eventuais controvérsias oriundas do presente termo, renunciando
                expressamente a qualquer outro, por mais privilegiado que seja.
              </p>
              <p>
                Você e a <strong>criscell</strong> concordam em se submeter à
                jurisdição e concordam que o foro é adequado nesses tribunais em
                qualquer ação ou processo legal.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-2xl mb-4 text-brand-black-50 font-semibold">
                INFORMAÇÕES DE CONTATO
              </p>
              <p>
                Se você tiver alguma dúvida sobre estes Termos de Uso, entre em
                contato com o nosso e-mail 
                <a href="emailto:lgpd@<strong>criscell</strong>.com.br">
                  lgpd@criscell.com.br
                </a>
                 Em caso de outras dúvidas, as informações de contato estão
                disponíveis na página Contato no Site 
                <a
                  href="https://www.criscell.com.br/fale-conosco"
                  className="link"
                >
                  Fale Conosco
                </a>
                . Os usuários declaram ter lido atentamente e compreendido os
                termos e disposições deste instrumento, estar ciente de seu
                inteiro teor, e estar de acordo com estes 
                <strong>TERMOS E CONDIÇÕES DE USO</strong>, aceitando todas as
                suas condições.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CondigoesDeUso


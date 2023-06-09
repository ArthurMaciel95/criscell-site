import Document, { Html, Head, Main, NextScript } from 'next/document'
import Analytics from '../components/Partials/Analytics'
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="Detecta curto em qualquer placa eletrônica. Celulares, TVs, aparelhos de Som, porteiro eletrônico, placas inverter, enfim, qualquer placa de circuitos eletrônicos."
          />
          <title>CrisCell - Aparelho de curto em placas eletrônicas</title>
          <meta property="og:image" content="/seo/seo_default.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="627" />
          <meta property="og:type" content="website" />
          <meta property="og:image:type" content="image/png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" type="image/x-icon" href="/favicon.svg"></link>
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#35B6FF" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />
          <Script
            src="https://ipayjs.infinitepay.io/production/ipay-latest.min.js"
            strategy="lazyOnload"
            onLoad={() => {
              ;(function (window, document) {
                if (!!window['IPay']) return

                var head = document.getElementsByTagName('head')[0]
                var script = document.createElement('script')
                script.async = 1
                script.src =
                  'https://ipayjs.infinitepay.io/production/ipay-latest.min.js'
                head.parentNode.appendChild(script)
              })(window, document)
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Analytics />
        </body>
      </Html>
    )
  }
}

export default MyDocument


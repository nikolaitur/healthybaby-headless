import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
          {/* Can only be loaded server side */}
          <script
            id="jazzhr-widget"
            type="text/javascript"
            src="https://app.jazz.co/widgets/basic/create/healthynest"
            charSet="utf-8"
          ></script>
          <script
            type="text/javascript"
            async="true"
            src="https://scripts.juniphq.com/v1/junip_shopify.js"
          ></script>
          <span
            className="junip-store-key"
            data-store-key="8Y8nYkJkWCVANh2xkZy7L5xL"
          ></span>
        </body>
      </Html>
    )
  }
}

export default MyDocument

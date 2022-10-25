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
            src="https://scripts.juniphq.com/v1/junip_shopify.js">
          </script>
        </body>
      </Html>
    )
  }
}

export default MyDocument

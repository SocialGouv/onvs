import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="fr">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          {/* <script
            type="text/javascript"
            src="/tarteaucitron/tarteaucitron.js"
          />
          <script
            type="text/javascript"
            src="/tarteaucitron/initTarteaucitron.js"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

import Document, { Html, Head, Main, NextScript } from "next/document";
import { extractCritical } from "@emotion/server";
import { resetServerContext } from "react-beautiful-dnd";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const page = await ctx.renderPage();
    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(page.html);
    resetServerContext();
    return { ...initialProps, ...page, ...styles };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            data-emotion-css={this.props.ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

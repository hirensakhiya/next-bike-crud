import { Html, Head, Main, NextScript } from "next/document";

export default function Document({ children }) {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

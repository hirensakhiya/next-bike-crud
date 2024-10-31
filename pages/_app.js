import { Layout } from "@/components/Layout";
import { Toaster } from "@/components/Toaster";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (<>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    <Toaster />
  </>);
}

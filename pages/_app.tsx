import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/custom.css'
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: any) {
  return <>
    <Component {...pageProps} />
    <Toaster
      position="top-right"
      toastOptions={{
        className: '',
        style: {
          border: '1px solid #FFFFFF',
          padding: '16px',
          color: 'light',
        },
      }}
    />
  </>
}

export default MyApp

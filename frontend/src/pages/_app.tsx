import { ToastProvider } from '@/components/molecules/Robot/Toast'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </>
  )
}

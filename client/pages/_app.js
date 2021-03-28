import React, { useState, useEffect, createContext } from 'react'
import { Provider, useSession, getSession } from 'next-auth/client'
import { SWRConfig } from 'swr'
import { ToastProvider } from 'react-toast-notifications'

import PleaseSignIn from 'components/PleaseSignIn'

import axios from 'axios/axios'
import '../styles/globals.css'

import Page from 'components/Page'

const SocketContext = createContext()
const SocketContextProvider = SocketContext.Provider

function MyApp ({ Component, pageProps }) {
  const [socket, setSocket] = useState()

  const SWROptions = {
    fetcher: (url, token) => axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data)
  }

  return (
    <Provider session={pageProps.session}>
      <SocketContextProvider value={{ socket, setSocket }}>
        <SWRConfig value={SWROptions}>
          <ToastProvider
          autoDismiss
          placement='top-center'>
            <Page>
              <PleaseSignIn>
                <Component {...pageProps} />
              </PleaseSignIn>
            </Page>
          </ToastProvider>
        </SWRConfig>
      </SocketContextProvider>
    </Provider>
  )
}

export { MyApp as default, SocketContext }

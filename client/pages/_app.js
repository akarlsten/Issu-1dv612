import React, { useState, useEffect, createContext } from 'react'
import { Provider, useSession, getSession } from 'next-auth/client'
import { io } from 'socket.io-client'
import { SWRConfig } from 'swr'
// import { SocketProvider, useSocket } from 'context/SocketContext'

import axios from 'axios/axios'
import '../styles/globals.css'

import Page from 'components/Page'

const SocketContext = createContext()
const SocketContextProvider = SocketContext.Provider

function MyApp ({ Component, pageProps }) {
  const [socket, setSocket] = useState()
  const session = pageProps.session

  const SWROptions = {
    fetcher: (url, token) => axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data)
  }

  useEffect(() => {
    if (session) {
      const freshSocket = io.connect(process.env.NEXT_PUBLIC_API_URL, { auth: { token: session.accessToken } })
      setSocket(freshSocket)
    } else {
      if (socket) {
        socket.disconnect()
        setSocket(undefined)
      }
    }
    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [session])

  // TODO: below is placeholder
  useEffect(() => {
    if (socket) {
      socket.on('connect', () => console.log('what'))
    }
  }, [socket])

  return (
    <Provider session={pageProps.session}>
      <SocketContextProvider value={{ socket, setSocket }}>
        <SWRConfig value={SWROptions}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </SWRConfig>
      </SocketContextProvider>
    </Provider>
  )
}

export { MyApp as default, SocketContext }

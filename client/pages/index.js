import Head from 'next/head'
import { SWRConfig } from 'swr'
import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'

import axios from 'axios/axios'

import MenuBar from 'components/MenuBar'
import Sidebar from 'components/Sidebar'
import Container from 'components/Container'
import Landing from 'components/Landing'

export default function Home () {
  const [session, loading] = useSession()

  const SWROptions = {
    fetcher: (url, token) => axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data)
  }

  return (
    <SWRConfig value={SWROptions}>
    <div className="mx-auto container flex flex-col h-full bg-white p-4 m-4">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col">
        <MenuBar />
        <main className="flex">
          {session
            ? (
            <>
              <Sidebar />
              <Container />
            </>
              )
            : (
            <Landing />
              )}

        </main>
      </div>
    </div>
    </SWRConfig>
  )
}

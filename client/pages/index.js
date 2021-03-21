import Head from 'next/head'

import Sidebar from 'components/Sidebar'
import Container from 'components/Container'
import MenuBar from 'components/MenuBar'

export default function Home () {
  return (
    <div className="mx-auto container flex flex-col h-full bg-white p-4 m-4 rounded-lg">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col">
        <MenuBar />
        <main className="flex">
          <Sidebar />
          <Container />
        </main>
      </div>
    </div>
  )
}

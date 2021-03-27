import Head from 'next/head'
import { useSession, getSession } from 'next-auth/client'

import MenuBar from 'components/MenuBar'
import Sidebar from 'components/Sidebar'
import Container from 'components/Container'
import Landing from 'components/Landing'

export default function Home () {
  const [session, loading] = useSession()

  return (
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
  )
}

// TODO: maybe remove, this should only be added to pages which need login
export async function getServerSideProps (ctx) {
  const session = await getSession(ctx)
  return ({ props: { session } })
}

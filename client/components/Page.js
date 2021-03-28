import Head from 'next/head'

import MenuBar from 'components/MenuBar'

const Page = ({ children }) => {
  return (
    <>
      <div className="mx-auto container flex flex-col h-full bg-white p-4 m-4">
        <Head>
          <title>ISSU</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex flex-col">
          <MenuBar />
          <main className="flex">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

export default Page

import { useSession, getSession } from 'next-auth/client'

import Container from 'components/Container'
import Landing from 'components/Landing'

export default function Home () {
  const [session, loading] = useSession()

  return (
    <>
      {session
        ? (
          <>
            <Container />
          </>
          )
        : (
          <Landing />
          )}
    </>
  )
}

// TODO: maybe remove, this should only be added to pages which need login
export async function getServerSideProps (ctx) {
  const session = await getSession(ctx)
  return ({ props: { session } })
}

import { useSession, getSession } from 'next-auth/client'

import Feed from 'components/Feed'
import Landing from 'components/Landing'

export default function Home () {
  const [session, loading] = useSession()

  return (
    <>
          {session
            ? (
            <>
              <Feed />
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

import { useSession } from 'next-auth/client'

import Landing from 'components/Landing'

function PleaseSignIn ({ children }) {
  const [session, loading] = useSession()

  if (!session) {
    return <Landing />
  }

  return children
}

export default PleaseSignIn

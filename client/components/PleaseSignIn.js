import { useSession, signIn } from 'next-auth/client'

function PleaseSignIn ({ children }) {
  const [session, loading] = useSession()
  // TODO Loading..
  if (!session) return signIn()
  return children
}

export default PleaseSignIn

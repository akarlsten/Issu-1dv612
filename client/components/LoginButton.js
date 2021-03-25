import { signIn, signOut, useSession } from 'next-auth/client'

const LoginButton = () => {
  const [session, loading] = useSession()

  return (
    <>
    {!session && (
      <a className='cursor-pointer' onClick={() => signIn()}>Login with Gitlab</a>
    )}
    {session && (
      <a className='cursor-pointer' onClick={() => signOut()}>Hej {session.user.name}</a>
    )}
    </>
  )
}

export default LoginButton

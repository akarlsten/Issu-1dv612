import { signIn, signOut, useSession } from 'next-auth/client'

const LoginButton = () => {
  const [session, loading] = useSession()

  return (
    <>
    {!session && (
        <a className='cursor-pointer bg-blue-200 p-2 hover:bg-blue-500 hover:text-white' onClick={() => signIn()}>Login with Gitlab</a>
    )}
    {session && (
      <div className="flex space-x-4 items-center">
          <div className="flex items-center">
            <img loading="lazy" className={'w-10 h-10 border border-blue-200 rounded-full'} src={session?.user?.image} alt="" />
            <p className="ml-2 font-medium text-sm">{session?.user?.name}</p>
          </div>
          <a className='cursor-pointer bg-blue-200 p-2 hover:bg-blue-500 hover:text-white' onClick={() => signOut()}>Logout</a>
      </div>
    )}
    </>
  )
}

export default LoginButton

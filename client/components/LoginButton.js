import { signIn, signOut, useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import axios from 'axios/axios'

import useRequest from 'hooks/useRequest'

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

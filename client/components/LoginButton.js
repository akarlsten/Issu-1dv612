import { signIn, signOut, useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import axios from 'axios/axios'

import useRequest from 'hooks/useRequest'

const LoginButton = () => {
  const [session, loading] = useSession()

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        const projects = await axios({ url: 'http://localhost:5000/', headers: { Authorization: `Bearer ${session.accessToken}` } })
        console.log(projects)
      }

      fetchData()
    }
  }, [session])

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

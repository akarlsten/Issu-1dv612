import { signIn, signOut, useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import axios from 'axios/axios'

import useRequest from 'hooks/useRequest'

const LoginButton = () => {
  const [session, loading] = useSession()

  const { data, error } = useSWR(['gitlab/groups', session?.accessToken])

  useEffect(() => {
    console.log(data)
  }, [data])

  // useEffect(() => {
  //   if (session) {
  //     axios.interceptors.request.use(request => {
  //       request.headers.Authorization = `Bearer ${session.accessToken}`
  //       return request
  //     })
  //   }
  // }, [session])

  // useEffect(() => {
  //   if (session) {
  //     const fetchData = async () => {
  //       const projects = await axios({ url: '/gitlab/groups' })
  //       console.log(projects)
  //     }

  //     fetchData()
  //   }
  // }, [session])

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

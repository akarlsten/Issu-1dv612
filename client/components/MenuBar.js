import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { useToasts } from 'react-toast-notifications'
import { useSession } from 'next-auth/client'
import { mutate } from 'swr'

import Link from 'next/link'
import LoginButton from 'components/LoginButton'

import useSocket from 'hooks/useSocket'

const MenuBar = () => {
  const [session, loading] = useSession()
  const { addToast } = useToasts()
  const { socket, setSocket } = useSocket()

  useEffect(() => {
    if (session && !socket) {
      const freshSocket = io.connect(process.env.NEXT_PUBLIC_API_URL, { auth: { token: session.accessToken } })
      setSocket(freshSocket)
    } else if (!session) {
      if (socket) {
        socket.disconnect()
        setSocket(undefined)
      }
    }
    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  })

  useEffect(() => {
    if (socket) {
      socket.on('newEvent', (event) => {
        console.log(event)
        addToast(
          `New ${event?.data?.object_kind} event in project: ${event?.data?.project?.name}!`,
          { appearance: 'info' })

        // hacky to do this here but we're out of time!!
        mutate(['gitlab/events?page=1&per_page=100', session?.accessToken])
        mutate(['gitlab/events?page=1&per_page=5', session?.accessToken])
      })
    }
  }, [socket])

  return (
    <div className="flex justify-between items-center mb-8">
      <Link href="/">
        <div className="flex flex-col items-center">
        <p className="cursor-pointer font-black text-5xl text-gray-800">ISSU</p>
        <p className="font-medium text-xs">Live Issue Feed</p>
        </div>
      </Link>
      <div className="flex w-full justify-end space-x-2 font-bold items-center">
        <Link href="/groups">
          <a className="p-2">Groups</a>
        </Link>
        <Link href="/settings">
          <a className="p-2">Settings</a>
        </Link>
        <LoginButton />
      </div>
    </div>
  )
}

export default MenuBar

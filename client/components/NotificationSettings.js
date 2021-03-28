import useSWR from 'swr'
import { getSession, useSession } from 'next-auth/client'
import { useEffect } from 'react'

const NotificationSettings = ({ groupId }) => {
  const [session, loading] = useSession()

  const { data, error, loadingHooks } = useSWR([`gitlab/groups/${groupId}/hooks`, session?.accessToken])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <p className="text-2xl font-bold">Notifications</p>
  )
}

export default NotificationSettings

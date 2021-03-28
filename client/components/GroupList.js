import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import LoadingSpinner from 'components/LoadingSpinner'
import GroupItem from 'components/GroupItem'

const GroupList = () => {
  const [session, loading] = useSession()

  const { data, error, loadingGroups } = useSWR(['gitlab/groups?min_access_level=50&per_page=100', session?.accessToken])

  useEffect(() => {
    console.log(data)
  }, [data])

  if (loadingGroups || !data) return <LoadingSpinner />

  return (
    <div className="space-y-4">
      <p className="text-2xl font-bold">Groups</p>
      {data.map(group =>
      <GroupItem key={group?.id} group={group} />
      )}
      <p className="text-sm font-semibold">Only groups where you are a maintainer and have access to webhooks are visible.</p>
    </div>
  )
}

export default GroupList

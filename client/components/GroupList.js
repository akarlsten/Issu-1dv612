import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import LoadingSpinner from 'components/LoadingSpinner'
import GroupItem from 'components/GroupItem'

const GroupList = () => {
  const [maxPages, setMaxPages] = useState(1)
  const [pageIndex, setPageIndex] = useState(1)
  const [session, loading] = useSession()

  const { data: groups } = useSWR(['gitlab/groups?min_access_level=50&per_page=100', session?.accessToken])
  const { data, error, loadingGroups } = useSWR([`gitlab/groups?min_access_level=50&page=${pageIndex}&per_page=5`, session?.accessToken])

  useEffect(() => {
    if (groups) {
      if (groups?.length < 100) {
        setMaxPages(Math.ceil(groups.length / 5))
      } else {
        setMaxPages('20+')
      }
    }
  }, [groups])

  const handleIncrement = () => {
    setPageIndex(pageIndex + 1)
  }

  const handleDecrement = () => {
    const newPage = pageIndex - 1 >= 1 ? pageIndex - 1 : 1

    setPageIndex(newPage)
  }

  if (loadingGroups || !data) return <LoadingSpinner />

  return (
    <div>
      <p className="text-2xl font-bold mb-4">Groups</p>
      <div className="space-y-4">
      {data.map(group =>
      <GroupItem key={group?.id} group={group} />
      )}
      </div>
      <div className="flex mt-4">
        {pageIndex > 1 && (
          <button onClick={handleDecrement} className="font-bold text-base p-2 mr-2 bg-blue-200">Previous</button>
        )}
        {pageIndex < maxPages && (
          <button onClick={handleIncrement} className="font-bold text-base p-2 bg-blue-200 mr-2">Next</button>
        )}
        <p className="font-bold text-sm py-2">Page {pageIndex}/{maxPages}</p>
        </div>
      <p className="text-sm font-semibold mt-2">Only groups where you are a maintainer and have access to webhooks are visible.</p>
    </div>
  )
}

export default GroupList

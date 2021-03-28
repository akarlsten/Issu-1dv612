import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import LoadingSpinner from 'components/LoadingSpinner'
import FeedItem from 'components/FeedItem'

const Feed = () => {
  const [maxPages, setMaxPages] = useState(1)
  const [pageIndex, setPageIndex] = useState(1)
  const [session, loading] = useSession()

  const { data: user, userError, loadingUser } = useSWR(['me', session?.accessToken])
  const { data: events } = useSWR(['gitlab/events?page=1&per_page=100', session?.accessToken])
  const { data, error, loadingGroups } = useSWR([`gitlab/events?page=${pageIndex}&per_page=5`, session?.accessToken])
  const { preloadData, preloadError, preloadingGroups } = useSWR([`gitlab/events?page=${pageIndex + 1}&per_page=5`, session?.accessToken])

  useEffect(() => {
    if (events) {
      if (events?.length < 100) {
        setMaxPages(Math.ceil(events.length / 5))
      } else {
        setMaxPages('20+')
      }
    }
  }, [events])

  const handleIncrement = () => {
    setPageIndex(pageIndex + 1)
  }

  const handleDecrement = () => {
    const newPage = pageIndex - 1 >= 1 ? pageIndex - 1 : 1

    setPageIndex(newPage)
  }

  if (loadingUser || loadingGroups) return <LoadingSpinner />

  return (
    <div className="w-full">
      <p className="text-2xl font-bold mb-4">Feed</p>
      <div className="flex flex-col justify-items-stretch">
        {data?.map(event => (
          <FeedItem key={event._id} event={event} user={user} />
        ))}
      </div>
      <div className="flex">
        {pageIndex > 1 && (
          <button onClick={handleDecrement} className="font-bold text-base p-2 mr-2 bg-blue-200">Previous</button>
        )}
        {pageIndex < maxPages && (
          <button onClick={handleIncrement} className="font-bold text-base p-2 bg-blue-200 mr-2">Next</button>
        )}
        <p className="font-bold text-sm py-2">Page {pageIndex}/{maxPages}</p>
      </div>
    </div>
  )
}

export default Feed

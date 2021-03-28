import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/client'

import LoadingSpinner from 'components/LoadingSpinner'
import NotificationSettings from 'components/NotificationSettings'
import ProjectItem from 'components/ProjectItem'

const Group = () => {
  const [maxPages, setMaxPages] = useState(1)
  const [pageIndex, setPageIndex] = useState(1)

  const router = useRouter()
  const { gid } = router.query

  const [session, loading] = useSession()

  const { data: projects } = useSWR([`gitlab/groups/${gid}/projects?per_page=100`, session?.accessToken])
  const { data, error, loadingProjects } = useSWR([`gitlab/groups/${gid}/projects?page=${pageIndex}&per_page=5`, session?.accessToken])

  useEffect(() => {
    if (projects) {
      if (projects?.length < 100) {
        setMaxPages(Math.ceil(projects?.length / 5))
      } else {
        setMaxPages('20+')
      }
    }
  }, [projects])

  const handleIncrement = () => {
    setPageIndex(pageIndex + 1)
  }

  const handleDecrement = () => {
    const newPage = pageIndex - 1 >= 1 ? pageIndex - 1 : 1

    setPageIndex(newPage)
  }

  if (error) {
    return <p className="text-2xl font-light">We couldn't fetch this group - do you have access? 😥</p>
  }

  if (loadingProjects || !data) return <LoadingSpinner />

  return (
    <div className="space-y-4">
      {data[0]
        ? (
        <>
          <p className="text-2xl font-bold">Projects for {data[0]?.namespace?.name}</p>
          <div className="flex flex-wrap">
          {data.map(project =>
            <ProjectItem key={project.id} project={project} />
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
        </>
          )
        : (
          <p className="text-2xl font-light">This group has no projects yet! 😥</p>
          )}
      <NotificationSettings groupId={gid} />
    </div>
  )
}

export async function getServerSideProps (ctx) {
  const session = await getSession(ctx)
  return ({ props: { session } })
}

export default Group

import useSWR from 'swr'
import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/client'

import LoadingSpinner from 'components/LoadingSpinner'
import NotificationSettings from 'components/NotificationSettings'

const Group = () => {
  const router = useRouter()
  const { gid } = router.query

  const [session, loading] = useSession()

  const { data, error, loadingProjects } = useSWR([`gitlab/groups/${gid}/projects?&per_page=100`, session?.accessToken])

  useEffect(() => {
    console.log(data)
  }, [data])

  if (loadingProjects || !data) return <LoadingSpinner />

  return (
    <div className="space-y-4">
      {data[0]
        ? (
        <>
          <p className="text-2xl font-bold">Projects for {data[0]?.namespace?.name}</p>
          <div className="flex">
          {data.map(project =>
            <div key={project.id} className="w-64 bg-blue-100 rounded-lg p-2 flex flex-col">
              <div className="flex place-content-between items-center mb-2">
                <a href={project.web_url} target="_blank" rel="noreferrer" className="font-semibold text-xl hover:text-blue-700">{project.name}</a>
                <p className="font-bold text-xs">⭐ {project.star_count}</p>
              </div>
              <div className="font-bold text-xs">
                <p>Issues: {project.open_issues_count}</p>
                <p>Forks: {project.forks_count}</p>
              </div>
            </div>
          )}
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

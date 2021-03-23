import axios from 'axios/axios'
import useSession from 'next-auth/client'
import { useEffect, useState } from 'react'

const GroupList = () => {
  const [session, loading] = useSession()
  console.log(session)
  // const [projects, setProjects] = useState()

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        const projects = await axios({ url: '/groups', headers: { Authorization: `Bearer ${session.gitlabToken}` } })
        console.log(projects)
      }

      fetchData()
    }
  }, [session])

  return (
    <div></div>
  )
}

export default GroupList

import { useRouter } from 'next/router'
import axios from 'axios/axios'

const Group = () => {
  const router = useRouter()
  const { gid } = router.query

  return (
    <div>hello {gid}</div>
  )
}

export default Group

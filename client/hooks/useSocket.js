import { useContext } from 'react'
import { SocketContext } from 'pages/_app'

function useSocket () {
  const all = useContext(SocketContext)
  return all
}

export default useSocket

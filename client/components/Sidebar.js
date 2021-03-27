import { useEffect, useContext } from 'react'
import useSocket from 'hooks/useSocket'

import Dropdown from 'components/Dropdown'

const Sidebar = () => {
  const { socket } = useSocket()

  useEffect(() => {
    console.log('waowii', socket)
  }, [socket])

  return (
    <div className="w-1/4 flex flex-col">
      <Dropdown />
      <div className="font-semibold text-lg">blabla</div>
    </div>
  )
}

export default Sidebar

import Link from 'next/link'

const GroupItem = ({ group }) => {
  const [course, ...path] = group.full_name.split('/')

  return (
    <Link href={`/group/${group.id}`}>
      <div className="cursor-pointer bg-blue-100 hover:bg-blue-200 rounded-lg p-2 flex flex-col">
        <p className="text-sm">{course}</p>
        <p className="text-xs">{path.join('/')}</p>
        <p className="font-semibold">{group.name}</p>
      </div>
    </Link>
  )
}
//         {group.request_access_enabled && <p className="font-bold text-green-500">Realtime notifications available!</p>}

export default GroupItem

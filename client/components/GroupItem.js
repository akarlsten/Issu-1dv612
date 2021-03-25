
const GroupItem = ({ group }) => {
  const [course, ...path] = group.full_name.split('/')

  return (
    <div className=" bg-blue-100 rounded-lg p-2 flex flex-col">
      <p className="text-sm">{course}</p>
      <p className="text-xs">{path.join('/')}</p>
      <p className="font-semibold">{group.name}</p>
      {group.request_access_enabled && <p className="font-bold text-green-500">Realtime notifications available!</p>}
    </div>
  )
}

export default GroupItem

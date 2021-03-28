import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import parseISO from 'date-fns/parseISO'
import isAfter from 'date-fns/isAfter'

const FeedText = ({ event }) => {
  switch (event.object_kind) {
    case 'merge_request':
      return <p className="text-sm">Merge request <span className="font-bold">{event.object_attributes.title}</span> for <span className="font-bold">{event.project.name}</span> has been updated!</p>
    case 'release':
      return <p className="text-sm">New release! <span className="font-bold">{event.name} - {event.tag}</span> for project <span className="font-bold">{event.project.name}</span>!</p>
    case 'issue':
      return <p className="text-sm">Added an {event.event_type} to the repo <span className="font-bold">{event.project.name}</span>!</p>
    case 'push':
      return <p className="text-sm">Did a {event.event_name} to the repo <span className="font-bold">{event.project.name}</span>!</p>
    case 'note':
      return <p className="text-sm">Added a {event.event_type} to the issue <span className="font-bold">{event.object_attributes.description}</span> in repo <span className="font-bold">{event.project.name}</span>!</p>
    default:
      return <p className="text-sm">A new event was added!</p>
  }
}

const FeedAvatar = ({ event }) => {
  switch (event.object_kind) {
    case 'release':
      return (
        <div className="flex items-center">
          <p className="font-bold text-sm">{event.project.name} - Developers </p>
        </div>
      )
    case 'merge_request':
    case 'note':
    case 'issue':
      return (
        <div className="flex items-center">
          <img loading="lazy" className={'w-10 h-10 border border-blue-200 rounded-full'} src={event.user.avatar_url} alt="" />
          <p className="ml-2 font-bold text-sm">{event.user.name} <span className="font-medium">({event.user.username})</span></p>
        </div>
      )
    case 'push':
      return (
        <div className="flex items-center">
          <img loading="lazy" className={'w-10 h-10 border border-blue-200 rounded-full'} src={event.user_avatar} alt="" />
          <p className="ml-2 font-bold text-sm">{event.user_name} <span className="font-medium">({event.user_username})</span></p>
        </div>
      )
    default:
      return (
        <div className="flex items-center">
          <p className="ml-2 font-bold text-sm">Someone</p>
        </div>
      )
  }
}

const FeedItem = ({ event, user }) => {
  const isNew = isAfter(parseISO(event.createdAt), parseISO(user.lastVisited))

  let url

  switch (event.data.object_kind) {
    case 'release':
      url = event.data.url
      break
    case 'merge_request':
    case 'issue':
    case 'note':
      url = event.data.object_attributes.url
      break
    case 'push':
    default:
      url = event.data.project.web_url
      break
  }

  return (
    <a href={`${url}`} target="_blank" rel="noreferrer" className={`mb-4 cursor-pointer ${isNew ? 'bg-green-100 hover:bg-green-200' : 'bg-blue-100 hover:bg-blue-200'} p-2 flex flex-col`}>
      <div className="flex items-center justify-between">
        <FeedAvatar event={event.data} />
        <div className="flex flex-col">
          {isNew && <p className="font-bold">New!</p>}
          <p className="text-sm font-medium">{formatDistanceToNow(parseISO(event.createdAt))} ago</p>
        </div>
      </div>
      <div className="mt-2">
        <FeedText event={event.data} />
      </div>
    </a>
  )
}

export default FeedItem

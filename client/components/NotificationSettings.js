
import { useToasts } from 'react-toast-notifications'
import useSWR, { mutate } from 'swr'
import { getSession, useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'

import axios from 'axios/axios'

const NotificationSettings = ({ groupId }) => {
  const { addToast } = useToasts()
  const [session, loading] = useSession()
  const [formData, setFormData] = useState({
    pushEvents: false,
    issuesEvents: false,
    mergeEvents: false,
    noteEvents: false,
    jobEvents: false,
    deploymentEvents: false,
    releaseEvents: false,
    subgroupEvents: false
  })

  const { data, error, loadingHooks } = useSWR([`gitlab/groups/${groupId}/hooks`, session?.accessToken])

  useEffect(() => {
    if (data) {
      setFormData(data)
    }
  }, [data])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    try {
      const hook = await axios.post(`/gitlab/groups/${groupId}/hooks`,
        formData,
        { headers: { Authorization: `Bearer ${session.accessToken}` } })
      if (hook) {
        addToast('Successfully set up notifications!', { appearance: 'success', autoDismiss: true })
        mutate([`gitlab/groups/${groupId}/hooks`, session?.accessToken])
      }
    } catch (e) {
      addToast('Error settign up notifications!', { appearance: 'error' })
    }
  }

  const handleRemove = async (e) => {
    e.preventDefault()
    try {
      const deleted = await axios.delete(`/gitlab/groups/${groupId}/hooks`, { headers: { Authorization: `Bearer ${session.accessToken}` } })
      if (deleted) {
        addToast('Turned off notifications for this group!', { appearance: 'success' })
        mutate([`gitlab/groups/${groupId}/hooks`, session?.accessToken])
        setFormData({
          pushEvents: false,
          issuesEvents: false,
          mergeEvents: false,
          noteEvents: false,
          jobEvents: false,
          deploymentEvents: false,
          releaseEvents: false,
          subgroupEvents: false
        })
      }
    } catch (e) {
      // fail silently
    }
  }

  return (
    <>
      <p className="text-2xl font-bold">Notifications {data ? '✅' : '❌'}</p>
      <form className="font-bold text-sm flex flex-col space-y-2" action="">
        <p className="text-xs font-bold">Activity in monitored groups will be SMSed to you, as well as show up in the feed.</p>
        <p className="text-xs font-bold mb-2">Select which events you want to subscribe to!</p>
        <div className="flex items-center">
          <input type="checkbox" name="pushEvents" checked={formData.pushEvents} onChange={() => setFormData(prev => ({ ...prev, pushEvents: !prev.pushEvents }))} />
          <label className="ml-2" htmlFor="pushEvents">Push Events</label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="issues" checked={formData.issuesEvents} onChange={() => setFormData(prev => ({ ...prev, issuesEvents: !prev.issuesEvents }))} />
          <label className="ml-2" htmlFor="issues">Issues</label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="mergeEvents" checked={formData.mergeEvents} onChange={() => setFormData(prev => ({ ...prev, mergeEvents: !prev.mergeEvents }))} />
          <label className="ml-2" htmlFor="mergeEvents">Merge Requests</label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="noteEvents" checked={formData.noteEvents} onChange={() => setFormData(prev => ({ ...prev, noteEvents: !prev.noteEvents }))} />
          <label className="ml-2" htmlFor="noteEvents">Note Events</label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="releaseEvents" checked={formData.releaseEvents} onChange={() => setFormData(prev => ({ ...prev, releaseEvents: !prev.releaseEvents }))} />
          <label className="ml-2" htmlFor="releaseEvents">Releases</label>
        </div>
        <div className="flex">
          <button onClick={handleSubmit} className="font-bold text-base p-2 bg-blue-200" type="submit">Save</button>
          {data && (
            <button onClick={handleRemove} className="ml-4 font-bold text-base p-2 bg-red-200">Remove</button>
          )}
        </div>
      </form>
    </>
  )
}

export default NotificationSettings

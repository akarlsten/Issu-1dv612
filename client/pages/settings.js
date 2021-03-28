import useSWR, { mutate } from 'swr'
import { useSession, getSession } from 'next-auth/client'
import { useState, useEffect } from 'react'

import axios from 'axios/axios'
import PleaseSignIn from 'components/PleaseSignIn'

const Settings = () => {
  const [phoneNumber, setPhoneNumber] = useState()
  const [session, loading] = useSession()

  const { data, error, loadingProjects } = useSWR(['me', session?.accessToken])

  const handleChange = (e) => {
    const trimmed = e.target.value.replace(/[a-zA-Z]/g, '')
    setPhoneNumber(trimmed)
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const user = await axios.post('/me', { phoneNumber: phoneNumber }, { headers: { Authorization: `Bearer ${session.accessToken}` } })
      if (user) {
        mutate(['me', session?.accessToken])
      }
    } catch (e) {}
  }

  return (
    <PleaseSignIn>
      <div className="flex flex-col">
      <p className="font-bold text-2xl mb-8">Your details</p>
      {data && (
        <div className="flex items-center">
          <div className="flex flex-col items-center">
              <img loading="lazy" className={'w-32 h-32 border border-blue-200 rounded-full'} src={data?.image} alt="" />
          </div>
          <div className="ml-8">
            <p className="font-bold">Name</p>
            <p>{data.name}</p>
            <p className="font-bold mt-2">Email</p>
            <p>{data.email}</p>
            <p className="font-bold mt-2">Phone Number</p>
            <form onSubmit={handleSubmit}>
              <input value={phoneNumber} onChange={handleChange} type="tel" name="" id="" defaultValue={data?.phoneNumber}/>
              <button className="p-2 bg-blue-200 font-bold ml-2" type="submit">Save</button>
            </form>
            <p className="text-xs font-semibold mt-2">This is used for SMS notifications.</p>
            <p className="text-xs font-semibold">Use format '+46761005050' rather than '0761005050'.</p>
          </div>
        </div>
      )}
    </div>
    </PleaseSignIn>
  )
}

export async function getServerSideProps (ctx) {
  const session = await getSession(ctx)
  return ({ props: { session } })
}

export default Settings

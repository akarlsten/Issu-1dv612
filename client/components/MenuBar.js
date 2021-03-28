import Link from 'next/link'
import LoginButton from 'components/LoginButton'

const MenuBar = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <Link href="/">
        <p className="cursor-pointer font-black text-5xl text-gray-800">ISSU</p>
      </Link>
      <div className="flex w-full justify-end space-x-2 font-bold items-center">
        <div className="p-2">Groups</div>
        <Link href="/settings">
          <a className="p-2">Settings</a>
        </Link>
        <LoginButton />
      </div>
    </div>
  )
}

export default MenuBar

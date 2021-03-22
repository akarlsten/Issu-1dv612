import LoginButton from 'components/LoginButton'

const MenuBar = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <p className="font-black text-5xl text-gray-800">ISSU</p>
      <div className="flex w-full justify-end space-x-4 font-bold">
        <div>Dashboard</div>
        <div>Settings</div>
        <LoginButton />
      </div>
    </div>
  )
}

export default MenuBar

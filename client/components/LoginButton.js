import openSignInWindow from 'util/open-popup'
import { useEffect } from 'react'

const LoginButton = () => {
  const clickHandler = () => {
    openSignInWindow(`https://gitlab.lnu.se/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GL_APP_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GL_REDIRECT}&response_type=code&state=${Math.random().toString(36).substr(2, 5)}&scope=api`, 'login-popup')
  }
  return (
    <a className='cursor-pointer' onClick={clickHandler}>Login with Gitlab</a>
  )
}

export default LoginButton

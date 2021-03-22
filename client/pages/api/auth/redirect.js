import axios from 'axios'

export default async function handler (req, res) {
  const code = req?.query?.code

  // if (code) {
  //   const response = await axios.post(`https://gitlab.lnu.se/oauth/token?client_id=${process.env.NEXT_PUBLIC_GL_APP_ID}&client_secret=${process.env.GL_APP_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.NEXT_PUBLIC_GL_REDIRECT}`)
  //   console.log(response.data)
  //   res.redirect(302, '/')
  // } else {
  //   res.status(400).send()
  // }
}

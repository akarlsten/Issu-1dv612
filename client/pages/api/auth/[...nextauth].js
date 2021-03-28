import NextAuth from 'next-auth'

const customGitlabProvider = (options) => {
  return {
    id: 'gitlab',
    name: 'GitLab',
    type: 'oauth',
    version: '2.0',
    scope: 'api',
    params: { grant_type: 'authorization_code' },
    accessTokenUrl: 'https://gitlab.lnu.se/oauth/token',
    authorizationUrl: 'https://gitlab.lnu.se/oauth/authorize?response_type=code',
    profileUrl: 'https://gitlab.lnu.se/api/v4/user',
    profile: (profile) => {
      return {
        id: profile.id,
        name: profile.username,
        email: profile.email,
        image: profile.avatar_url
      }
    },
    ...options
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    customGitlabProvider({
      clientId: process.env.GL_APP_ID,
      clientSecret: process.env.GL_APP_SECRET
    })
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGODB_ATLAS,
  callbacks: {
    async session (session, token) {
      return session
    }
  },
  secret: process.env.SESS_SECRET
})

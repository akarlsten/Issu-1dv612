import useSWR from 'swr'

const baseUrl = process.env.NEXT_PUBLIC_GL_BASE

export default (path, name) => {
  if (!path) {
    throw new Error('Path is required!')
  }

  const url = name ? baseUrl + path + '/' + name : baseUrl + path

  const { data, error } = useSWR(url)

  return { data, error }
}

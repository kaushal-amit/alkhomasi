import { createContext, useContext } from 'react'

// Which page is being rendered. Shared links (header, footer) use it to point
// at home-page sections from other pages ("/#faq" instead of "#faq").
const PageContext = createContext({ page: 'home', path: '/' })

export const PageProvider = PageContext.Provider
export const usePage = () => useContext(PageContext)

export function useHomeHref() {
  const { page } = usePage()
  return (hash) => (page === 'home' ? hash : `/${hash}`)
}

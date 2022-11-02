import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Header from '../components/Layout/Header'

const HeaderContext = createContext()

export function useHeaderContext() {
  return useContext(HeaderContext)
}

export function HeaderProvider({ children, content, pageHandle }) {
  const router = useRouter()
  const [megaMenuIsOpen, setmegaMenuIsOpen] = useState(false)
  const [megaMenu, setMegaMenu] = useState(false)
  const [megaMenuFeaturedProducts, setMegaMenuFeaturedProducts] = useState([])

  useEffect(() => {
    if (megaMenuIsOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }, [megaMenuIsOpen])

  useEffect(() => {
    const onRouteChangeComplete = () => {
      setmegaMenuIsOpen(false)
    }
    router.events.on('routeChangeComplete', onRouteChangeComplete)
  }, [router.pathname])

  return (
    <HeaderContext.Provider
      value={{
        megaMenuIsOpen,
        setmegaMenuIsOpen,
        megaMenu,
        setMegaMenu,
        megaMenuFeaturedProducts,
        setMegaMenuFeaturedProducts,
      }}
    >
      <Header content={content} pageHandle={pageHandle} />
      {children}
    </HeaderContext.Provider>
  )
}

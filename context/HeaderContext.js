import { createContext, useContext, useState, useRef } from 'react'

import Header from '../components/Layout/Header'

const HeaderContext = createContext()

export function useHeaderContext() {
  return useContext(HeaderContext)
}

export function HeaderProvider({ children, content, pageHandle }) {

  const [megaMenuIsOpen, setmegaMenuIsOpen] = useState(false)
  const [megaMenu, setMegaMenu] = useState(false)
  const [megaMenuFeaturedProducts, setMegaMenuFeaturedProducts] = useState([])

  const headerRef = useRef()

  // if(megaMenuIsOpen) {
  //   document.querySelector("body").classList.add("no-scroll")
  // } else {
  //   document.querySelector("body").classList.remove("no-scroll")
  // }

  return (
    <HeaderContext.Provider value={{ megaMenuIsOpen, setmegaMenuIsOpen, megaMenu, setMegaMenu, megaMenuFeaturedProducts, setMegaMenuFeaturedProducts}}>
      <Header ref={headerRef} content={content} pageHandle={pageHandle} />
      {children}
    </HeaderContext.Provider>
  )
}
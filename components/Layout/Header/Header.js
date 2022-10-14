import { useRef } from 'react'

import AnnouncementBar from '../AnnouncementBar'
import MainNavigation from '../MainNavigation'

export function Header({ content }) {

  const announcementBarRef = useRef()

  return (
      <>
        <header>
            {content.fields?.announcementBar.fields.enable &&
                <AnnouncementBar ref={announcementBarRef} props={content.fields.announcementBar} />
            }
            <nav className={`nav ${content.fields?.announcementBar.fields.enable ? 'annoucement-bar-is-enabled' : ''}`} id="SiteNav">
                <MainNavigation ref={announcementBarRef} props={content.fields} />
            </nav>
        </header>
      </>
    )
}

export default Header

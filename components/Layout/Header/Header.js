import PropTypes from 'prop-types'
import React, { Component } from 'react'

import AnnouncementBar from '../AnnouncementBar'
import MainNavigation from '../MainNavigation'
import MobileNavigation from '../MobileNavigation'

export function Header({ content }) {
  return (
      <>
        <header>
            {content.fields.announcementBar?.fields.enable &&
                <AnnouncementBar props={content.fields.announcementBar} />
            }
            <nav className='nav' id="SiteNav">
                <MainNavigation props={content.fields} />
                <MobileNavigation props={content.fields}/>
            </nav>
            
        </header>
      </>
    )
}

export default Header
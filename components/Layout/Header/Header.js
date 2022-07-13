import PropTypes from 'prop-types'
import React, { Component } from 'react'

import AnnouncementBar from '../AnnouncementBar'
import MainNavigation from '../MainNavigation'

export function Header({ content }) {

   console.log(content)

  return (
      <>
        <header>
            {content.fields.announcementBar?.fields.enable &&
                <AnnouncementBar props={content.fields.announcementBar} />
            }
            <MainNavigation props={content.fields} />
        </header>
      </>
    )
}

export default Header
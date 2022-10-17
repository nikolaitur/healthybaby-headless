import { forwardRef } from 'react'
import classes from './AnnouncementBar.module.scss'
import parse from 'html-react-parser'

const AnnouncementBar = forwardRef(({props}, ref) => {
    let { enable, text, backgroundColor } = props.fields

    if(backgroundColor.indexOf('#') !== 0) {
        backgroundColor = "#a0b0d2"
    }

    if (!enable) {
      return ''
    }

    return (
      <div ref={ref} className={classes.announcementBar} style={{ backgroundColor: backgroundColor }}>
        <p className={classes.announcementBarText}>{parse(text)}</p>
      </div>
    )
  })

  export default AnnouncementBar
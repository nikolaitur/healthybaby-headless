import classes from './AnnouncementBar.module.scss'

const AnnouncementBar = ({props}) => {
    let { enable, text, backgroundColor } = props.fields

    if(backgroundColor.indexOf('#') !== 0) {
        backgroundColor = "#a0b0d2"
    }
  
    if (!enable) {
      return ''
    }

    return (
      <div className={classes.announcementBar} style={{ backgroundColor: backgroundColor }}>
        <p className={classes.announcementBarText}>{text}</p>
      </div>
    )
  }
  
  export default AnnouncementBar
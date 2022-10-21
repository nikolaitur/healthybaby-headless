import React from 'react'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { useState, useEffect } from 'react'
import ArrowLeft from '../../../svgs/arrow-left-mobile.svg'
import IconClose from '../../../svgs/close-icon.svg'

const TranscriptDrawer = ({ title, content }) => {
  const [transcriptContent, setTranscriptContent] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const showDrawer = () => {
    setDrawerOpen(true)
  }

  const hideDrawer = () => {
    setDrawerOpen(false)
  }

  useEffect(() => {
    const getRichTextToHtml = () => {
      if (content) {
        setTranscriptContent(documentToHtmlString(content))
      } else {
        setArticleContent('')
      }
    }
    getRichTextToHtml()
  })
  return (
    <>
      <div className="podcast-hero__transcript-open" onClick={showDrawer}>
        Read the Transcript
      </div>
      <div className={`transcript-drawer ${drawerOpen ? 'active' : ''}`}>
        <div className="transcript-drawer__overlay" onClick={hideDrawer}></div>
        <div className="transcript-drawer__container">
          <div className="transcript-drawer__content">
            <div className="transcript-drawer__header">
              <div
                className="transcript-drawer__header-back"
                onClick={hideDrawer}
              >
                <ArrowLeft />
                <span>Back</span>
              </div>
            </div>
            <div className="transcript-drawer__eyebrow">Transcript</div>
            <div className="transcript-drawer__title">{title}</div>
            <div
              className="transcript-drawer__body"
              dangerouslySetInnerHTML={{
                __html: transcriptContent,
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TranscriptDrawer

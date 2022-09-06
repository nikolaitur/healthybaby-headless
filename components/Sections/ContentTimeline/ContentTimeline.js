import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ContentTimeline = ({ content }) => {
   const { header, subheader, sections } = content.fields
   console.log(content)

    return (
        <section className="content-timeline">
            <div className="content-timeline__container container">
                <div classname="content-timeline__content">
                    <h6 className="content-timeline__subheader">{ subheader }</h6>
                    <h2 className="content-timeline__header">{ header }</h2>
                </div>
            </div>   
        </section>
    )
}

export default ContentTimeline

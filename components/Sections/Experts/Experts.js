import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const Experts = ({ content }) => {
   const { header, subheader, sections } = content.fields
   console.log(content)

    return (
        <section className="experts">
            <div className="experts__container container">
                <div className="experts__content">
                    <h6 className="experts__subheader">{ subheader }</h6>
                    <h2 className="experts__header">{ header }</h2>
                </div>
            </div>   
        </section>
    )
}

export default Experts

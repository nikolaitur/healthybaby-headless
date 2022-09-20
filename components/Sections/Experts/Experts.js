import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const Experts = ({ content }) => {

    return (
        <section className="experts">
            <div className="experts__container container">
                <div className="experts__content">
                    {content.fields?.subheader ? (
                        <h6 className="experts__subheader">{ content.fields.subheader }</h6>
                    ) : ""}
                    {content.fields?.header ? (
                        <h2 className="experts__header">{ content.fields.header }</h2>
                    ) : ""}
                </div>
                {content.fields?.sections ? (
                    <div className="experts__wrapper"> 
                        {content.fields.sections.map((item, index) => (
                            <div className="experts__expert" key={index}>
                                {item.fields?.image ? (
                                    <div className="experts__image">
                                        <Image
                                            className=""
                                            src={`https:${item.fields.image.fields.file.url}`}
                                            alt={item.fields.image.fields.title}
                                            layout="responsive"
                                            objectFit="cover"
                                            height="512"
                                            width="512"
                                        />
                                    </div>
                                ) : ""}
                                <div className="experts__name">{ item.fields.name }</div>
                                <p className="experts__description">{ item.fields.description }</p>
                                <div className="experts__cta">
                                    <Link href={item.fields.ctaUrl}>
                                        <button className="link">{ item.fields.ctaText }</button>
                                    </Link>
                                </div>      
                            </div>
                        ))}                    
                    </div>
                ) : ""}
            </div>   
        </section>
    )
}

export default Experts

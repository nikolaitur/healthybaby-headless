import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const WowAndHow = ({ content }) => {
    const { header, subheader, copy, babyStage, ctaText, ctaUrl, showStars, backgroundColor } = content.fields
    const imageGrid1 = content.fields.imageGrid1.fields.file.url    
    const imageGrid2 = content.fields.imageGrid2.fields.file.url  
    const imageGrid3 = content.fields.imageGrid3.fields.file.url 
    const imageGrid4 = content.fields.imageGrid4.fields.file.url 

    if(backgroundColor.indexOf('#') !== 0) {
        backgroundColor = "#C7E0E5"
    }

    return (
        <section className="wow-and-how" style={{ backgroundColor: backgroundColor }} data-background-color="teal">
            <div className="wow-and-how__container container">
                <div className="wow-and-how__image wow-and-how__image--desktop">
                    <div className="wow-and-how__grid">
                        <Image
                            src={`https:${imageGrid1}`}
                            alt={``}
                            width="465"
                            height="370"
                        />
                        <Image
                            src={`https:${imageGrid2}`}
                            alt={``}
                            width="215"
                            height="185"
                        />
                        <Image
                            src={`https:${imageGrid3}`}
                            alt={``}
                            width="215"
                            height="215"
                        />
                        <Image
                            src={`https:${imageGrid4}`}
                            alt={``}
                            width="465"
                            height="370"
                        />
                    </div>
                </div>
                <div className="wow-and-how__content">
                    <div className="wow-and-how__subheader">{ subheader }</div>
                    <div className="wow-and-how__header">{ header }</div>
                    <div className="wow-and-how__copy">{ copy }</div>
                    <div className="wow-and-how__cta">
                        <Link href={ctaUrl}>
                            <div className="wow-and-how__button">
                                <span>{ ctaText }</span>
                            </div>
                        </Link>
                    </div>
                    <div className="wow-and-how__image wow-and-how__image--mobile">
                        <Image
                            src={`https://images.ctfassets.net/urdrzzac4igp/1PQUBAWs7qIxzxDQBgU0YE/b7e3f797e9a8a3212e879cc70abecb9d/Group_266.png`}
                            alt={``}
                            width="785"
                            height="770"
                        />
                    </div>
                    <div className="wow-and-how__subheader">BROWSE BY STAGE</div>
                    <div className="wow-and-how__stages">
                        {babyStage.map((stage, index) => (                        
                            <div className="wow-and-how__stage" key={index}>
                                <Link href={stage.fields.ctaUrl}>{ stage.fields.ctaText }</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WowAndHow

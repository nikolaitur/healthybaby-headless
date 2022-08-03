import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const WowAndHow = ({ content }) => {
    // const { ctaText, ctaUrl } = content.fields
    // const backgroundImage = content.fields.image.fields.file.url    
    return (
        <section className="wow-and-how">
            <div className="wow-and-how__container container">
                <div className="wow-and-how__image">
                    <Image
                        src={`https://images.ctfassets.net/urdrzzac4igp/1PQUBAWs7qIxzxDQBgU0YE/b7e3f797e9a8a3212e879cc70abecb9d/Group_266.png`}
                        alt={``}
                        width="785"
                        height="770"
                    />
                </div>
                <div className="wow-and-how__content">
                    <div className="wow-and-how__subheader">UNLOCK DEVELOPMENT IN DAILY LIFE</div>
                    <div className="wow-and-how__header">
                        The Wow & The How
                    </div>
                    <div className="wow-and-how__copy">
                        For the first time ever, the world's leading experts in developmental health have come together to create a comprehensive, cognitive based educational series.
                    </div>
                    <div className="wow-and-how__cta">
                        <Link href="/">
                            <div className="wow-and-how__button">
                                <span>Discover The Full Series</span>
                            </div>
                        </Link>
                    </div>
                    <div className="wow-and-how__subheader">BROWSE BY STAGE</div>
                    <div className="wow-and-how__stages">
                        <div className="wow-and-how__stage">Birth</div>
                        <div className="wow-and-how__stage">Month 1</div>
                        <div className="wow-and-how__stage">Month 2</div>
                        <div className="wow-and-how__stage">Month 3</div>
                        <div className="wow-and-how__stage">Month 4</div>
                        <div className="wow-and-how__stage">Month 5</div>
                        <div className="wow-and-how__stage">Month 6</div>
                        <div className="wow-and-how__stage">Month 7</div>
                        <div className="wow-and-how__stage">Month 8</div>
                        <div className="wow-and-how__stage">Month 9</div>
                        <div className="wow-and-how__stage">Month 10</div>
                        <div className="wow-and-how__stage">More +</div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default WowAndHow

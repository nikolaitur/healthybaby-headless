import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const About = ({ content }) => {
    // const { ctaText, ctaUrl } = content.fields
    // const backgroundImage = content.fields.image.fields.file.url    
    return (
        <section className="about">
            <div className="about__container container">
                <div className="about__content">
                    <div className="about__subheader">OUR STORY</div>
                    <div className="about__header">
                        Our life’s work is centered around protecting & promoting babies’ health
                    </div>
                    <div className="about__copy">
                        Healthybaby is the culmination of all we’ve learned in navigating the challenges of raising a child with special needs & then seeing how both of our children benefitted from all our research, protection, & enrichment...
                    </div>
                </div>
                <div className="about__image">
                    <Image
                        src={`https://images.ctfassets.net/urdrzzac4igp/7vwk1qlvTIAgdbpqcyBQy5/ca7c318804045d99da3f640195d32140/Mask_group__1_.png`}
                        alt={``}
                        width="785"
                        height="750"
                    />
                </div>
            </div>
        </section>
    )
}

export default About

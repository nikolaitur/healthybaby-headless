import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ContentTimeline = ({ content }) => {
   const { header, subheader, sections } = content.fields
   console.log(content)

    return (
        <section className="content-timeline">
            <div className="content-timeline__container container">
                <div className="content-timeline__sticky">
                    <div className="content-timeline__image">
                        <img src="https://images.ctfassets.net/urdrzzac4igp/24DPZ4zJDxzpN2EhWBX8rU/43760e7200c64394c1914af060c00472/Mask_group__16_.png" />
                    </div>
                </div>
                <div className="content-timeline__content">
                    <h6 className="content-timeline__subheader">{ subheader }</h6>
                    <h3 className="content-timeline__header">{ header }</h3>
                    <h4 className="content-timeline__description">We partnered with the leading prenatal nutrition researcher in the world and the Neurological Health Foundation</h4>
                    <div className="content-timeline__items">
                        <div className="content-timeline__line"></div>
                        <div className="content-timeline__item">
                            <div className="content-timeline__title">0 FDA regulations for prenatal vitamins</div>
                            <p className="content-timeline__copy large">Did you know the FDA has never published a standard for prenatal nutrition, and does not regulate this category?  We were shocked too!  </p>
                        </div>
                        <div className="content-timeline__item">
                            <div className="content-timeline__title">0 FDA regulations for prenatal vitamins</div>
                            <p className="content-timeline__copy large">Did you know the FDA has never published a standard for prenatal nutrition, and does not regulate this category?  We were shocked too!  </p>
                        </div>
                        <div className="content-timeline__item">
                            <div className="content-timeline__title">0 FDA regulations for prenatal vitamins</div>
                            <p className="content-timeline__copy large">Did you know the FDA has never published a standard for prenatal nutrition, and does not regulate this category?  We were shocked too!  </p>
                        </div>
                        <div className="content-timeline__item">
                            <div className="content-timeline__title">0 FDA regulations for prenatal vitamins</div>
                            <p className="content-timeline__copy large">Did you know the FDA has never published a standard for prenatal nutrition, and does not regulate this category?  We were shocked too!  </p>
                        </div>
                    </div>
                </div>
            </div>   
        </section>
    )
}

export default ContentTimeline

import React from 'react'
import Image from 'next/image';

import ValuePropSvg1 from '../../../svgs/value-prop-1.svg'
import ValuePropSvg2 from '../../../svgs/value-prop-2.svg'
import ValuePropSvg3 from '../../../svgs/value-prop-3.svg'
import parse from 'html-react-parser'

const ValueProps = ({ content }) => {
    return (
       <section className="value-props">

            <div className="value-props__container container">
                {content.fields?.header ? (
                    <div className="value-props__header">
                        { parse(content.fields.header) }
                    </div>
                ) : ("")}
                <div className="value-props__wrapper">
                    {(content.fields?.valuePropText1 && content.fields?.valuePropImage1) ? (
                        <div className="value-props__item">
                            <div className="value-props__image">
                                <Image
                                    className="featured"
                                    src={`https:${content.fields.valuePropImage1.fields.file.url}`}
                                    alt={content.fields.valuePropText1}
                                    layout="responsive"
                                    objectFit="cover"
                                    height="108"
                                    width="108"
                                />
                            </div>
                            <p className="value-props__copy">
                                { content.fields.valuePropText1 }
                            </p>
                        </div>
                    ) : ("")}
                    {(content.fields?.valuePropText2 && content.fields?.valuePropImage2) ? (
                        <div className="value-props__item">
                            <div className="value-props__image">
                             <Image
                                    className="featured"
                                    src={`https:${content.fields.valuePropImage2.fields.file.url}`}
                                    alt={content.fields.valuePropText2}
                                    layout="responsive"
                                    objectFit="cover"
                                    height="108"
                                    width="108"
                                />
                            </div>
                            <p className="value-props__copy">
                                { content.fields.valuePropText2 }
                            </p>
                        </div>
                    ) : ("")}
                    {(content.fields?.valuePropText3 && content.fields?.valuePropImage3) ? (
                        <div className="value-props__item">
                            <div className="value-props__image">
                                <Image
                                    className="featured"
                                    src={`https:${content.fields.valuePropImage3.fields.file.url}`}
                                    alt={content.fields.valuePropText3}
                                    layout="responsive"
                                    objectFit="cover"
                                    height="108"
                                    width="108"
                                />
                            </div>
                            <p className="value-props__copy">
                                { content.fields.valuePropText3 }
                            </p>
                        </div>
                    ) : ("")}
                </div>
            </div>

       </section>
    )
}

export default ValueProps

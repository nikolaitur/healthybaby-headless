import React from 'react'
import Image from 'next/image';

import ValuePropSvg1 from '../../../svgs/value-prop-1.svg'
import ValuePropSvg2 from '../../../svgs/value-prop-2.svg'
import ValuePropSvg3 from '../../../svgs/value-prop-3.svg'
import ValuePropSvg4 from '../../../svgs/value-prop-4.svg'
import ValuePropSvgMobile1 from '../../../svgs/value-prop-1-mobile.svg'
import ValuePropSvgMobile2 from '../../../svgs/value-prop-2-mobile.svg'
import ValuePropSvgMobile3 from '../../../svgs/value-prop-3-mobile.svg'
import ValuePropSvgMobile4 from '../../../svgs/value-prop-4-mobile.svg'

const ProductValueProps = ({ content }) => {

    return (
       <div className="value-props">
            <div className="value-props__wrapper container">
                {(content.fields?.valuePropText1 && content.fields?.valuePropImage1?.fields?.file?.url) ? (
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
                {(content.fields?.valuePropText2 && content.fields?.valuePropImage2?.fields?.file?.url) ? (
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
                {(content.fields?.valuePropText3 && content.fields?.valuePropImage3?.fields?.file?.url) ? (
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
                {(content.fields?.valuePropText4 && content.fields?.valuePropImage4?.fields?.file?.url) ? (
                    <div className="value-props__item">
                        <div className="value-props__image">
                            <Image
                                className="featured"
                                src={`https:${content.fields.valuePropImage4.fields.file.url}`}
                                alt={content.fields.valuePropText4}
                                layout="responsive"
                                objectFit="cover"
                                height="108"
                                width="108"
                            />
                        </div>
                        <p className="value-props__copy">
                            { content.fields.valuePropText4 }
                        </p>
                    </div>
                ) : ("")}
            </div>
       </div>
    )
}

export default ProductValueProps

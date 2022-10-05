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
                {(content.fields?.valuePropText1) ? (
                    <div className="value-props__item">
                        <div className="value-props__image desktop">
                            <ValuePropSvg1 />
                        </div>
                        <div className="value-props__image mobile">
                            <ValuePropSvgMobile1 />
                        </div>
                        <p className="value-props__copy">
                            { content.fields.valuePropText1 }
                        </p>
                    </div>
                ) : ("")}
                {(content.fields?.valuePropText2) ? (
                    <div className="value-props__item">
                         <div className="value-props__image desktop">
                            <ValuePropSvg2 />
                        </div>
                        <div className="value-props__image mobile">
                            <ValuePropSvgMobile2 />
                        </div>
                        <p className="value-props__copy">
                            { content.fields.valuePropText2 }
                        </p>
                    </div>
                ) : ("")}
                {(content.fields?.valuePropText3) ? (
                    <div className="value-props__item">
                         <div className="value-props__image desktop">
                            <ValuePropSvg3 />
                        </div>
                        <div className="value-props__image mobile">
                            <ValuePropSvgMobile3 />
                        </div>
                        <p className="value-props__copy">
                            { content.fields.valuePropText3 }
                        </p>
                    </div>
                ) : ("")}
                {(content.fields?.valuePropText4) ? (
                    <div className="value-props__item">
                         <div className="value-props__image desktop">
                            <ValuePropSvg4 />
                        </div>
                        <div className="value-props__image mobile">
                            <ValuePropSvgMobile4 />
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

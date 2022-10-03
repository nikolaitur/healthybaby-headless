import React from 'react'
import Image from 'next/image';

import ValuePropSvg1 from '../../../svgs/value-prop-1.svg'
import ValuePropSvg2 from '../../../svgs/value-prop-2.svg'
import ValuePropSvg3 from '../../../svgs/value-prop-3.svg'

const ValueProps = ({ content }) => {

    return (
       <section className="value-props">

            <div className="value-props__container container">
                {content.fields?.header ? (
                    <div className="value-props__header">
                        { content.fields.header }
                    </div>
                ) : ("")}
                <div className="value-props__wrapper">
                    {(content.fields?.valuePropText1) ? (
                        <div className="value-props__item">
                            <div className="value-props__image">
                                <ValuePropSvg1 />
                            </div>
                            <p className="value-props__copy">
                                { content.fields.valuePropText1 }
                            </p>
                        </div>
                    ) : ("")}
                    {(content.fields?.valuePropText2) ? (
                        <div className="value-props__item">
                            <div className="value-props__image">
                                <ValuePropSvg2 />
                            </div>
                            <p className="value-props__copy">
                                { content.fields.valuePropText2 }
                            </p>
                        </div>
                    ) : ("")}
                    {(content.fields?.valuePropText3) ? (
                        <div className="value-props__item">
                            <div className="value-props__image">
                                <ValuePropSvg3 />
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

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const NutritionChart = ({ content }) => {
   const { header } = content.fields
   console.log(content)

    return (
        <section className="nutrition-chart">
            <div className="nutrition-chart__container container">
                <div classname="nutrition-chart__content">
                    {/* <h6 className="nutrition-chart__subheader">{ subheader }</h6> */}
                    <h2 className="nutrition-chart__header">{ header }</h2>
                </div>
            </div>   
        </section>
    )
}

export default NutritionChart

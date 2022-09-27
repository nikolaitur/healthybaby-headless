import React, { useState } from 'react';
import Link from 'next/link';

import CaretRight from '../../../svgs/caret-right.svg'

const NutritionChartDropdown = ({ items, swiperIntstance }) => {

  const [isActive, setIsActive] = useState(false);
  const [activeItem, setActiveItem] = useState(items[0])

  const toggleDropDropdown = () => {
    setIsActive(!isActive)
  }

  const updateDropDown = (item, index) => {
    setActiveItem(item)
    setIsActive(false)
    swiperIntstance.slideTo(index)
  }

  return (
    <>
        <div className="nutrition-chart-dropdown">
        <div className={`nutrition-chart-dropdown__selected ${isActive ? "is-open" : ""}`} onClick={() => toggleDropDropdown()}>
              <span>{ activeItem.fields.title }</span>
              <span><CaretRight/></span>
            </div>
            <div className={`nutrition-chart-dropdown__menu ${isActive ? "is-open" : ""}`}>
                {items.map((item, index) => {
                    return <div key={index} className="nutrition-chart-dropdown__item" onClick={() => updateDropDown(item, index)}>{item.fields.title}</div>
                })}
            </div>
        </div>
    </>

  );
};

export default NutritionChartDropdown;
import { useState, useEffect } from 'react'
import { nacelleClient } from 'services'
import { useCart } from '@nacelle/react-hooks'
import { useCartDrawerContext } from '../../../context/CartDrawerContext'
import IconClose from '../../../svgs/close-icon.svg'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"

const CartDrawer = ({props, children}) => {

    // let intialValues = {
    //     birthday: new Date(),
    //     weight: "1.1"
    // }

    // const [, { addToCart }] = useCart()
    // const [product, setProduct] = useState(null)
    // const [birthday, setBirthday] = useState(null);
    // const [diaperSize, setDiaperSize] = useState(1);
    // const [measurement, setMeasurement] = useState("lbs");
    // const [diaperFinderData, setDiaperFinderData] = useState(intialValues);
    
    const cartDrawerContext =  useCartDrawerContext()

    useEffect(() => {
        

    })



    const handleInputChange = (e) => {
    const { name, value } = e.target;

        // setDiaperFinderData(diaperFinderData => ({
        //     ...diaperFinderData,
        //     [name]: value,

        // }))
    };

    const closeSlide = () => {
        cartDrawerContext.setIsOpen(false)
    }

    const handleAddItem = () => {
        // const variant = getCartVariant({
        //   product,
        //   variant: selectedVariant,
        // })
        // addToCart({
        //   variant,
        //   quantity,
        // })
      }

    return (
        <div className={`cart-drawer ${cartDrawerContext.isOpen ? "active" : ""}`}>
            <div className="cart-drawer__overlay" onClick={() => closeSlide()}></div>
            <div className={`cart-drawer__container`}>
                <div className="cart-drawer__content">
                    <div className="cart-drawer__close" onClick={() => closeSlide()}>
                        <IconClose />
                    </div>
                </div>   
            </div>
        </div>
    )
}

export default CartDrawer
import { useCustomerContext } from '@/context/CustomerContext'
import moment from 'moment'
import Image from 'next/image'
import MobileArrowSvg from '@/svgs/arrow-left-mobile.svg'
import LongArrowSvg from '@/svgs/long-arrow-right.svg'
import Link from 'next/link'

const Order = ({orderId}) => {
  const { customer } = useCustomerContext()
  const order = customer.orders.find(order => order.customerUrl.includes(orderId))

  const tracking = order.successfulFulfillments.find(fulfillment => fulfillment.trackingInfo.hasOwnProperty('number') && fulfillment.trackingInfo.hasOwnProperty('url'))

  return (
    <div className="account-order">
      <Link href="/account/order-history">
        <a className="account-order__back-link">
          <span className="account-order__back-link-icon-desktop">
            <LongArrowSvg />
          </span>
          <span className="account-order__back-link-icon-mobile">
            <MobileArrowSvg />
          </span>
          <h6>Back To Order History</h6>
        </a>
      </Link>
      <div className="account-order__header">
        <h3>Order {order.name}</h3>
        <h4>{moment(order.processedAt).format('MMMM DD, YYYY')}</h4>
        <ul>
          {order.financialStatus && <li><h4>Payment Status: <b className="bold-text">{order.financialStatus.toLowerCase()}</b></h4></li>}
          {order.fulfillmentStatus && <li><h4>Shipment Status: <b className="bold-text">{order.fulfillmentStatus.toLowerCase()}</b></h4></li>}
          {tracking?.url && tracking?.number ? (
            <li>
              <h4>{`Tracking: `}
                <b className="bold-text">
                  <a className="account-order__tracking-number-link" href={tracking.url} target="_blank" rel="noopener noreferrer">
                    {tracking.number}
                  </a>
                </b>
              </h4>
            </li>
          ):(
            <li><h4>Tracking: <b className="bold-text">Not available</b></h4></li>
          )}
          {order.totalPriceV2?.amount && <li><h4>Total: <b className="bold-text">${parseFloat(order.totalPriceV2.amount).toFixed(2)}</b></h4></li>}
        </ul>
      </div>


      <div className="account-order__details account-order__details-mobile">
        <ul className="account-order__line-items">
          {order.lineItems.map((item, index) => {
            const image = item.variant.image
            return <li className="account-order__line-item" key={`${item.id}-${index}`}>
              <div className="account-order__line-item-image">
                <Image
                  src={image.originalSrc}
                  alt={image.altText || item.variant.title}
                  width={266}
                  height={322}
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <div className="account-order__line-item-details">
                <div className="account-order__line-item-metadata">
                  <h3 className="account-order__line-item-title">{item.variant.product.title}</h3>
                  {item.variant.title !== 'Default Title' && <p className="large">{item.variant.title}</p>}
                </div>
                <h3>Qty: {item.quantity}</h3>
                {item.variant.priceV2?.amount && <h3>Price: ${parseFloat(item.variant.priceV2.amount).toFixed(2)}</h3>}
              </div>
            </li>
          })}
        </ul>
      </div>


      <div className="account-order__details account-order__details-desktop">
        <h5>Order Details</h5>
        <div className="account-order__details-header">
          <div data-column-1><h4>Item</h4></div>
          <div data-column-2><h4>Price</h4></div>
          <div data-column-3><h4>Qty</h4></div>
          <div data-column-4><h4>Total</h4></div>
        </div>
        <ul className="account-order__line-items">
          {order.lineItems.map((item, index) => {
            const image = item.variant.image
            return <li className="account-order__line-item" key={`${item.id}-${index}`}>
              <div data-column-1>
                <div className="account-order__line-item-image">
                  <Image
                    src={image.originalSrc}
                    alt={image.altText || item.variant.title}
                    width={266}
                    height={322}
                    objectFit="cover"
                  />
                </div>
                <div className="account-order__line-item-metadata">
                  <h3 className="account-order__line-item-title">{item.variant.product.title}</h3>
                  <p className="large">{item.variant.title}</p>
                </div>
              </div>
              <div data-column-2>
                {item.variant.priceV2?.amount && <h3>${parseFloat(item.variant.priceV2.amount).toFixed(2)}</h3>}
              </div>
              <div data-column-3>
                <h3>{item.quantity}</h3>
              </div>
              <div data-column-4>
                {item.originalTotalPrice.amount && <h3>${parseFloat(item.originalTotalPrice.amount).toFixed(2)}</h3>}
              </div>
            </li>
          })}
        </ul>
      </div>
      <div className="account-order__summary">
        <div className="account-order__summary-line-item">
          <div data-column-1></div>
          <div data-column-2><h3>Subtotal:</h3></div>
          <div data-column-3></div>
          <div data-column-4><h3>${parseFloat(order.subtotalPriceV2.amount).toFixed(2)}</h3></div>
        </div>
        <div className="account-order__summary-line-item">
          <div data-column-1></div>
          <div data-column-2><h3>Taxes:</h3></div>
          <div data-column-3></div>
          <div data-column-4><h3>${parseFloat(order.totalTaxV2.amount).toFixed(2)}</h3></div>
        </div>
        <div className="account-order__summary-line-item">
          <div data-column-1></div>
          <div data-column-2><h3>Shipping:</h3></div>
          <div data-column-3></div>
          <div data-column-4><h3>${parseFloat(order.totalShippingPriceV2.amount).toFixed(2)}</h3></div>
        </div>
        <div className="account-order__summary-line-item  account-order__summary-line-item--total-order">
          <div data-column-1></div>
          <div data-column-2><h3>Total:</h3></div>
          <div data-column-3></div>
          <div data-column-4><h3>${parseFloat(order.totalPriceV2.amount).toFixed(2)}</h3></div>
        </div>
      </div>
    </div>
  )
}

export default Order
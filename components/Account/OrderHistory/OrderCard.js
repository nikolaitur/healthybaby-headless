import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import Expand from 'react-expand-animated'
import moment from 'moment'
import Link from 'next/link'
import IconCaretTop from '@/svgs/caret-top.svg'

const OrderCard = ({order}) => {

  const isDesktop = useMediaQuery(
    { minWidth: 768 }
  )
  const [mounted, setMounted] = useState(false)
  const [height, setHeight] = useState(0)

  const toggleExpand = () => {
    (height === 0) ? setHeight('auto') : setHeight(0)
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  const buildDetails = () => {
    return (
      <>
        <p>
          {mounted && !isDesktop && 'Date: '}
          {moment(order.processedAt).format('MMMM DD, YYYY')}
        </p>
        {order.fulfillmentStatus && <p className="capitalize">
          {mounted && !isDesktop && 'Order Status: '}
          {order.fulfillmentStatus.toLowerCase()}
        </p>}
        <div className="account-card-actions">
          {order.totalPriceV2?.amount && <span>
            {mounted && !isDesktop && 'Total: '}
            ${parseFloat(order.totalPriceV2.amount).toFixed(2)}
          </span>}
          <Link href={orderIdUrl}>
            <a>Details</a>
          </Link>
        </div>
      </>
    )
  }

  const orderIdUrl = '/account/orders/' + order.customerUrl.substring(order.customerUrl.indexOf('orders/') + 7)
  return (
    <li className="account-card account-order-card">
      <h3 className="account-order-name">
        <button className={height !== 0 ? 'is-active' : ''} onClick={() => toggleExpand()}>
          Order {order.name}
          <IconCaretTop />
        </button>
      </h3>
      {(mounted && !isDesktop) ? (
        <Expand open={height !== 0} duration={300}>
          {buildDetails()}
        </Expand>
      ):(
        <>
          {buildDetails()}
        </>
      )}
    </li>
  );
};

export default OrderCard;
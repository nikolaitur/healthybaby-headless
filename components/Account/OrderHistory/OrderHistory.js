import { useCustomerContext } from '@/context/CustomerContext'
import moment from 'moment'
import Link from 'next/link'

const OrderHistory = () => {
  const { customer } = useCustomerContext()

  if (customer?.orders.length > 0) {
    return (
      <div className="account-panel">
        <h3>Order History</h3>
        <ul className="account-card-list">
          {customer.orders.map(order => {
            const orderIdUrl = '/account/orders/' + order.customerUrl.substring(order.customerUrl.indexOf('orders/') + 7)
            return <li className="account-card account-order-card" key={order.id}>
                <h3 className="account-order-name">Order {order.name}</h3>
                <p>{moment(order.processedAt).format('MMMM DD, YYYY')}</p>
                {order.fulfillmentStatus && <p><b>{order.fulfillmentStatus.toLowerCase()}</b></p>}
                <div className="account-card-actions">
                  {order.totalPriceV2?.amount && <span>${parseFloat(order.totalPriceV2.amount).toFixed(2)}</span>}
                  <Link href={orderIdUrl}>
                    <a>Details</a>
                  </Link>
                </div>
              </li>
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="account-panel">
      <h3>Order History</h3>
      <h4>You don't have any orders yet.</h4>
    </div>
  )

}

export default OrderHistory
import { useCustomerContext } from '@/context/CustomerContext'
import OrderCard from './OrderCard'

const OrderHistory = () => {
  const { customer } = useCustomerContext()
  if (customer?.orders.length > 0) {
    return (
      <div className="account-panel">
        <h3>Order History</h3>
        <ul className="account-card-list">
          {customer.orders.map(order => {
            return <OrderCard key={order.id} order={order} />
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="account-panel">
      <h3>Order History</h3>
      <h4>{`You don't have any orders yet.`}</h4>
    </div>
  )

}

export default OrderHistory
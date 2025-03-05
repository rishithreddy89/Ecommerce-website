// Write your code here
// CartSummary/index.js
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalAmount = cartList.reduce(
        (total, eachItem) => total + eachItem.price * eachItem.quantity,
        0,
      )

      const totalItems = cartList.length

      return (
        <div className="cart-summary-container">
          <div className="summary-text">
            <p className="order-total">
              Order Total: <span className="total-amount">Rs {totalAmount}/-</span>
            </p>
            <p className="total-items">{totalItems} Items in cart</p>
          </div>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary

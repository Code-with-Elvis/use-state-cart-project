import { LiaTimesCircle } from 'react-icons/lia'
import { useContext } from 'react'
import { UserCart } from '../App'

const Cart = () => {
  const { cartOpen, toggleCart, bag, setBag } = useContext(UserCart)

  function removeSection(e) {
    if (e.target.classList.contains('cart-page')) {
      toggleCart()
    }
  }

  function removeFromCart(id) {
    const filteredBag = bag.filter((item) => item.id !== id)

    setBag(filteredBag)
  }

  const totalBagQuantity = bag.reduce((total, item) => total + item.qnt, 0)
  const totalPrice = bag.reduce(
    (total, item) => total + item.qnt * item.price, // Calculate total price based on quantity and item price
    0 // Initial total price is 0
  )

  return (
    <section
      className={cartOpen ? 'cart-page active' : 'cart-page'}
      onClick={removeSection}
    >
      <span className="remove-box" onClick={toggleCart}>
        <LiaTimesCircle />
      </span>
      <article className="cart-content">
        <h2>My Cart</h2>
        <span className="cancel-btn" onClick={toggleCart}>
          <LiaTimesCircle />
        </span>
        {bag.length < 1 ? (
          <h4 className="cart-notify">Your Cart is Empty!!</h4>
        ) : (
          <div className="items">
            {bag.map(({ id, tag, name, inStock, qnt }) => (
              <div className="item" key={id}>
                <img src={tag} alt={name} />
                <div className="details">
                  <p>{name}</p>
                  <div className="remain">Remaining: {inStock - qnt}</div>
                  <div className="updates">
                    <button onClick={() => removeFromCart(id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="subtotal">
          <h3>
            Subtotal ({totalBagQuantity}) Items: <span>KES {totalPrice}</span>{' '}
          </h3>
        </div>
      </article>
    </section>
  )
}
export default Cart

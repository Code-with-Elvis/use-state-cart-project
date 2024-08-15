import { BsCart2 } from 'react-icons/bs'
import { MdOutlineAdd } from 'react-icons/md'
import { FiMinus } from 'react-icons/fi'
import data from '../data'
import { useContext } from 'react'
import { UserCart } from '../App'

const Main = () => {
  let { toggleCart, setBag, bag } = useContext(UserCart)

  function AddToBag(id) {
    const item = data.find((item) => item.id === id)
    const match = bag.find((item) => item.id === id)

    if (match) {
      if (match.qnt === match.inStock) return
      // Increment quantity if item is already in bag
      const updatedBag = bag.map((item) =>
        item.id === id ? { ...item, qnt: item.qnt + 1 } : item
      )
      setBag(updatedBag)
    } else {
      // Add new item to bag with quantity 1
      setBag([...bag, { ...item, qnt: 1 }])
    }
  }

  const removeFromBag = (id) => {
    const updatedBag = bag.map((item) =>
      item.id === id ? { ...item, qnt: item.qnt - 1 } : item
    )

    // Filter out items with quantity <= 0
    const filteredBag = updatedBag.filter((item) => item.qnt > 0)

    setBag(filteredBag)
  }

  const totalBagQuantity = bag.reduce((total, item) => total + item.qnt, 0)

  return (
    <section className="main-web">
      <div className="cart" onClick={toggleCart}>
        <BsCart2 className="icon" />
        <span className="cart-qtn">{totalBagQuantity}</span>
      </div>
      <main>
        <h2>Featured Products</h2>
        <article className="products">
          {data.map(({ id, tag, name, price }) => (
            <div className="product" key={id}>
              <img src={tag} alt={name} loading="lazy" />
              <div className="add-cart-buttons">
                {!bag.find((i) => i.id === id) ||
                bag.find((i) => i.id === id)?.qnt === 0 ? (
                  <button
                    className="btn-F"
                    type="button"
                    onClick={() => AddToBag(id)}
                  >
                    <MdOutlineAdd className="icon" />
                    Add
                  </button>
                ) : (
                  <button className="btn-S" type="button">
                    <div
                      className="minus-btn icon"
                      onClick={() => removeFromBag(id)}
                    >
                      <FiMinus />
                    </div>
                    <span className="amount">
                      {bag.find((item) => item.id === id)?.qnt || 0}
                    </span>
                    <div className="add-btn icon" onClick={() => AddToBag(id)}>
                      <MdOutlineAdd />
                    </div>
                  </button>
                )}
              </div>
              <div className="price">
                <span>KES</span>
                {price}
              </div>
              <p className="p-name">{name}</p>
            </div>
          ))}
        </article>
      </main>
    </section>
  )
}
export default Main

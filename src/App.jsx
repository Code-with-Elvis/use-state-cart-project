import { createContext, useState } from 'react'
import './App.css'
import Main from './Components/Main'
import Cart from './Components/Cart'
import useLocalStorage from 'use-local-storage'

export const UserCart = createContext()

const App = () => {
  let [cartOpen, setCartOpen] = useState(false)
  let [bag, setBag] = useLocalStorage('bag', [])

  function toggleCart() {
    setCartOpen(!cartOpen)
  }

  return (
    <UserCart.Provider value={{ toggleCart, cartOpen, bag, setBag }}>
      <Main />
      <Cart />
    </UserCart.Provider>
  )
}
export default App

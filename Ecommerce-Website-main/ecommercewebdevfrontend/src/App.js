import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    this.setState(prevState => {
      const productInCart = prevState.cartList.find(
        cartItem => cartItem.id === product.id,
      )

      if (productInCart) {
        // Increase quantity if product already exists in cart
        const updatedCartList = prevState.cartList.map(cartItem => {
          if (cartItem.id === product.id) {
            return {...cartItem, quantity: cartItem.quantity + product.quantity}
          }
          return cartItem
        })
        return {cartList: updatedCartList}
      }
      // Add new product to cart if it doesn't exist
      return {cartList: [...prevState.cartList, product]}
    })
  }
  
  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(cartItem => {
        if (cartItem.id === id) {
          return {...cartItem, quantity: cartItem.quantity + 1}
        }
        return cartItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(cartItem => {
        if (cartItem.id === id && cartItem.quantity > 1) {
          return {...cartItem, quantity: cartItem.quantity - 1}
        }
        return cartItem
      }),
    }))
  }

  removeCartItem = id => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList.filter(
        cartItem => cartItem.id !== id,
      )
      return {cartList: updatedCartList}
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

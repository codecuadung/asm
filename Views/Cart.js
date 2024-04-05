import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux';
import CartView from '../cartReduct/cartView';
import store from '../cartReduct/store';
const Cart = () => {
  return (
    <Provider store={store}>
      <CartView />
    </Provider>
  )
}

export default Cart

const styles = StyleSheet.create({})
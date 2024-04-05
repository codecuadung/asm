import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../cartReduct/store';
import ListFavorite from '../cartReduct/ListFavorite';
const Favorite = () => {
  return (
    <Provider store={store}>
            <ListFavorite />
     </Provider>
  )
}

export default Favorite

const styles = StyleSheet.create({})
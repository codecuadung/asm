import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeCart } from './action'
import { Provider } from 'react-redux';
import store from './store'
const RemoveView = ({product}) => {
    const dispatch = useDispatch()
    const handleRemove = () => {
        dispatch(removeCart(product.idSP));
    }
  return (
    <Provider store={store}>
    <View>
    <TouchableOpacity onPress={handleRemove} style={{backgroundColor: '#F26398', padding: 10, borderRadius: 5, alignItems: 'center'}}>
          <Text style={[styles.text,{color:'white'}]}>Xóa</Text>
        </TouchableOpacity>
    </View>
    </Provider>
  )
}

export default RemoveView

const styles = StyleSheet.create({
    text: {
        fontSize:16,
        fontWeight: 'bold',
      }
})
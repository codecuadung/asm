// AddView.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './action'; // Import action addToCart
import { StyleSheet, Text, TouchableOpacity,ToastAndroid } from 'react-native'; // Import StyleSheet from react-native
import { useNavigation } from '@react-navigation/native';
const AddView = ({ product }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Gửi hành động addToCart với sản phẩm được chọn
    ToastAndroid.show('Đã thêm sản phẩm vào giỏ hàng', ToastAndroid.SHORT);
    navigation.navigate('Cart');
    console.log('Added to cart:', product);
  };

  return (
    <TouchableOpacity onPress={handleAddToCart} style={styles.button}>
      <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F26398',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AddView;

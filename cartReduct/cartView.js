import React from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity } from './action';
import RemoveView from './RemoveView';

const CartView = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const renderItem = ({ item }) => {
    const handleIncrease = () => {
      dispatch(increaseQuantity(item.idSP));
    };

    const handleDecrease = () => {
      dispatch(decreaseQuantity(item.idSP));
    };
    const thanhTien = item.giaSP * item.count

    return (
      <View style={{borderColor:'black',borderWidth:1,borderRadius:10,padding:10,marginBottom:10,backgroundColor:'white'}}>
        <View style={{ flexDirection: 'row', alignItems: 'center' ,marginBottom:10}}>
          <Image style={styles.image} source={{ uri: item.hinhAnh }} />
          <Text style={[{ marginLeft: 10 ,width:190,color:'#F26398'}, styles.text]}>{item.tenSP}</Text>
          <Text style={[{ marginLeft: 10 }, styles.text]}>Giá: {item.giaSP}đ</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between',marginBottom:10 }}>
          <View style = {{flexDirection: 'row', alignItems: 'center', }}>
          <Text style={{ fontWeight: 'bold', color: '#F26398', fontSize: 20, }}>Số lượng:</Text>
          <TouchableOpacity onPress={handleDecrease} style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ width: 20, height: 20 }} source={require('../images/tru.png')} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 10,width:24, textAlign: 'center' }}>{item.count}</Text>
          <TouchableOpacity onPress={handleIncrease} style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ width: 20, height: 20 }} source={require('../images/cong.png')} />
          </TouchableOpacity>
          </View>
          <RemoveView product={item}/>
        </View >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.text}>Thành tiền: {thanhTien}đ</Text>
        <TouchableOpacity style={{backgroundColor: '#F26398', padding: 10, borderRadius: 5, alignItems: 'center'}}>
          <Text style={[styles.text,{color:'white'}]}>Thanh Toán</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title,{color:'#F26398',textAlign:'center'}]}>Danh sách sản phẩm trong giỏ hàng</Text>
      <FlatList
        keyExtractor={(item) => item.idSP}
        data={cartItems}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CartView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  text: {
    fontSize:16,
    fontWeight: 'bold',
  }
});

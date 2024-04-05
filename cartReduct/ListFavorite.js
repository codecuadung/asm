import { StyleSheet, Text, View,TouchableOpacity,FlatList,Image } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import AddView from './AddView';

const ListFavorite = () => {
  const [count, setCount] = useState(1);
  const favoriteItems = useSelector(state => state.favorite.favoriteItems);
  console.log(favoriteItems);
  const tang = () => {
    setCount(prevCount => prevCount + 1);
};

const giam = () => {
    if (count > 1) {
        setCount(prevCount => prevCount - 1);
    }
};

  const renderItem = ({ item }) => (

    <View style={{ flex: 1, margin: 10 ,borderColor: 'pink',borderWidth: 1,padding: 10,borderRadius: 10}}>
       
        <View>
            <Image source={{ uri: item.hinhAnh }} style={{ width: '100%', height: 350, marginBottom: 10, resizeMode: 'contain' }} />
        </View>
        <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 20, width: '60%', fontWeight: 'bold', color: '#F26398' }}>{item.tenSP}</Text>
            <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: 'bold', color: '#F26398' }}>Giá: {item.giaSP}đ</Text>
        </View>
        <View>
            <Text style={{ fontWeight: 'bold', color: '#F26398', fontSize: 20 }}>Mô tả:</Text>
            <Text style={{ fontSize: 16, color: '#FF714B' }}>{item.ghiChu}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: '#F26398', fontSize: 20, marginRight: 10 }}>Số lượng:</Text>
            <TouchableOpacity onPress={giam} style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 20, height: 20 }} source={require('../images/tru.png')} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 10 }}>{count}</Text>
            <TouchableOpacity onPress={tang} style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 20, height: 20 }} source={require('../images/cong.png')} />
            </TouchableOpacity>
        </View>
        <View>
            <AddView product={{...item, count: count}} /> 
        </View>
    </View>

  )
  return (
    <View style={styles.container}>
      <Text style={[styles.title,{textAlign: 'center'}]}>Danh sách yêu thích</Text>
      <FlatList
        data={favoriteItems}
        renderItem={renderItem}
        keyExtractor={item => item.idSP}
      />
    </View>
  );
}


export default ListFavorite

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

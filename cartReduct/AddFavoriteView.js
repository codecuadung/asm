import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addToFavorite} from './action';
const AddFavoriteView = ({product}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleAddToFavorite = () => {
    dispatch(addToFavorite(product));
    navigation.navigate('Favorite');
    console.log('Added to favorite:', product);
  }
  return (
    <View>
      <TouchableOpacity style={{backgroundColor:'red',padding:10,borderRadius:5,alignItems:'center',}} onPress={handleAddToFavorite}><Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Thêm vào yêu thích</Text></TouchableOpacity>
    </View>
  )
}

export default AddFavoriteView

const styles = StyleSheet.create({})
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Provider } from 'react-redux';
import AddView from '../cartReduct/AddView';
import store from '../cartReduct/store';
import AddFavoriteView from '../cartReduct/AddFavoriteView';
const ChiTietSP = ({ route }) => {
    const navigation = useNavigation();
    const [count, setCount] = useState(1);
    const item = route.params.selectedItem;

    const tang = () => {
        setCount(prevCount => prevCount + 1);
    };

    const giam = () => {
        if (count > 1) {
            setCount(prevCount => prevCount - 1);
        }
    };

    return (
        <Provider store={store}>
            <ScrollView>
        <View style={{ flex: 1, margin: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../images/back.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Trở về</Text>
            </View>
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
                <AddFavoriteView product={{...item, count: count}} />
                <AddView product={{...item, count: count}} /> 
            </View>
        </View>
        </ScrollView>
        </Provider>
    );
}

export default ChiTietSP;

const styles = StyleSheet.create({});

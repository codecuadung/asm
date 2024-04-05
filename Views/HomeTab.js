import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Favorite from './Favorite';
import Home from './Home';
import Cart from './Cart';
import {NavigationContainer} from '@react-navigation/native';
const HomeTab = () => {
  const tab = createBottomTabNavigator();
  return (
    <tab.Navigator
      screenOptions={{tabBarStyle: styles.tabBarStyle}}
      initialRouteName="Home">
      <tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                focused
                  ? require('../images/home.png')
                  : require('../images/home.png')
              }
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        }}
      />
      <tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                focused
                  ? require('../images/heart.png')
                  : require('../images/heart.png')
              }
              style={{width: size, height: size, tintColor: color}}
            />
          ),
          headerShown: false,
        }}
      />
      <tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                focused
                  ? require('../images/cart.png')
                  : require('../images/cart.png')
              }
              style={{width: size, height: size, tintColor: color}}
            />
          ),
        }}
      />
    </tab.Navigator>
  );
};

export default HomeTab;
const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    width: '50%',
    height: 70,
    marginLeft: '25%',
    borderRadius: 35, // Đặt độ cong cho các góc của bottom tab
    marginHorizontal: 20, // Đặt margin theo chiều ngang
    marginBottom: 30, // Đặt margin theo chiều dọc
    backgroundColor: 'white', // Màu nền của bottom tab
    // Bất kỳ thuộc tính CSS nào khác bạn muốn áp dụng cũng có thể thêm vào đây
  },
});

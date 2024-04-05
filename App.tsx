import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Views/Login'
import Register from './Views/Register'
import Hello from './Views/Hello'
import HomeTab from './Views/HomeTab'
import ChiTietSP from './Views/ChiTietSP'
const App = () => {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Hello'>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
        <Stack.Screen name='Hello' component={Hello} options={{headerShown: false}}/>
        <Stack.Screen name='HomeTab' component={HomeTab} options={{headerShown: false}}/>
        <Stack.Screen name='ChiTietSP' component={ChiTietSP} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
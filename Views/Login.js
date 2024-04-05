import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ route }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  
  useEffect(() => {
    if (route.params?.email && route.params?.password) {
      setEmail(route.params.email);
      setPassword(route.params.password);
    }
  }, [route.params]);
  useEffect(() => {
    const fetchRememberMe = async () => {
      try {
        const value = await AsyncStorage.getItem('rememberMe');
        if (value !== null) {
          setRememberMe(value === 'true');
          // Nếu giá trị rememberMe là true, thì lấy email và password từ AsyncStorage và đặt chúng vào state
          if (value === 'true') {
            const storedEmail = await AsyncStorage.getItem('email');
            const storedPassword = await AsyncStorage.getItem('password');
            if (storedEmail !== null && storedPassword !== null) {
              setEmail(storedEmail);
              setPassword(storedPassword);
            }
          }
        }
      } catch (error) {
        console.error('Lỗi khi đọc trạng thái nhớ tài khoản:', error);
      }
    };
  
    fetchRememberMe();
  }, []);
  
 
useEffect(() => {
  const storeRememberMe = async () => {
    try {
      await AsyncStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');
      // Nếu rememberMe là true, lưu email và password vào AsyncStorage
      if (rememberMe) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
      } else {
        // Nếu rememberMe là false, xóa email và password từ AsyncStorage
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
      }
    } catch (error) {
      console.error('Lỗi khi lưu trạng thái nhớ tài khoản:', error);
    }
  };

  storeRememberMe();
}, [rememberMe, email, password]);

  const handleLogin = async () => {
    try {
      // Kiểm tra xem email và mật khẩu có được nhập không
      if (!email || !password) {
        Alert.alert('Vui lòng nhập email và mật khẩu');
        return;
      }

      // Gửi yêu cầu đăng nhập đến máy chủ
      const response = await fetch('http://10.0.2.2:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      // Kiểm tra mã phản hồi từ máy chủ
      if (response.ok) {
        // Đăng nhập thành công, chuyển hướng đến trang chính
        navigation.navigate('HomeTab');
      } else {
        // Đăng nhập không thành công, hiển thị thông báo lỗi
        Alert.alert('Đăng nhập không thành công', 'Email hoặc mật khẩu không đúng');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Đã xảy ra lỗi', 'Vui lòng thử lại sau');
    }
  };

  const handleRememberMe = async (value) => {
    setRememberMe(value);
    try {
      await AsyncStorage.setItem('rememberMe', value ? 'true' : 'false');
    } catch (error) {
      console.error('Lỗi khi lưu trạng thái nhớ tài khoản:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor:'#fff',justifyContent:'center' }}>
        <View style={{justifyContent:'center',alignItems:'center',}}>
          <Image
            source={{ uri: 'https://hoalenhandmade.com/wp-content/uploads/2023/06/cropped-logo-hoa-len-co-nem-trang.png.webp' }}
            style={{ width: 200, height: 200 }}
          />
          <Text style={{ fontSize: 30, fontWeight: 'bold',color:'#FF714B' ,marginBottom: 20}}>Đăng nhập</Text>
        </View>
        <View style={{width:'100%',justifyContent:'center',alignItems:'center',}}>
          <TextInput
            onChangeText={setEmail}
            placeholder='Nhập email'
            style={styles.input}
            value={email} // Truyền giá trị email từ state vào TextInput
          />
          <TextInput
            onChangeText={setPassword}
            placeholder='Nhập mật khẩu'
            style={styles.input}
            secureTextEntry={true}
            value={password} // Truyền giá trị password từ state vào TextInput
          />
        </View>
        <View style={{flexDirection:'row',marginBottom:10,marginLeft:20}}>
          <CheckBox
            value={rememberMe}
            onValueChange={handleRememberMe}
          />
          <Text style={{marginTop:5}}>Nhớ tài khoản</Text>
          <Text style={{marginTop:5,marginLeft:140}} onPress={() => navigation.navigate('ForgotPassword')}>Quên mật khẩu?</Text>
        </View>
        <View >
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={styles.line} />
            <Text style={styles.text}>or</Text>
            <View style={styles.line} />
          </View>
          {/* Các nút đăng nhập bằng tài khoản xã hội */}
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:40}}>
          <Text>Bạn chưa có tài khoản?</Text>
          <Text style={{color:'#FF714B',marginLeft:5}} onPress={() => navigation.navigate('Register')}>Đăng ký</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10
  },
  button: {
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    height: 50,
    backgroundColor: '#FF714B',
    width: 350
  },
  line: {
    flex: 1,
    height: 1,
    marginTop: 15,
    backgroundColor: 'gray',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;

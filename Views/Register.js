import React, { useState , useEffect} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const validate = () => {
    if(password != confirmPassword){
      alert('Mật khẩu phải trùng khớp!');
      return false; // Trả về false nếu có lỗi
    }
    if(email == "" || password == "" || confirmPassword == ""){
      alert('Vui lòng điền đầy đủ thông tin!');
      return false; // Trả về false nếu có lỗi
    }
    const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(email)){
      alert('Email không đúng định dạng!');
      return false; // Trả về false nếu có lỗi
    }
    if(password.length < 6){
      alert('Mật khẩu phải có ít nhất 6 ký tự!');
      return false; // Trả về false nếu có lỗi
    }
    return true; // Trả về true nếu không có lỗi
  }
  
  const handleRegister = async () => {
    try {
      const isvalidate = validate();
      if(!isvalidate) return;
      //gửi dữ liệu đăng ký với API
      const response = await fetch('http://10.0.2.2:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email,password
         })
      })
      //xử lý phản hồi từ máy chủ
      const data = await response.json();
      console.log(data);
      navigation.navigate('Login',{email:email,password:password});
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor:'#fff',justifyContent:'center' }}>
        <View style={{justifyContent:'center',alignItems:'center',}}>
        <Image
          source={{ uri: 'https://hoalenhandmade.com/wp-content/uploads/2023/06/cropped-logo-hoa-len-co-nem-trang.png.webp' }}
          style={{ width: 200, height: 200 }}
        />
        <Text style={{ fontSize: 30, fontWeight: 'bold',color:'#FF714B' ,marginBottom: 20}}>Đăng ký</Text>
        </View>
        <View style={{width:'100%',justifyContent:'center',alignItems:'center',}}>
        <TextInput
          onChangeText={setEmail}
          placeholder='Nhập email'
          style={styles.input}
        />
        <TextInput
        onChangeText={setPassword}
          placeholder='Nhập mật khẩu'
          style={styles.input}
          secureTextEntry={true}
        />
         <TextInput
        onChangeText={setConfirmPassword}
          placeholder='Nhập lại mật khẩu'
          style={styles.input}
          secureTextEntry={true}
        />
        </View>
        <View >
            <View style={{justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>Đăng ký</Text>
        </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
      <View style={styles.line} />
      <Text style={styles.text}>or</Text>
      <View style={styles.line} />
    </View>

    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around'}}>
      <View style={{borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 10}}>
        <Image style={{width: 40, height: 40}} source={require('../images/facebook.png')}/>
      </View>
      <View style={{borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 10}}>
        <Image style={{width: 40, height: 40}} source={require('../images/google.png')}/>
      </View>
      <View style={{borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 10}}>
        <Image style={{width: 40, height: 40}} source={require('../images/apple.png')}/>
      </View>
    </View>
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:40}}>
      <Text>Bạn đã có tài khoản?</Text>
      <Text style={{color:'#FF714B',marginLeft:5}} onPress={() => navigation.navigate('Login')}>Đăng nhập</Text>
    </View>
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
    marginTop:15,
    backgroundColor: 'gray',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Register;

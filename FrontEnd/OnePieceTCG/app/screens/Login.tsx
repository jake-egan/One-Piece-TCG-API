import { View, Text, StyleSheet,Image,Button,TextInput } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password,setPassword] = useState('');
  const {onLogin, onRegister} = useAuth();

  const login = async () => {
    const result = await onLogin!(username,password)
    if(result && result.error) {
      alert(result.msg)
    }
  };

  const register = async () => {
    const result = await onRegister!(username,password);
    if(result && result.error) {
      alert(result.msg)
    } else {
      login();
    }
  }
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Images/ONEPIECELOGO.png')}/>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder='Username' onChangeText={(text: string) => setUsername(text)}/>
        <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={(text: string) => setPassword(text)}/>
        <Button onPress={login} title="Sign in"/>
        <Button onPress={register} title="Create Account"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form:{
    gap:10,
    width: '60%'
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff'
  },
  container: {
    alignItems: 'center',
    width: "100%",
  }
})


export default Login;
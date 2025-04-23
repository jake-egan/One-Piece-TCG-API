import { View, Text, StyleSheet,Image,Button,TextInput , Dimensions} from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import {useTranslation} from 'react-i18next';
const screenWidth = Dimensions.get('window').width;
const Login = () => {
  const [username, setUsername] = useState('');
  const [password,setPassword] = useState('');
  const {onLogin, onRegister} = useAuth();
  const { t } = useTranslation();

  const login = async () => {
    const result = await onLogin!(username,password)
    if(result && result.error) {
      alert(t('login.failedLogin'))
    }
  };

  const register = async () => {
    const result = await onRegister!(username,password);
    if(result && result.error) {
      alert(t('login.failedCreate'))
    } else {
      login();
    }
  }
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/Packs/OnePieceLogo.png')}
      style={{ width: "100%", height: screenWidth * 0.6 }}/>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder={t('login.username')} onChangeText={(text: string) => setUsername(text)}/>
        <TextInput style={styles.input} placeholder={t('login.password')} secureTextEntry={true} onChangeText={(text: string) => setPassword(text)}/>
        <Button onPress={login} title={t('login.signin')}/>
        <Button onPress={register} title={t('login.createAccount')}/>
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
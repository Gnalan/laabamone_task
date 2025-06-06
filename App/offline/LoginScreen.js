import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {
    const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username === 'admin' && password === '1234') {
      await AsyncStorage.setItem('tokenID', 'someRandomToken');
      navigation.replace('Home');
    } else {
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>Login</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <Button title="LoginScreen" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;

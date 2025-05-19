import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const HomeScreen = () => {
  const navigation = useNavigation();
  const [inventory, setInventory] = useState([]);
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    const loadInventory = async () => {
      const savedInventory = await AsyncStorage.getItem('inventory');
      if (savedInventory) {
        setInventory(JSON.parse(savedInventory));
      }
    };
    loadInventory();
  }, []);

  const addItem = async () => {
    if (!itemName) return;
    const newInventory = [...inventory, { id: Date.now(), name: itemName }];
    setInventory(newInventory);
    await AsyncStorage.setItem('inventory', JSON.stringify(newInventory));
    setItemName('');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('tokenID');
    navigation.replace('Login');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>Inventory Management</Text>
      <TextInput
        placeholder="Add Item"
        value={itemName}
        onChangeText={setItemName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Add Item" onPress={addItem} />

      <FlatList
        data={inventory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={{ fontSize: 18, padding: 5 }}>{item.name}</Text>}
      />

      <Button title="Logout" color="red" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTimerScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('');

    const saveTimer = async () => {
        if (!name || !duration || !category) {
            alert('All fields are required!');
            return;
        }

        const newTimer = { name, duration: parseInt(duration), remainingTime: parseInt(duration), status: 'Paused' };
        const savedTimers = await AsyncStorage.getItem('timers');
        const timers = savedTimers ? JSON.parse(savedTimers) : {};
        
        if (!timers[category]) {
            timers[category] = [];
        }
        
        timers[category].push(newTimer);
        await AsyncStorage.setItem('timers', JSON.stringify(timers));
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text>Timer Name:</Text>
            <TextInput style={styles.input} onChangeText={setName} value={name} />
            
            <Text>Duration (seconds):</Text>
            <TextInput style={styles.input} keyboardType="numeric" onChangeText={setDuration} value={duration} />

            <Text>Category:</Text>
            <TextInput style={styles.input} onChangeText={setCategory} value={category} />
            
            <TouchableOpacity onPress={saveTimer} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Timer</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
    saveButton: { backgroundColor: 'green', padding: 10, borderRadius: 5, marginTop: 10 },
    saveButtonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' }
});

export default AddTimerScreen;

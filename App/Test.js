import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ProgressBarAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Test = ({ navigation }) => {
    const [timers, setTimers] = useState({});
    const [expandedCategories, setExpandedCategories] = useState({});
    const [intervals, setIntervals] = useState({});

    useFocusEffect(
        useCallback(() => {
            loadTimers();
        }, [])
    );

    const loadTimers = async () => {
        const savedTimers = await AsyncStorage.getItem('timers');
        if (savedTimers) {
            setTimers(JSON.parse(savedTimers));
        }
    };

    const toggleCategory = (category) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    // ✅ Start Timer Function
    const handleStart = (category, index) => {
        if (intervals[`${category}-${index}`]) return; // Avoid multiple intervals

        const newTimers = { ...timers };
        newTimers[category][index].status = 'Running';

        // Decrease timer every second
        const timerId = setInterval(() => {
            setTimers((prevTimers) => {
                const updatedTimers = { ...prevTimers };
                if (updatedTimers[category][index].remainingTime > 0) {
                    updatedTimers[category][index].remainingTime -= 1;
                } else {
                    clearInterval(timerId);
                    updatedTimers[category][index].status = 'Completed';
                }
                saveTimers(updatedTimers);
                return updatedTimers;
            });
        }, 1000);

        setIntervals((prev) => ({
            ...prev,
            [`${category}-${index}`]: timerId,
        }));

        saveTimers(newTimers);
    };

    // ✅ Pause Timer Function
    const handlePause = (category, index) => {
        const timerKey = `${category}-${index}`;
        if (intervals[timerKey]) {
            clearInterval(intervals[timerKey]);
            setIntervals((prev) => {
                const newIntervals = { ...prev };
                delete newIntervals[timerKey];
                return newIntervals;
            });

            const newTimers = { ...timers };
            newTimers[category][index].status = 'Paused';
            saveTimers(newTimers);
        }
    };

    // ✅ Reset Timer Function
    const handleReset = (category, index) => {
        const timerKey = `${category}-${index}`;
        if (intervals[timerKey]) {
            clearInterval(intervals[timerKey]);
            setIntervals((prev) => {
                const newIntervals = { ...prev };
                delete newIntervals[timerKey];
                return newIntervals;
            });
        }

        const newTimers = { ...timers };
        newTimers[category][index].remainingTime = newTimers[category][index].duration;
        newTimers[category][index].status = 'Paused';
        saveTimers(newTimers);
    };

    const saveTimers = async (data) => {
        setTimers(data);
        await AsyncStorage.setItem('timers', JSON.stringify(data));
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTimerScreen')}>
                <Text style={styles.addButtonText}>+ Add Timer</Text>
            </TouchableOpacity>
            <FlatList
                data={Object.keys(timers)}
                keyExtractor={(item) => item}
                renderItem={({ item: category }) => (
                    <View>
                        <TouchableOpacity onPress={() => toggleCategory(category)} style={styles.categoryHeader}>
                            <Text style={styles.categoryText}>{category} ({timers[category].length})</Text>
                        </TouchableOpacity>
                        {expandedCategories[category] &&
                            timers[category].map((timer, index) => (
                                <View key={index} style={styles.timerItem}>
                                    <Text>{timer.name} - {timer.remainingTime}s</Text>
                                    <View style={styles.actions}>
                                        <TouchableOpacity onPress={() => handleStart(category, index)}><Text>▶️</Text></TouchableOpacity>
                                        <TouchableOpacity onPress={() => handlePause(category, index)}><Text>⏸</Text></TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleReset(category, index)}><Text>🔄</Text></TouchableOpacity>
                                    </View>
                                    <ProgressBarAndroid styleAttr="Horizontal" progress={timer.remainingTime / timer.duration} />
                                </View>
                            ))
                        }
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    addButton: { backgroundColor: '#6200ea', padding: 10, borderRadius: 5, marginBottom: 10 },
    addButtonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
    categoryHeader: { backgroundColor: 'red', padding: 10, marginTop: 5 },
    categoryText: { fontWeight: 'bold' },
    timerItem: { backgroundColor: 'red', padding: 10, marginVertical: 5 },
    actions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }
});

export default Test;

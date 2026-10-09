
// //***** Crud operation */
// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     FlatList,
//     ActivityIndicator,
//     StyleSheet,
//     Alert,
// } from 'react-native';
// import axios from 'axios';

// const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// export default function CrudScreen() {
//     const [data, setData] = useState([]);
//     const [title, setTitle] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [editId, setEditId] = useState(null);

//     useEffect(() => {
//         fetchPosts();
//     }, []);

//     // READ (GET)
//     const fetchPosts = async () => {
//         setLoading(true);
//         try {
//             const res = await axios.get(`${API_URL}?_limit=6`);
//             setData(res.data);
//         } catch (err) {
//             Alert.alert('Error', 'Failed to fetch items');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // CREATE (POST) & UPDATE (PUT)
//     const handleSubmit = async () => {
//         if (!title.trim()) return;

//         if (editId) {
//             // UPDATE
//             try {
//                 await axios.put(`${API_URL}/${editId}`, { title }).catch(() => { });
//                 setData((prev) =>
//                     prev.map((item) => (item.id === editId ? { ...item, title } : item))
//                 );
//                 setEditId(null);
//                 setTitle('');
//             } catch (err) {
//                 Alert.alert('Error', 'Failed to update');
//             }
//         } else {
//             // CREATE
//             try {
//                 const res = await axios.post(API_URL, { title, userId: 1 });
//                 setData((prev) => [{ ...res.data, id: Date.now() }, ...prev]);
//                 setTitle('');
//             } catch (err) {
//                 Alert.alert('Error', 'Failed to add');
//             }
//         }
//     };

//     // DELETE
//     const handleDelete = (id) => {
//         Alert.alert(
//             'Confirm Delete',
//             'Are you sure you want to delete this item?',
//             [
//                 { text: 'Cancel', style: 'cancel' },
//                 {
//                     text: 'Delete',
//                     style: 'destructive',
//                     onPress: async () => {
//                         try {
//                             await axios.delete(`${API_URL}/${id}`).catch(() => { });
//                             setData((prev) => prev.filter((item) => item.id !== id));
//                         } catch (err) {
//                             Alert.alert('Error', 'Failed to delete');
//                         }
//                     },
//                 },
//             ]
//         );
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.inputRow}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Enter item title..."
//                     value={title}
//                     onChangeText={setTitle}
//                 />
//                 <TouchableOpacity style={styles.addBtn} onPress={handleSubmit}>
//                     <Text style={styles.btnText}>{editId ? 'Save' : 'Add'}</Text>
//                 </TouchableOpacity>
//             </View>

//             {loading ? (
//                 <ActivityIndicator size="large" color="#007AFF" />
//             ) : (
//                 <FlatList
//                     data={data}
//                     keyExtractor={(item) => item.id.toString()}
//                     renderItem={({ item }) => (
//                         <View style={styles.card}>
//                             <Text style={styles.cardText}>{item.title}</Text>
//                             <View style={styles.actions}>
//                                 <TouchableOpacity
//                                     onPress={() => {
//                                         setEditId(item.id);
//                                         setTitle(item.title);
//                                     }}
//                                 >
//                                     <Text style={styles.editAction}>Edit</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={() => handleDelete(item.id)}>
//                                     <Text style={styles.deleteAction}>Delete</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     )}
//                 />
//             )}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9', marginTop: 40 },
//     inputRow: { flexDirection: 'row', marginBottom: 16 },
//     input: {
//         flex: 1,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         padding: 10,
//         borderRadius: 8,
//         backgroundColor: '#fff',
//     },
//     addBtn: {
//         backgroundColor: '#007AFF',
//         justifyContent: 'center',
//         paddingHorizontal: 16,
//         borderRadius: 8,
//         marginLeft: 8,
//     },
//     btnText: { color: '#fff', fontWeight: 'bold' },
//     card: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         padding: 14,
//         backgroundColor: '#fff',
//         borderRadius: 8,
//         marginBottom: 10,
//         elevation: 2,
//     },
//     cardText: { flex: 1, marginRight: 8, color: '#333' },
//     actions: { flexDirection: 'row', gap: 10 },
//     editAction: { color: '#007AFF', fontWeight: 'bold' },
//     deleteAction: { color: '#FF3B30', fontWeight: 'bold' },
// });







// // Login Page with JWT & Secure Keychain Storage
// // Email: eve.holt@reqres.in

// // Password: cityslicka

// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     ActivityIndicator,
//     StyleSheet,
//     Alert,
// } from 'react-native';
// import * as Keychain from 'react-native-keychain';
// import axios from 'axios';
// import Icon from 'react-native-vector-icons/Ionicons';

// export default function LoginScreen({ onLoginSuccess }) {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const handleLogin = async () => {
//         if (!email || !password) {
//             Alert.alert('Validation Error', 'Please enter email and password');
//             return;
//         }

//         setLoading(true);
//         console.log(`[LoginScreen] Attempting login for email: ${email}`);

//         try {
//             // Mock Login API endpoint
//             const response = await axios.post('https://reqres.in/api/login', {
//                 email,
//                 password,
//             });

//             console.log('[LoginScreen] API Login Success:', response.data);
//             const { token } = response.data;

//             // Securely store token in Keystore / Keychain
//             await Keychain.setGenericPassword('userToken', token);
//             console.log('[LoginScreen] Token stored securely in Keychain');

//             Alert.alert('Success', 'Logged in securely');
//             if (onLoginSuccess) onLoginSuccess(token);
//         } catch (error) {
//             console.log('[LoginScreen] Login Error:', error);

//             if (error.response) {
//                 // The request was made and the server responded with a status code
//                 // that falls out of the range of 2xx
//                 console.log('[LoginScreen] API Error Response:', error.response.data);
//                 const apiErrorMsg = error.response.data.error || 'Invalid credentials';
//                 Alert.alert('Login Failed', apiErrorMsg);
//             } else if (error.request) {
//                 // The request was made but no response was received
//                 console.log('[LoginScreen] No response received:', error.request);
//                 Alert.alert('Login Failed', 'Network issue. No response from server.');
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 // Or Keychain failed to save
//                 Alert.alert('Login Failed', error.message || 'An unexpected error occurred');
//             }
//         } finally {
//             setLoading(false);
//             console.log('[LoginScreen] Login flow finished');
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Login</Text>

//             <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 autoCapitalize="none"
//                 keyboardType="email-address"
//                 value={email}
//                 onChangeText={setEmail}
//             />

//             <View style={styles.passwordContainer}>
//                 <TextInput
//                     style={styles.passwordInput}
//                     placeholder="Password"
//                     secureTextEntry={!showPassword}
//                     value={password}
//                     onChangeText={setPassword}
//                 />
//                 <TouchableOpacity
//                     style={styles.eyeIcon}
//                     onPress={() => setShowPassword(!showPassword)}
//                 >
//                     <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#888" />
//                 </TouchableOpacity>
//             </View>

//             <TouchableOpacity
//                 style={styles.btn}
//                 onPress={handleLogin}
//                 disabled={loading}
//             >
//                 {loading ? (
//                     <ActivityIndicator color="#fff" />
//                 ) : (
//                     <Text style={styles.btnText}>Sign In</Text>
//                 )}
//             </TouchableOpacity>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
//     title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ddd',
//         padding: 12,
//         borderRadius: 8,
//         marginBottom: 16,
//     },
//     passwordContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor: '#ddd',
//         borderRadius: 8,
//         marginBottom: 16,
//         paddingRight: 12,
//     },
//     passwordInput: {
//         flex: 1,
//         padding: 12,
//     },
//     eyeIcon: {
//         padding: 4,
//     },
//     btn: {
//         backgroundColor: '#007AFF',
//         padding: 14,
//         borderRadius: 8,
//         alignItems: 'center',
//         marginTop: 8,
//     },
//     btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// });















// // Search Bar with Debounce & Filtering

// import React, { useState, useEffect } from 'react';
// import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';

// const ALL_DATA = [
//     { id: '1', name: 'Software Engineer' },
//     { id: '2', name: 'React Native Developer' },
//     { id: '3', name: 'Frontend Architect' },
//     { id: '4', name: 'Backend Engineer' },
//     { id: '5', name: 'DevOps Specialist' },
// ];

// export default function SearchScreen() {
//     const [query, setQuery] = useState('');
//     const [filteredData, setFilteredData] = useState(ALL_DATA);

//     // Debouncing effect: executes 400ms after user stops typing
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             if (!query.trim()) {
//                 setFilteredData(ALL_DATA);
//             } else {
//                 const results = ALL_DATA.filter((item) =>
//                     item.name.toLowerCase().includes(query.toLowerCase())
//                 );
//                 setFilteredData(results);
//             }
//         }, 400);

//         return () => clearTimeout(timer); // Reset timer if input changes before 400ms
//     }, [query]);

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.searchBar}
//                 placeholder="Search jobs..."
//                 value={query}
//                 onChangeText={setQuery}
//             />

//             <FlatList
//                 data={filteredData}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                     <View style={styles.item}>
//                         <Text style={styles.itemText}>{item.name}</Text>
//                     </View>
//                 )}
//                 ListEmptyComponent={
//                     <Text style={styles.emptyText}>No results match your search</Text>
//                 }
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 16, backgroundColor: '#fff', marginTop: 40 },
//     searchBar: {
//         height: 48,
//         borderWidth: 1,
//         borderColor: '#ddd',
//         borderRadius: 8,
//         paddingHorizontal: 12,
//         marginBottom: 16,
//         backgroundColor: '#f2f2f2',
//     },
//     item: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#eee' },
//     itemText: { fontSize: 16, color: '#333' },
//     emptyText: { textAlign: 'center', marginTop: 24, color: '#888' },
// });














// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     StyleSheet,
//     Platform,
//     PermissionsAndroid,
//     ActivityIndicator,
//     Alert,
// } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';

// export default function LocationMapScreen() {
//     const [location, setLocation] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // Runtime Permission Handler
//     const requestLocationPermission = async () => {
//         if (Platform.OS === 'ios') {
//             const auth = await Geolocation.requestAuthorization('whenInUse');
//             return auth === 'granted';
//         }

//         if (Platform.OS === 'android') {
//             const granted = await PermissionsAndroid.request(
//                 PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//                 {
//                     title: 'Location Permission',
//                     message: 'This app needs access to your location to show on map.',
//                     buttonPositive: 'OK',
//                 }
//             );
//             return granted === PermissionsAndroid.RESULTS.GRANTED;
//         }
//         return false;
//     };

//     useEffect(() => {
//         const fetchCurrentLocation = async () => {
//             const hasPermission = await requestLocationPermission();
//             if (!hasPermission) {
//                 Alert.alert('Permission Denied', 'Location access is required.');
//                 setLoading(false);
//                 return;
//             }

//             Geolocation.getCurrentPosition(
//                 (position) => {
//                     setLocation({
//                         latitude: position.coords.latitude,
//                         longitude: position.coords.longitude,
//                         latitudeDelta: 0.01,
//                         longitudeDelta: 0.01,
//                     });
//                     setLoading(false);
//                 },
//                 (error) => {
//                     Alert.alert('Error', error.message);
//                     setLoading(false);
//                 },
//                 { enableHighAccuracy: false, timeout: 30000, maximumAge: 10000 }
//             );
//         };

//         fetchCurrentLocation();
//     }, []);

//     if (loading || !location) {
//         return (
//             <View style={styles.center}>
//                 <ActivityIndicator size="large" color="#007AFF" />
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <MapView style={styles.map} initialRegion={location} showsUserLocation>
//                 <Marker
//                     coordinate={{
//                         latitude: location.latitude,
//                         longitude: location.longitude,
//                     }}
//                     title="Current Location"
//                     description="You are currently here"
//                 />
//             </MapView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1 },
//     map: { width: '100%', height: '100%' },
//     center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// });
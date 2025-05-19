import Routes from './App/Navigation/Routes'
import { CartProvider } from './App/Utilities/CartProvider'
const App = () => {
  return (
    <CartProvider>
      <Routes />
      </CartProvider>     
  )

}
export default App


// import React, { useEffect, useState } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from "@react-navigation/stack";
// import HomeScreen from './App/offline/HomeScreen';
// import LoginScreen from './App/offline/LoginScreen';
// import { MyTransition } from './App/Utilities/navigationslide';

// const StackComponent = createStackNavigator();

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkLogin = async () => {
//       try {
//         const token = await AsyncStorage.getItem('tokenID');
//         setIsLoggedIn(!!token);
//       } catch (error) {
//         console.error('Error fetching token:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkLogin();
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer key={isLoggedIn}>
//       <StackComponent.Navigator screenOptions={MyTransition}>
//         {isLoggedIn ? (
//           <StackComponent.Screen name="Home" component={HomeScreen} />
//         ) : (
//           <StackComponent.Screen name="Login" component={LoginScreen} />
//         )}
//       </StackComponent.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;


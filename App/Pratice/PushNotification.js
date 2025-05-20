import {
    View,
    Text,
    Alert,
    Platform,
    PermissionsAndroid,
    Linking,
  } from 'react-native';
  import React, { useEffect } from 'react';
  import messaging from '@react-native-firebase/messaging';
  
  const PushNotification = () => {
    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
  
        if (!hasPermission) {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
  
          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification permission granted');
            getFcmToken();
          } else if (result === PermissionsAndroid.RESULTS.DENIED) {
            Alert.alert(
              'Permission Required',
              'Please allow notification permission to receive updates.',
              [
                {
                  text: 'OK',
                },
              ]
            );
          } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            Alert.alert(
              'Permission Blocked',
              'Please enable notification permission from app settings.',
              [
                {
                  text: 'Open Settings',
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
              ]
            );
          }
        } else {
          getFcmToken();
        }
      } else {
        // For Android < 13 or iOS
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
        if (enabled) {
          console.log('Notification permission status:', authStatus);
          getFcmToken();
        } else {
          Alert.alert('Push Notification permission denied');
        }
      }
    };
  
    const getFcmToken = async () => {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log('FCM Token:', fcmToken);
        } else {
          console.log('Failed to get FCM token');
        }
      } catch (error) {
        console.error('Error fetching FCM token:', error);
      }
    };
  
    useEffect(() => {
      requestNotificationPermission();
  
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('New Notification', remoteMessage.notification?.body || '');
      });
  
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('Notification opened from background:', remoteMessage.notification);
      });
  
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log('Notification opened from quit state:', remoteMessage.notification);
          }
        });
  
      return unsubscribe;
    }, []);
  
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'blue' }}>Hello Guna</Text>
      </View>
    );
  };
  
  export default PushNotification;
  
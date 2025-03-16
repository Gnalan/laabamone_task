
import Toast from 'react-native-simple-toast';

export const getRandomId = () => Math.random().toString(36).substring(2, 10);


export const Toastshort = (message) => {
    Toast.show(message,Toast.SHORT);
    return

}
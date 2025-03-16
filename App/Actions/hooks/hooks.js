import { Alert } from "react-native";
export const Prettyalert = async (payload) => {
  Alert.alert(JSON.stringify(payload, null, 2))
}
export const Prettylog = async (payload) => {
  console.log(JSON.stringify(payload, null, 2));
}











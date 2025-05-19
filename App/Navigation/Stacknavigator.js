import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MyTransition } from "../Utilities/navigationslide";
import Splash from "../Screens/splash/Splash";
import Home from "../Screens/home/Home";
import Login from "../Screens/auth/Login";
import MyCart from "../Screens/mycart/MyCart";
import Test from "../Test";
import AddTimerScreen from "../AddTimerScreen";
import Validation from "../Validation";

const StackComponent = createStackNavigator();

const Stacknavigator = () => {
    return (
        <StackComponent.Navigator
            screenOptions={MyTransition}
            initialRouteName={"Splash"}
        >
             <StackComponent.Screen name={"Splash"} component={Splash} />
             <StackComponent.Screen name={"Home"} component={Home} />
             <StackComponent.Screen name={"Login"} component={Login} />
             <StackComponent.Screen name={"MyCart"} component={MyCart} />
             {/* <StackComponent.Screen name={"Test"} component={Test} />
             <StackComponent.Screen name={"AddTimerScreen"} component={AddTimerScreen} />
             <StackComponent.Screen name={"Validation"} component={Validation} /> */}
       
        </StackComponent.Navigator>
    )
}
export default Stacknavigator;
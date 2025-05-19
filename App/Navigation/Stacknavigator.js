import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MyTransition } from "../Utilities/navigationslide";
import Splash from "../Screens/splash/Splash";
import Home from "../Screens/home/Home";
import Login from "../Screens/auth/Login";
import MyCart from "../Screens/mycart/MyCart";
import DataList from "../Pratice/DataList";
import DataPagination from "../Pratice/DataPagination";


const StackComponent = createStackNavigator();

const Stacknavigator = () => {
    return (
        <StackComponent.Navigator
            screenOptions={MyTransition}
            initialRouteName={"DataPagination"}
        >
             <StackComponent.Screen name={"Splash"} component={Splash} />
             <StackComponent.Screen name={"Home"} component={Home} />
             <StackComponent.Screen name={"Login"} component={Login} />
             <StackComponent.Screen name={"MyCart"} component={MyCart} />


             {/* pratice component */}
             <StackComponent.Screen name={"DataList"} component={DataList} />
             <StackComponent.Screen name={"DataPagination"} component={DataPagination} />
       
        </StackComponent.Navigator>
    )
}
export default Stacknavigator;
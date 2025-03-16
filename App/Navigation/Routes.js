
import React, { useCallback, useEffect, useState } from "react";

import {
  NavigationContainer,
 } from "@react-navigation/native";
import {SafeAreaView, StatusBar,useColorScheme } from "react-native";
import MyStatusBar from "../Utilities/statusbar";
import Stacknavigator from "./Stacknavigator";
import theme from "../Utilities/theme";
import themeContext from "../Utilities/themecontext";

const Routes = () => {
  const [mode, setMode] = useState("light");
  const colorScheme = useColorScheme()
  useEffect(() => {
    if (colorScheme == "dark") {
        setMode("dark")
        StatusBar.setBarStyle('light-content');

    }
    else {
        setMode("light")
        StatusBar.setBarStyle('dark-content');
    }
 
}, [colorScheme,mode])
 return (
  <>


<themeContext.Provider value={mode === "light" ? theme.light : theme.dark}  >
<MyStatusBar backgroundColor={mode == "light" ? "#FFFFFF" : "#0B0909"} /> 
    <SafeAreaView style={{ flex: 1 }} >
     <NavigationContainer >
        <Stacknavigator />
      </NavigationContainer>
    </SafeAreaView>
    </themeContext.Provider>
    </>
  
  )
}
export default Routes;
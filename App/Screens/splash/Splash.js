import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useContext } from 'react'
import { RFValue } from "react-native-responsive-fontsize";
import { Fonts } from '../../Utilities/fonts';
import { Images } from '../../Utilities/images';
import { useNavigation } from '@react-navigation/native';
import { deviceheight, devicewidth } from '../../Utilities/Dimensions';
import Button from '../../Components/button';
import themeContext from '../../Utilities/themecontext';

const Splash = (props) => {
  const navigation = useNavigation();
  const theme = useContext(themeContext)
  const styles = style(theme);
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: "100%", justifyContent: "center", }} start={{ x: 0.5, y: 0 }}
      >
        <View style={styles.boxcontainer}>
          <View style={{ width: devicewidth * 0.830, height: deviceheight * 0.190, }}>
            <Image style={{ width: "100%", height: "100%" }} source={Images.splashicon} resizeMode='contain' />
          </View>
          <Text style={styles.para}>Welcome to Food Ordering App</Text>
          <Text style={styles.content}>Order your favorite meals with ease and enjoy exclusive deals. Buy one pizza and get another free!</Text>
        </View>

      </View >
      <View style={{ position: "absolute", bottom: "5%", width: "100%" }}>
        <View style={{ width: "90%", alignSelf: "center" }}>
          <Button title={"Get Started"} onpress={() => navigation.navigate("Login")} />
        </View>
      </View>

    </View>
  )
}

export default Splash;

const style = (theme) => StyleSheet.create({
  container: {
    flex: 1
  },
  boxcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.background

  },
  para: {
    fontFamily: Fonts.Bold,
    fontSize: RFValue(16),
    color: theme.text,
    marginTop: "4%"
  },
  content: {
    fontFamily: Fonts.Regular,
    fontSize: RFValue(12),
    width: "90%",
    color: theme.text,
    marginTop: "2%",
    textAlign: "center"
  }
});
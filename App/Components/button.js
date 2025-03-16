import React, { useContext } from "react"
import { StatusBar, View, StyleSheet, Text, Pressable } from "react-native"
import { color } from "../Utilities/colors";
import { RFPercentage,RFValue } from "react-native-responsive-fontsize";
import { Fonts } from "../Utilities/fonts";
import { borderradius } from "../Utilities/Dimensions";


const Button = ({
    top,
    onpress,
    title
}) => {
    return (
        <Pressable onPress={onpress} style={{
            width: "100%",
            borderRadius: borderradius * 0.5,
            backgroundColor: color.primary,
            alignItems: "center",
            justifyContent: "center",
            borderColor: color.white,
            padding: "3.5%",
            alignSelf:"center",
            marginTop: top ?? 0
        }}>
            <Text style={{ color: color.white, fontSize: RFValue(14), fontFamily: Fonts.Medium }}>{title}</Text>
        </Pressable>


    )
}
export default Button;


import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, Keyboard } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import themeContext from '../../Utilities/themecontext';
import Icon from 'react-native-vector-icons/Ionicons';
import { borderradius, deviceheight, devicewidth } from '../../Utilities/Dimensions';
import { Fonts } from '../../Utilities/fonts';
import { RFValue } from 'react-native-responsive-fontsize'
import { color } from '../../Utilities/colors';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Passwordicon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../Components/button';
import { Toastshort } from '../../Actions/constant/constant';
import * as Yup from 'yup';
import { useFormik } from 'formik'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const validationSchema = Yup.object({
    email: Yup.string()
    .required('Email id is required')
    .email("Enter a valid email")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Enter a valid email format"),
    password: Yup.string().required('Password is required').matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        "Password must be 8+ chars, including uppercase, number, and special char"
    ),
})
const defaultCredtentials = {
    email: 'laabamone@gmail.com',
    password: 'Test@123'
};

const Login = () => {
    const navigation = useNavigation();
    const theme = useContext(themeContext)
    const styles = style(theme);
    const [loading, setLoading] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(true)
    const { errors, touched, values, handleSubmit, setFieldValue, } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: (values) => {
            handleLogin(values);
        }
    })

    const handleLogin = async () => {
        setLoading(true);
        if (values.email === defaultCredtentials.email && values.password === defaultCredtentials.password) {
            await AsyncStorage.setItem('tokenID', values.email);
            Toastshort("Login successful!");
            navigation.navigate('Home');
        } else {
            Toastshort("Invalid credentials! Try again.");
        }

        setLoading(false);
    };
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(false);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(true);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [])

    return (
        <KeyboardAwareScrollView nestedScrollEnabled contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.boxcontainer}>
                    <View style={styles.header}>
                        <Pressable style={{ padding: "2%", }} onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={devicewidth * 0.07} color={theme.text} />
                        </Pressable>
                    </View>
                    <View style={{ width: "100%", height: "90%", }}>

                        <View style={styles.cardtwo}>
                            <Text style={styles.para}>Login</Text>
                            <View style={{ marginTop: "6%" }}>
                                <Text style={styles.title}>Email</Text>
                                <View style={styles.inputcontainer}>
                                    <TextInput
                                        placeholderTextColor={color.grey}
                                        placeholder="enter your email id"
                                        style={styles.inputtxtstyle}
                                        keyboardType='email-address'
                                        value={values.email}
                                        onChangeText={(text) => setFieldValue('email', text.trim())}
                                    />
                                    <View style={{ position: "absolute", left: 7 }}>
                                        <EmailIcon name="email-outline" size={devicewidth * 0.0490} color={color.grey} />
                                    </View>
                                </View>
                                {errors.email && touched.email ? <Text style={styles.errtxt}>{errors.email && touched.email ? errors.email : ""}</Text> : null}

                            </View>
                            <View style={{ marginTop: "6%" }}>
                                <Text style={styles.title}>Password</Text>
                                <View style={styles.inputcontainer}>
                                    <TextInput
                                        placeholderTextColor={color.grey}
                                        placeholder="enter your password"
                                        style={styles.inputtxtstyle}
                                        // secureTextEntry={true}  
                                        value={values.password}
                                        onChangeText={(text) => setFieldValue('password', text.trim())}

                                    />
                                    <View style={{ position: "absolute", left: 7 }}>
                                        <Passwordicon name="wifi-password" size={devicewidth * 0.0490} color={color.grey} />
                                    </View>
                                </View>
                                {errors.password && touched.password ? <Text style={styles.errtxt}>{errors.password && touched.password ? errors.password : ""}</Text> : null}

                            </View>
                        </View>
                    </View>
                </View>
                {keyboardVisible &&
                    <View style={{ position: "absolute", bottom: "6%", width: "100%" }}>
                        <View style={{ paddingHorizontal: "4%", alignSelf: "center", width: "100%" }}>
                            {loading ? (
                                <Pressable style={styles.btnload}>
                                    <ActivityIndicator size="large" color={color.white} style={styles.loader} />
                                </Pressable>
                            )
                                : (
                                    <Button
                                        onpress={handleSubmit}
                                        title={"Submit"} />

                                )
                            }
                        </View>
                    </View>
                }
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Login

const style = (theme) => StyleSheet.create({
    container: {
        flex: 1,
    },
    boxcontainer: {
        width: "100%",
        height: "100%",
        backgroundColor: theme.background,
        paddingHorizontal: "4%",
        paddingTop: "2%"

    },
    header: {
        height: "10%",
        flexDirection: "row",
        alignItems: "center",
    },

    backtxt: {
        fontFamily: Fonts.Regular,
        fontSize: RFValue(16),
        color: theme.text,
        marginLeft: "2%"
    },
    inputcontainer: {
        width: "100%",
        height: deviceheight * 0.0530,
        paddingHorizontal: "10%",
        justifyContent: "center",
        borderRadius: borderradius * 0.3,
        alignItems: "center",
        backgroundColor: "transparent",
        borderWidth: 0.8,
        borderColor: theme.greytext,
        marginTop: "2%"

    },
    inputtxtstyle: {
        fontSize: RFValue(12),
        fontFamily: Fonts.Regular,
        color: theme.text,
        width: "100%",
    },
    cardtwo: {
        width: "100%",
        paddingVertical: "4%",
        paddingHorizontal: "4%",
        height: deviceheight * 0.300,
        backgroundColor: theme.secondarybg,
        borderRadius: borderradius * 0.5,

    },
    para: {
        fontFamily: Fonts.SemiBold,
        fontSize: RFValue(16),
        color: theme.text,
        textAlign: "center"
    },
    title: {
        fontSize: RFValue(14),
        fontFamily: Fonts.Medium,
        color: theme.text,
    },
    errtxt: {
        fontFamily: Fonts.Regular,
        color: "red",
        fontSize: RFValue(12),
        marginTop: "1%",

    },
    btnload: {
        width: "100%",
        borderRadius: borderradius * 0.3,
        backgroundColor: color.primary,
        alignItems: "center",
        justifyContent: "center",
        borderColor: color.white,
        padding: "3.5%",
        alignSelf: "center",
    }

})

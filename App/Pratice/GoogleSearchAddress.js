import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable, ScrollView, StatusBar, Keyboard, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { RFValue } from "react-native-responsive-fontsize";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Ionicons';
import { borderradius, deviceheight } from '../Utilities/Dimensions';
import { Fonts } from '../Utilities/fonts';




const GoogleSearchAddress = () => {
    // const navigation = useNavigation();
    const [keyboardVisible, setKeyboardVisible] = useState(true)
    const googlePlacesRef = useRef(null);
    const [location, setLocation] = useState("");
    const [addressdata, setAddressdata] = useState("");

    const onselect = async (data, details = null) => {
        console.log("dadadat",data,"detatattatatata00000000000000",details);

        if (!details) {
            // shownegativemessage("Error", "No details available")
            return;
        }
        else {
            // const response = Locationdetails(details)
            // console.log(response, "HELLLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
            // setAddressdata(response)
            googlePlacesRef.current?.setAddressText(details?.formatted_address);
            console.log("formatedadddddd",details?.formatted_address);
            // Alert.alert("Current Location", details?.formatted_address);
            setLocation(details?.formatted_address)
        }
    }

    const Rightbutton = () => {
        return (
            < Pressable style={{ width: 30, height: 30, justifyContent: "center", alignItems: "center", position: "absolute", right: "2%",alignSelf:"center", }} onPress={handleClear}>
                <Icon name="close-circle" size={24} color='#5d5d5d' />
            </Pressable>
        )
    }

   
    const handleClear = () => {
        if (googlePlacesRef.current) {
            googlePlacesRef.current.clear();
        }
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
    }, []);


    const handleContinue = () => {
        if (location== "") {
            // showwarningmessage("Warning","Please enter your address.")
            return;
        }
        else{
            // navigation.navigate("PersonDetails",{addressdata:location})
        }
      

        
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* <LinearGradient style={{ width: "100%", height: "100%" }} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} colors={['#F8BE2D', '#901487']}> */}
                <View onStartShouldSetResponder={() => Keyboard.dismiss()} style={styles.boxcontainer}>
                    <View style={styles.backcontainer}>
                        {/* <Pressable onPress={() => navigation.goBack()} style={styles.roundbox}>
                            {Images.back}
                        </Pressable> */}
                    </View>

                    <View style={{ width: "100%", height: "85%", marginBottom: "8%" }}>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>

                            <Text style={styles.title}>Where are
                                you located</Text>
                            <View style={{ width: "92%", marginTop: "1%" }}>
                                <Text style={styles.subtitle}>Set Your Location to find local events
                                    and meet people nearby.</Text>
                            </View>
                            <View style={{ width: '90%', flexDirection: 'row', alignItems: "center", marginTop: "4%",}}>
                                <GooglePlacesAutocomplete
                                    ref={googlePlacesRef}
                                    
                                    placeholder='Search'
                                    fetchDetails={true}
                                    onPress={onselect}
                                    debounce={300}
                                    listViewDisplayed={false}
                                    query={{
                                        key: 'AIzaSyDwQOCtNC-XQRRYsZIg5lXexgr-CrOEXrw',
                                        language: 'en',
                                    }}
                                    enablePoweredByContainer={false}
                                    styles={{
                                        textInputContainer: {
                                            width: '100%',
                                        },
                                        textInput: {
                                            height:52,
                                            width:20,
                                            color: '#5d5d5d',
                                            // fontSize: RFValue(13),
                                            // fontFamily: Fonts.Regular,
                                            // whiteSpace: 'nowrap', 
                                            


                                        },
                                        predefinedPlacesDescription: {
                                            color: '#1faadb',
                                        },
                                      
                                    }}
                                    renderRightButton={Rightbutton}
                                    // renderLeftButton={() => (
                                    //     <View style={styles.iconContainer}>
                                    //         {Images.search1}
                                    //     </View>
                                    // )}
                                  
                                />
                               {/* <Pressable  onPress={handleClear} style={{width:"10%",justifyContent:"center"}} >
                               <Icon name="close-circle" size={24} color="grey" />
                               </Pressable> */}
                            </View>




                        </View>

                    </View>
                    {keyboardVisible && <View style={{ position: "absolute", left: 0, right: 0, bottom: "3%", alignItems: "center", justifyContent: "center" }}>
                        <Pressable onPress={handleContinue}  style={{
                            width: "75%",
                            borderRadius: borderradius * 1.5,
                            // backgroundColor: c.secondary,
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "4%",
                            alignSelf: "center",

                        }}  >
                            <Text style={{ color: "#fff", fontSize: RFValue(18), fontFamily: Fonts.Regular }}>Continue</Text>
                        </Pressable>
                    </View>}
                </View>
            {/* </LinearGradient> */}

        </SafeAreaView>
    )
}

export default GoogleSearchAddress

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    boxcontainer: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    // title: {
    //     fontFamily: Fonts.Bold,
    //     color: c.white,
    //     fontSize: RFValue(26),
    //     textAlign: "center",
    // },
    // subtitle: {
    //     fontFamily: Fonts.Regular,
    //     color: c.white,
    //     fontSize: RFValue(15),
    //     textAlign: "center",
    //     letterSpacing: 0.1
    // },
    // inputpara: {
    //     fontFamily: Fonts.Bold,
    //     color: c.white,
    //     fontSize: RFPercentage(2.1),
    // },
    // backcontainer: {
    //     width: "100%",
    //     paddingTop: "6.2%",
    //     height: "15%",
    // },
    // roundbox: {
    //     width: devicewidth * 0.11,
    //     height: devicewidth * 0.11,
    //     borderRadius: (devicewidth * 0.15) / 2,
    //     backgroundColor: "#fff",
    //     marginLeft: "3%",
    //     alignItems: "center",
    //     justifyContent: "center"
    // },
    // bottomtxt: {
    //     fontFamily: Fonts.Bold,
    //     color: c.white,
    //     fontSize: RFPercentage(2),
    // },
    // profilebox: {
    //     width: devicewidth * 0.24,
    //     height: devicewidth * 0.24,
    //     borderRadius: (devicewidth * 0.15) / 1.3,
    //     backgroundColor: c.primary,
    // },
    // editbox: {
    //     width: devicewidth * 0.07,
    //     height: devicewidth * 0.07,
    //     borderRadius: borderradius * 2,
    //     backgroundColor: c.secondary,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     position: "absolute",
    //     bottom: "3%",
    //     right: 0,
    // },
    inputsec: {
        width: "90%",
        alignSelf: "center",
        marginTop: "3%"
    },
    inputcontainer: {
        width: "100%",
        height: deviceheight* 0.0550,
        paddingHorizontal: "3%",
        borderRadius: borderradius * 0.3,
        alignItems: "center",
        borderColor: "#ffff",
        borderWidth: 0.9,
    },
    inputtxtstyle: {
        // fontSize: RFValue(12),
        // fontFamily: Fonts.Regular,
        // color: c.white,
        width: "100%"
    },
    // dobcontainer: {
    //     width: "100%",
    //     alignItems: "center",
    //     justifyContent: "space-between",
    //     height: deviceheight * 0.0550,
    //     paddingHorizontal: "3%",
    //     borderRadius: borderradius * 0.3,
    //     alignItems: "center",
    //     borderColor: c.white,
    //     borderWidth: 0.9,
    // },
    // activegender: {
    //     width: "30%",
    //     height: deviceheight * 0.0500,
    //     backgroundColor: c.secondary,
    //     paddingHorizontal: "3%",
    //     borderRadius: borderradius * 0.3,
    //     alignItems: "center",
    //     borderColor: c.secondary,
    //     borderWidth: 0.9,
    //     justifyContent: "center"
    // },
    // gendertxt: {
    //     fontFamily: Fonts.Bold,
    //     color: c.white,
    //     fontSize: RFValue(14),
    // },
    // inactivegender: {
    //     width: "30%",
    //     height: deviceheight * 0.0500,
    //     paddingHorizontal: "3%",
    //     borderRadius: borderradius * 0.3,
    //     alignItems: "center",
    //     borderColor: c.white,
    //     borderWidth: 0.9,
    //     justifyContent: "center"
    // },
    // privacytxt: {
    //     fontFamily: Fonts.Bold,
    //     color: c.white,
    //     fontSize: RFValue(14),
    // },
    // privacytxt1: {
    //     fontFamily: Fonts.Bold,
    //     color: c.white,
    //     fontSize: RFValue(14),
    //     textDecorationLine: "underline"
    // },
    // privacytxt2: {
    //     fontFamily: Fonts.Bold,
    //     color: c.white,
    //     fontSize: RFValue(14),
    //     textDecorationLine: "underline"
    // },
    // btnbox: {
    //     width: "38%",
    //     height: deviceheight * 0.0500,
    //     paddingHorizontal: "2%",
    //     borderRadius: borderradius * 0.9,
    //     alignItems: "center",
    //     borderColor: c.white,
    //     borderWidth: 0.9,
    //     justifyContent: "center",
    // },
    // btntxt: {
    //     fontFamily: Fonts.SemiBold,
    //     color: c.white,
    //     fontSize: RFValue(14),
    // },
    // // Custom styles for the date picker
    // datePicker: {
    //     backgroundColor: c.primary,
    //     borderRadius: borderradius * 0.5,
    // },
    // loctxt: {
    //     fontSize: RFValue(12),
    //     fontFamily: Fonts.Regular,
    //     color: c.white,


    // },
    // searchcontainer: {
    //     width: '100%',
    //     alignItems: 'center',
    //     flexDirection: "row",
    //     justifyContent: 'space-between',
    //     height: deviceheight * 0.0530,
    //     paddingHorizontal: '3%',
    //     borderRadius: borderradius * 0.5,
    //     borderColor: c.white,
    //     borderWidth: 0.9,
    // },
    // inputtxtstyle: {
    //     fontSize: RFValue(14),
    //     fontFamily: Fonts.Regular,
    //     color: c.white,
    //     width: '100%',
    //     marginLeft: "1%"

    // },
    // closebox: {
    //     width: devicewidth * 0.0560,
    //     height: devicewidth * 0.0560,
    //     borderRadius: borderradius * 2,
    //     borderWidth: 0.9,
    //     borderColor: c.white,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     position: 'absolute',
    //     right: '3%',
    //     alignSelf: "center"
    // },
    // iconContainer: {
    //     width: devicewidth * 0.10,
    //     height: '100%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     position: 'absolute',
    //     left: 10,
    //     backgroundColor:"red"
    // },
});

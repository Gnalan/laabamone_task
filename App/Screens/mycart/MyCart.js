import { View, Text, StyleSheet, Image, FlatList, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import themeContext from '../../Utilities/themecontext';
import Icon from 'react-native-vector-icons/Ionicons';
import { borderradius, deviceheight, devicewidth } from '../../Utilities/Dimensions';
import { Images } from '../../Utilities/images';
import { Fonts } from '../../Utilities/fonts';
import { RFValue } from 'react-native-responsive-fontsize'
import TimeslotIcon from 'react-native-vector-icons/Entypo';
import MinusIcon from 'react-native-vector-icons/AntDesign';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import { color } from '../../Utilities/colors';
import { CartContext } from '../../Utilities/CartProvider';
const MyCart = () => {
    const navigation = useNavigation();
    const theme = useContext(themeContext)
    const styles = style(theme);
    const { cartCount, setCartCount } = useContext(CartContext);
    const handleIncrement = (index) => {
        let temp = [...cartCount]
        temp[index] = {
            ...temp[index], qty: temp[index]?.qty + 1
        }
        setCartCount(temp)
    };

    const handleDecrement = (index) => {
        let temp = [...cartCount]
        temp[index] = {
            ...temp[index], qty: temp[index]?.qty > 1 ? temp[index]?.qty - 1 : temp[index]?.qty
        }
        setCartCount(temp)
    };

    const mycartrenderdata = ({ item, index }) => {
        return (
            <View style={[styles.lists, {
                flexDirection: "row",
                flexWrap: "wrap",
            }]}>
                <View style={styles.cardbox}>
                    <View style={styles.childcard}>
                        <View style={{ width: devicewidth * 0.430, height: deviceheight * 0.120, padding: "4%", }}>
                            <Image style={{ width: "100%", height: "100%", borderRadius: borderradius * 8 }} source={Images[item?.image]} resizeMode='contain' />
                        </View>
                        <View style={{ position: "absolute", bottom: 4, }}>
                             <View style={styles.addcardbtn2}>
                                <Pressable onPress={() => handleDecrement(index)} style={{ width: "30%", alignItems: "center", justifyContent: "center", }}>
                                    <MinusIcon name="minus" size={devicewidth * 0.0490} color={color.white} />
                                </Pressable>
                                <View style={{ width: "40%", alignItems: "center", justifyContent: "center" }}>
                                    <Text style={styles.numtxt}>{item?.qty}</Text>
                                </View>
                                <Pressable onPress={() => handleIncrement(index)} style={{ width: "30%", alignItems: "center", justifyContent: "center", }}>
                                    <PlusIcon name="plus" size={devicewidth * 0.0490} color={color.white} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                     <View style={styles.innercard}>
                        <Text style={styles.title}>{item?.name}</Text>
                        <View style={{ flexDirection: "row", gap: 5, marginTop: "3%" }}>
                            <TimeslotIcon name="time-slot" size={devicewidth * 0.0390} color={theme.greytext} />
                            <Text style={styles.minstxt}>{item?.time}</Text>
                        </View>
                        <Text style={styles.offertxt}>{item?.discount}</Text>
                        <View style={{ flexDirection: "row", gap: 5 }}>
                            <Text style={styles.amounttxt}>₹ {item?.price * item?.qty}</Text>
                            <Text style={styles.mrptxt}>MRP ₹ <Text style={styles.sriketxt}>{item?.mrp}</Text></Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };
    
    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <Text style={styles.para}>My Cart</Text>
                <View style={{ position: "absolute", left: 8, alignItems: "center", justifyContent: "center" }}>
                    <Pressable style={{ padding: "4%" }} onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={devicewidth * 0.07} color={theme.text} />
                    </Pressable>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            <View style={{ flexDirection: 'row', flex: 1, width: "85%", alignSelf: "center" }}>
               <FlatList
                    keyExtractor={(_, index) => index.toString()}
                    data={cartCount}
                    renderItem={mycartrenderdata}
                    style={{ width: "100%", }}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{}} />}
                    ListEmptyComponent={() => {
                        return (
                            <View style={{ width: "100%", paddingVertical: "2%", alignItems: "center", justifyContent: "center", height: deviceheight, }}>
                                <Text style={styles.nodata}>No data found</Text>
                            </View>

                        )
                    }}
                />
             </View>
        </View>
    )
}
export default MyCart

const style = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    boxcontainer: {
        width: "100%",
        height: "100%",
        backgroundColor: theme.background,
        paddingTop: "2%"
    },
    header: {
        alignItems: "center",
        paddingVertical: "6%",
        justifyContent: "center",
    },
    category: {
        alignItems: "center",
        paddingBottom: "3%",
        paddingHorizontal: "4%",
    },
    para: {
        fontFamily: Fonts.Medium,
        fontSize: RFValue(14),
        color: theme.text
    },
    categorybox: {
        width: "100%",
        marginTop: "6%",
        height: deviceheight * 0.0530,
        paddingHorizontal: "6%",
        justifyContent: "space-between",
        borderRadius: borderradius * 0.3,
        alignItems: "center",
        backgroundColor: theme.background,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,
        flexDirection: "row"
    },
    cardone: {
        width: "100%",
        marginTop: "6%",
    },
    dropdowntxt: {
        fontSize: RFValue(12),
        fontFamily: Fonts.Light,
        color: theme.text,
    },
    lists: {
        width: "100%",
        padding: 10
    },
    sublists: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.background,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    nametxt: {
        fontSize: RFValue(14),
        fontFamily: Fonts.Medium,
        color: theme.text,
    },
    nodata: {
        fontSize: RFValue(14),
        fontFamily: Fonts.Medium,
        color: theme.text,
    },
    subcategorybox: {
       padding: 10
    },
    cardbox: {
        width: "100%",
    },
    childcard: {
        backgroundColor: theme.secondary,
        height: deviceheight * 0.160,
        width: "100%",
        borderRadius: borderradius * 0.5,
        alignItems: "center",
    },
    addcardbtn: {
        paddingHorizontal: "12%",
        paddingVertical: "0%",
        width: "100%",
        backgroundColor: theme.background,
        borderColor: color.primary,
        borderWidth: 0.4,
        borderRadius: borderradius * 0.3,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    addcardbtn2: {
        paddingVertical: "2%",
        width: "70%",
        flexDirection: "row",
        backgroundColor: color.primary,
        borderRadius: borderradius * 0.3,
        alignSelf: "center"
    },
    addtext: {
        fontSize: RFValue(13),
        fontFamily: Fonts.Regular,
        color: color.primary,
    },
    iconbox: {
        fontSize: RFValue(14),
        fontFamily: Fonts.Regular,
        color: color.white,
    },
    numtxt: {
        fontSize: RFValue(14),
        fontFamily: Fonts.Regular,
        color: color.white,
    },
    title: {
        fontSize: RFValue(13),
        fontFamily: Fonts.Bold,
        color: theme.text,
    },
    minstxt: {
        fontSize: RFValue(12),
        fontFamily: Fonts.Light,
        color: theme.greytext,
    },
    offertxt: {
        fontSize: RFValue(12),
        fontFamily: Fonts.SemiBold,
        color: color.secondary,
        marginTop: "2%"
    },
    amounttxt: {
        fontSize: RFValue(12),
        fontFamily: Fonts.SemiBold,
        color: theme.text,
        marginTop: "2%"
    },
    mrptxt: {
        fontSize: RFValue(12),
        fontFamily: Fonts.Light,
        color: theme.text,
        marginTop: "2%"
    },
    sriketxt: {
        fontSize: RFValue(12),
        fontFamily: Fonts.Light,
        color: theme.greytext,
        textDecorationLine: 'line-through',
        marginTop: "2%"
    },
    innercard: {
        backgroundColor: theme.background,
        elevation: 1,
        borderBottomLeftRadius: borderradius * 0.2,
        borderBottomEndRadius: borderradius * 0.2,
        paddingHorizontal: "4%",
        paddingVertical: "4%"
    },

})

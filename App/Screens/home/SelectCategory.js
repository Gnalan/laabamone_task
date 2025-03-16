import { View, Text, Pressable, StyleSheet, Image, } from 'react-native'
import React, { useContext } from 'react'
import { Modal } from 'react-native'
import themeContext from '../../Utilities/themecontext';
import { borderradius, deviceheight, devicewidth } from '../../Utilities/Dimensions';
import Cancelicon from 'react-native-vector-icons/MaterialIcons';
import { Fonts } from '../../Utilities/fonts';
import { RFValue } from 'react-native-responsive-fontsize'
import { color } from '../../Utilities/colors';
import { Images } from '../../Utilities/images';
const SelectCategory = ({ visible, onclose, onSuccess, onPressPizza, onPressBurger }) => {
    const closefn = () => {
        onclose(false)
    }
    const theme = useContext(themeContext)
    const styles = style(theme);
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType='slide'
            onRequestClose={closefn}
        >
            <View
                style={styles.container}>
                <View style={styles.modalcontainer}>
                    <View style={{ marginTop: "3%", paddingHorizontal: "6%", paddingVertical: "3%" }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.para}>Select Category</Text>
                            <Pressable onPress={() => closefn()}>
                                <Cancelicon name="cancel" size={devicewidth * 0.0690} color={theme.text} />
                            </Pressable>
                        </View>
                        <Text style={styles.paratxt}>Please select your category</Text>
                        <Pressable onPress={onPressPizza} style={{ flexDirection: "row", gap: 10, alignItems: "center", marginTop: "2%" }}>
                            <View style={{ width: devicewidth * 0.150, height: deviceheight * 0.070, borderRadius: borderradius * 9, }}>
                                <Image style={{ width: "100%", height: "100%", borderRadius: borderradius * 8 }} source={Images.pizza2} resizeMode='contain' />
                            </View>
                            <Text style={styles.content}>Pizza</Text>
                        </Pressable>
                        <Pressable onPress={onPressBurger} style={{ flexDirection: "row", gap: 10, alignItems: "center", marginTop: "1%" }}>
                            <View style={{ width: devicewidth * 0.150, height: deviceheight * 0.100, borderRadius: borderradius * 9, }}>
                                <Image style={{ width: "100%", height: "100%", borderRadius: borderradius * 8 }} source={Images.burger1} resizeMode='contain' />
                            </View>
                            <Text style={styles.content}>Burger</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default SelectCategory
const style = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.theme == "dark" ? 'rgba(18, 18, 18, 0.8)' : 'rgba(0, 0, 0, 0.5)',

    },
    modalcontainer: {
        backgroundColor: theme.theme == "dark" ? "#1f1e1e" : "#F5F4F7",
        position: "absolute",
        bottom: "0%",
        width: '100%',
        height: deviceheight * 0.290,
        borderRadius: borderradius * 0.5
    },
    para: {
        fontFamily: Fonts.Medium,
        fontSize: RFValue(16),
        color: theme.text
    },
    paratxt: {
        fontFamily: Fonts.Regular,
        fontSize: RFValue(13),
        color: theme.greytext,
        marginTop: "3%"
    },
    content: {
        fontFamily: Fonts.Medium,
        fontSize: RFValue(14),
        color: theme.text,
    },

});

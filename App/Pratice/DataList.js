import { View, StyleSheet, FlatList, Alert, Text, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react"
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";
import { Fonts } from "../Utilities/fonts";
import { borderradius, deviceheight, devicewidth } from "../Utilities/Dimensions";

const DataList = () => {
    const [products, setProducts] = useState([])
    const [loader, setLoader] = useState(true)

    const fetchlists = async () => {
        try {
            const response = await axios.get("https://dummyjson.com/products")
            setProducts(response.data.products)
            // Alert.alert("Fetched Products", JSON.stringify(response.data.products, null, 2));

        }
        catch (error) {
            console.log('errrrrr', error);

        }
        finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchlists()
    }, [])

    const datarenderlist = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.head}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <View style={{ width: devicewidth * 0.3, height: deviceheight * 0.1,borderRadius: borderradius * 4, overflow: "hidden" }}>
                <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.images[0] }} resizeMode="cover" />
            </View>
        </View>
    )
    return (
        <View style={styles.container}>
            {loader ? (
                <View>
                    <ActivityIndicator size={"large"} />
                </View>
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={datarenderlist}
                    numColumns={2}
                />
            )
            }

        </View>
    )
}
export default DataList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    card: {
        width: devicewidth * 0.45,
        backgroundColor: 'lightgray',
        margin: "3%",
        padding: "3%",
        borderRadius: borderradius * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    head: {
        fontFamily: Fonts.SemiBold,
        fontSize: RFValue(14),
        color: "#000",
        textAlign: 'center',
    },
    desc: {
        fontFamily: Fonts.Regular,
        fontSize: RFValue(12),
        color: "#000",
        textAlign: 'center',
        marginTop: "2%"
    },
    price: {
        fontFamily: Fonts.Regular,
        fontSize: RFValue(14),
        color: "green",
        textAlign: 'center',
        marginTop: "2%"
    }
})
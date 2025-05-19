import {
    View,
    StyleSheet,
    FlatList,
    Text,
    ActivityIndicator,
    Image,
    TextInput,
  } from "react-native";
  import React, { useEffect, useState, useRef } from "react";
  import axios from "axios";
  import { RFValue } from "react-native-responsive-fontsize";
  import { Fonts } from "../Utilities/fonts";
  import { borderradius, deviceheight, devicewidth } from "../Utilities/Dimensions";
  
  const limit = 10;
  
  const DataList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loader, setLoader] = useState(true);
    const [scrollLoading, setScrollLoading] = useState(false);
    const [search, setSearch] = useState("");
    const debounceTimerRef = useRef(null);
  
    const fetchlists = async (pageNumber = 1) => {
      if (scrollLoading || !hasMore) return;
  
      pageNumber === 1 ? setLoader(true) : setScrollLoading(true);
  
      try {
        const response = await axios.get(
          `https://dummyjson.com/products?limit=${limit}&skip=${
            (pageNumber - 1) * limit
          }`
        );
  
        const newProducts = response.data.products;
  
        if (pageNumber === 1) {
          setProducts(newProducts);
        } else {
          setProducts((prev) => [...prev, ...newProducts]);
        }
  
        if (response.data.total <= pageNumber * limit) {
          setHasMore(false);
        } else {
          setPage(pageNumber + 1);
        }
      } catch (error) {
        console.log("Error", error);
      } finally {
        setLoader(false);
        setScrollLoading(false);
      }
    };
  
    useEffect(() => {
      fetchlists();
    }, []);
  
    const debounceSearch = (text) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        handleSearch(text);
      }, 500);
    };
  
    const handleSearch = (text) => {
      const filtered = products.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase()) ||
        item.description.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    };
  
    const renderFooter = () => {
      return scrollLoading ? (
        <View style={{ padding: 10 }}>
          <ActivityIndicator />
        </View>
      ) : null;
    };
  
    const datarenderlist = ({ item }) => (
      <View style={styles.card}>
        <Text style={styles.head}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <View
          style={{
            width: devicewidth * 0.3,
            height: deviceheight * 0.1,
            borderRadius: borderradius * 4,
            overflow: "hidden",
            marginTop: 10,
          }}
        >
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: item.images[0] }}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Search by title or description"
          style={styles.searchInput}
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            debounceSearch(text);
          }}
        />
        {loader ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <FlatList
            data={search.length > 0 ? filteredProducts : products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={datarenderlist}
            numColumns={2}
            onEndReached={() => {
              if (search.length === 0) {
                fetchlists(page);
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    );
  };
  
  export default DataList;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      paddingTop: 50,
    },
    searchInput: {
      width: devicewidth * 0.9,
      height: 45,
      borderRadius: 8,
      borderColor: "lightgray",
      borderWidth: 2,
      paddingHorizontal: 10,
      marginBottom: "8%",
    },
    card: {
      width: devicewidth * 0.45,
      backgroundColor: "lightgray",
      margin: "2%",
      padding: "3%",
      borderRadius: borderradius * 0.5,
      justifyContent: "center",
      alignItems: "center",
    },
    head: {
      fontFamily: Fonts.SemiBold,
      fontSize: RFValue(14),
      color: "#000",
      textAlign: "center",
    },
    desc: {
      fontFamily: Fonts.Regular,
      fontSize: RFValue(12),
      color: "#444",
      textAlign: "center",
      marginTop: 5,
    },
    price: {
      fontFamily: Fonts.Bold,
      fontSize: RFValue(14),
      color: "green",
      textAlign: "center",
      marginTop: 5,
    },
  });
  
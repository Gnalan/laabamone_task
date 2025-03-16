import { View, Text, StyleSheet, Image, FlatList, Pressable, BackHandler, Alert, Animated, Dimensions } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import themeContext from '../../Utilities/themecontext';
import { borderradius, deviceheight, devicewidth } from '../../Utilities/Dimensions';
import { Images } from '../../Utilities/images';
import { Fonts } from '../../Utilities/fonts';
import { RFValue } from 'react-native-responsive-fontsize'
import TimeslotIcon from 'react-native-vector-icons/Entypo';
import DownIcon from 'react-native-vector-icons/Entypo';
import { color } from '../../Utilities/colors';
import { Toastshort } from '../../Actions/constant/constant';
import AddcartIcon from 'react-native-vector-icons/Fontisto';
import pizzasubcategory from '../data/subcategory.json'
import burgersubgategory from '../data/subcatagoryburger.json'
import pizzaitems from '../data/items.json'
import burgeritems from '../data/burgeritems.json'
import SelectCategory from './SelectCategory';
import CheckIcon from 'react-native-vector-icons/AntDesign';
import { CartContext } from '../../Utilities/CartProvider';
const { width } = Dimensions.get('window');
const Home = () => {
  const navigation = useNavigation();
  const [selected, setselected] = useState(1)
  const theme = useContext(themeContext)
  const styles = style(theme);
  const { cartCount, setCartCount } = useContext(CartContext);
  const [listPizza, setlistPizza] = useState(pizzaitems)
  const [listBurger, setlistBurger] = useState(burgeritems)
  const translateX = useRef(new Animated.Value(width)).current;
  const [colorchange, setColorChange] = useState(1)
  const [visible, setVisible] = useState({
    isShown: false,
    index: ""
  });
  const getCartCount = () => {
    totalCartCount = cartCount?.length
    return totalCartCount
  }

  const handleAdd = (index, item) => {

    if (selected === 1) {
      if (item?.price >= 1500) {
        Toastshort('The price amount is high.Please subscribe to the account')
      }
      else {
        let temp = [...listPizza,]
        temp[index] = {
          ...temp[index], isShowAdd: !temp[index]?.isShowAdd
        }
        setCartCount([...cartCount, item])
        setlistPizza(temp)
        Toastshort("Cart Added Succesfully");
      }

    }
    else {
      if (item?.price >= 1500) {
        Toastshort('The price amount is high.Please subscribe to the account')
      }
      else {
        let temp = [...listBurger,]
        temp[index] = {
          ...temp[index], isShowAdd: !temp[index]?.isShowAdd
        }
        setCartCount([...cartCount, item])
        setlistBurger(temp)
        Toastshort("Cart Added Succesfully");
      }

    }
  };

  const getName = (id) => {

    let isgetName = [...cartCount]?.some((ele) => ele?.id == id)
    return {
      name: isgetName ? "Added" : "Add",
      disabled: isgetName ? true : false
    }
  };

  const handCloseSelectCategory = () => {
    setVisible({
      isShown: false,
      index: ""
    })
  }
  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        Alert.alert("Exit App!", "Are you sure you want to exit the app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      }

    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [])

  useEffect(() => {
    const startAnimation = () => {
      translateX.setValue(width);
      Animated.timing(translateX, {
        toValue: -width,
        duration: 8000,
        useNativeDriver: true,
      }).start(() => startAnimation());
    };

    startAnimation();
  }, []);

  const renderItem = ({ item, index }) => {
    const isSelected = item.id === colorchange;
    return (
      <View style={styles.sublists}>
        <Pressable
          key={item.id}
          onPress={() => setColorChange(item.id)}
          style={styles.subcategorybox}>
          <View 
          style={[styles.imagecontainer, isSelected && styles.selectedimage]}
          >
            <Image style={{ width: "100%", height: "100%", borderRadius: borderradius * 8 }} source={Images[item.image]} resizeMode='contain' />
          </View>
          
          <Text style={[styles.productname, isSelected && styles.selectproductname]}>{item?.name}</Text>
        </Pressable>
      </View>
    );
  };

  const renderItem1 = ({ item, index }) => {
    return (
      <View style={[styles.lists, {
        flexDirection: "row",
      }]}>
        <View style={styles.cardbox}>
          <View style={styles.childcard}>
            <View style={{ width: devicewidth * 0.400, height: deviceheight * 0.120, padding: "6%", borderRadius: borderradius * 9, }}>
              <Image style={{ width: "100%", height: "100%", borderRadius: borderradius * 8 }} source={Images[item?.image]} resizeMode='contain' />
            </View>

            <View style={{ position: "absolute", bottom: 10, }}>
              <Pressable disabled={getName(item?.id)?.disabled} onPress={() => handleAdd(index, item)}
                style={[
                  styles.addcardbtn,
                  getName(item?.id)?.disabled ? styles.addedcardbtn : styles.addcardbtn
                ]}
              >
                {getName(item?.id)?.disabled ? (
                  <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                    <Text style={styles.addtext}>Added</Text>
                    <CheckIcon name="checkcircle" size={devicewidth * 0.0390} color={color.primary} />
                  </View>
                )
                  :
                  (
                    <Text style={styles.addtext}>Add</Text>
                  )}
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.innercard}>
          <Text style={styles.title}>{item?.name}</Text>
          <View style={{ flexDirection: "row", gap: 5, marginTop: "4%" }}>
            <TimeslotIcon name="time-slot" size={devicewidth * 0.0390} color={theme.greytext} />
            <Text style={styles.minstxt}>{item?.time}</Text>
          </View>
          <Text style={styles.offertxt}>{item?.discount}</Text>
          <View style={{ flexDirection: "row", gap: 5, marginTop: "2%" }}>
            <Text style={styles.amounttxt}>₹ {item?.price}</Text>
            <Text style={styles.mrptxt}>MRP ₹ <Text style={styles.sriketxt}>{item?.mrp}</Text></Text>
          </View>
        </View>
      </View>
    );
  };

  const renderCategory = () => {
    return (
      <View style={styles.category}>
        <Text style={styles.para}>FoodApp</Text>
        <View style={styles.categorybox}>
          <Text style={styles.nametxt}>{selected === 1 ? "Pizza" : "Burger"}</Text>
          <Pressable
            onPress={() => setVisible({
              isShown: true,
            })}
            style={{ flexDirection: "row", gap: 5, paddingHorizontal: "2.5%", paddingVertical: "2%" }}>
            <Text style={styles.dropdowntxt}>Select</Text>
            <DownIcon name="chevron-with-circle-down" size={devicewidth * 0.0500} color={color.secondary} />
          </Pressable>
        </View>

      </View>
    )
  }

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={{ width: devicewidth * 0.180, height: deviceheight * 0.06 }}>
          <Image style={{ width: "100%", height: "100%" }} source={Images.applogo} resizeMode='contain' />
        </View>
        <Pressable style={{ padding: "2%" }} onPress={() => navigation.navigate("MyCart")}>
          <AddcartIcon name="shopping-basket-add" size={devicewidth * 0.0620} color={theme.text} style={{}} />
          {getCartCount() > 0 && (
            <View style={{ position: "absolute", top: -1, right: -1 }}>
              <View style={{ width: 20, height: 20, borderRadius: borderradius * 3, backgroundColor: color.primary }}>
                <Text style={styles.counttxt}>{getCartCount()}</Text>
              </View>
            </View>)
          }
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderCategory()}
      {selected === 1 ?
        <Animated.Text style={[styles.textbox, { transform: [{ translateX }] }]}>
          <Text style={styles.textanimation}>🍕The pizza category has a Buy One, Get One Free offer!🎉</Text>
        </Animated.Text> :
        null
      }
      <View style={{ flexDirection: 'row', flex: 1, marginTop: "0%" }}>
        <FlatList
          data={selected === 1 ? pizzasubcategory : burgersubgategory}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={{ width: "25%" }}
          ItemSeparatorComponent={() => <View style={{}} />}
        />
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={selected === 1 ? listPizza : listBurger}
          renderItem={renderItem1}
          style={{ width: "75%" }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{}} />}
        />
      </View>
      <SelectCategory visible={visible.isShown}
        onSuccess={() => {
          handCloseSelectCategory()
        }
        }
        onclose={handCloseSelectCategory}
        onPressPizza={() => {
          setselected(1)
          handCloseSelectCategory()
        }}
        onPressBurger={() => {
          setselected(2)
          handCloseSelectCategory()
        }
        }
      />
    </View>
  )
}

export default Home

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
    paddingVertical: "4%",
    paddingHorizontal: "4%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
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
    paddingHorizontal: "6%",
    paddingVertical: "2.5%",
    justifyContent: "space-between",
    borderRadius: borderradius * 0.3,
    alignItems: "center",
    backgroundColor: "#F3F4F8",
    flexDirection: "row"
  },
  cardone: {
    width: "100%",
    marginTop: "6%",
  },
  dropdowntxt: {
    fontSize: RFValue(12),
    fontFamily: Fonts.Medium,
    color: color.secondary,
  },
  lists: {
    width: "95%",
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
    color: color.black,
  },
  subcategorybox: {
    padding: 10
  },
  cardbox: {
    width: "50%",
  },
  productname: {
    fontSize: RFValue(12),
    fontFamily: Fonts.Regular,
    color: theme.text,
    textAlign: "center",
    marginTop: "2%"
  },
  selectproductname: {
    fontSize: RFValue(12),
    fontFamily: Fonts.SemiBold,
    color: theme.text,
    textAlign: "center",
    marginTop: "2%"
  },
  childcard: {
    backgroundColor: theme.secondary,
    height: deviceheight * 0.160,
    width: "100%",
    borderRadius: borderradius * 0.5,
    alignItems: "center",
  },
  addcardbtn: {
    paddingHorizontal: "16%",
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderColor: color.primary,
    borderWidth: 0.4,
    borderRadius: borderradius * 0.3,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  addedcardbtn: {
    paddingHorizontal: "12%",
    paddingVertical: "0%",
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderColor: color.primary,
    borderWidth: 0.4,
    borderRadius: borderradius * 0.3,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"

  },
  addtext: {
    fontSize: RFValue(13),
    fontFamily: Fonts.Regular,
    color: color.primary,
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
    marginTop: "3%"
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
    width: "50%",
    paddingHorizontal: "4%",
    paddingVertical: "2%"
  },
  counttxt: {
    fontSize: RFValue(12),
    fontFamily: Fonts.SemiBold,
    color: "#FFFF",
    textAlign: "center"
  },
  textanimation: {
    fontSize: RFValue(13),
    fontFamily: Fonts.SemiBold,
    color: color.primary,
    textAlign: "center"
  },
  textbox: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2%",

  },
  imagecontainer:{
    width: devicewidth * 0.200,
     height: deviceheight * 0.09, 
     backgroundColor: "#F3F4F8",
      padding: "6%",
     borderRadius: borderradius * 2
  },
  selectedimage:{
    width: devicewidth * 0.200,
    height: deviceheight * 0.09, 
    backgroundColor: "#c5fedb",
     padding: "6%",
    borderRadius: borderradius * 2

  }
})

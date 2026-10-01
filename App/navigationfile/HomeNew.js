import { View, Text,Button,FlatList, StyleSheet} from 'react-native'
import React,{useEffect, useState}from 'react'
import { borderradius } from '../Utilities/Dimensions'
import { useNavigation } from '@react-navigation/native';


const HomeNew = () => {
    const navigation = useNavigation();
    const[users,setUsers]= useState([])
   
    useEffect(()=>{
        console.log("ggyjgjgjgjgj")
        fetch('https://dummyjson.com/users')
        .then(res=>res.json())
       
        .then(data =>{
            console.log(data.users,"ggyjgjgjgjgj")
            setUsers(data.users)
        }

        )
        .catch(err=>{
            console.error(err)
        })
    },[])
  return (
    <View style={{flex:1,padding:"5%"}}>
      <Text>HomeNew</Text>
     <Button onPress={()=>navigation.navigate("AboutNew")} title='go about'/>
     {/* <View style={{width:"100%",height:"50%",backgroundColor:"red"}}> */}
     <FlatList
      data={users}
      keyExtractor={(item )=>item.id.toString()}
      renderItem={ ({item})=>(
        <View style={styles.card}>
            <Text style={{color:"#000",fontSize:14}}>{item?.firstName}</Text>
            <Text style={{color:"#000",fontSize:14}}>{item?.lastName}</Text>
            </View>
  )}

     />
     {/* </View> */}
    </View>
  )
}

export default HomeNew


const styles= StyleSheet.create({
   card:{
    backgroundColor:"gray",
    padding:"3%",
    borderRadius:borderradius*1,
    marginTop:"2%"
   }

})
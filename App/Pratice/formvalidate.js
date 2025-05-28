import { View, Text,StyleSheet, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { borderradius, deviceheight } from './Utilities/Dimensions'
import { Toastshort } from './Actions/constant/constant'

const Validation = () => {
  const[username,setUsername] =useState("")
  const[fullname,setFullname] =useState("")
  const[phonenum,setPhonenum] =useState("")
  const[error,setError] =useState({})
  const handlevalidate= ()=>{
    let newErrors={}
    if(!username.trim()){
      newErrors.username ="user name is required"
    }
    if(!fullname.trim()){
      newErrors.fullname ="full name is required"
    }
    if(!phonenum.match( /^[0-9]{10}$/)){
      newErrors.phonenum ="phone num must be 10 digit is required"
    }
    setError(newErrors)
    return Object.keys(newErrors)?.length ==0
  }
  const handleSave=()=>{
    if(handlevalidate()){
      Toastshort("success")
      setUsername("")
      setFullname("")
      setPhonenum("")
    }
  }
  return (
    <View style={styles.container}>
      <View style={{width:"90%",alignSelf:"center"}}>
        <View>
          <Text>username</Text>
          <View style={styles.inputcontainer}>
            <TextInput
            placeholder='username'
            keyboardType='default'
            value={username}
            onChangeText={setUsername}
            style={{width:"100%",height:"100%"}}
            />
            {error.username&& <Text style={{color:"red"}}>{error.username}</Text>}
          </View>
        </View>

        <View style={{marginTop:"3%"}}>
          <Text>fullname</Text>
          <View style={styles.inputcontainer}>
            <TextInput
            placeholder='fullname'
            keyboardType='default'
            value={fullname}
            onChangeText={setFullname}
            style={{width:"100%",height:"100%"}}
            />
             {error.fullname&& <Text style={{color:"red"}}>{error.fullname}</Text>}
          </View>
        </View>
        <View style={{marginTop:"3%"}}>
          <Text>fullname</Text>
          <View style={styles.inputcontainer}>
            <TextInput
            placeholder='phone number'
            keyboardType='decimal-pad'
            value={phonenum}
            onChangeText={setPhonenum}
            style={{width:"100%",height:"100%"}}
            />
             {error.phonenum&& <Text style={{color:"red"}}>{error.phonenum}</Text>}
          </View>
        </View>
        <View style={{marginTop:"12%"}}>
        <Button onPress={handleSave} title='save'/>
          </View> 
      
      </View>
    </View>
  )
}

export default Validation

const styles=StyleSheet.create({
  container:{
   flex:1,
   paddingTop:"8%"
  },
  inputcontainer:{
    width:"100%",
    height:deviceheight*0.04,
    borderWidth:1,
    marginTop:"4%",
    borderRadius:borderradius*0.5,
    paddingHorizontal:"3%",
   
    

  }
})
import { Text, SafeAreaView, StyleSheet,View,Image,TextInput,Pressable, Alert } from 'react-native';
import React,{useState} from 'react'
import { borderradius } from './Utilities/Dimensions';
export default function Validation() {
  const[username,setUserName]=useState('')
  const[gender,setGender]=useState('')
  const[dob,setDob]=useState('')
  const [phonenumber,setPhoneNumber]=useState('')
  const [email,setEmail]=useState('')
  const [fullname,setFullName]=useState('')
  const[erros,setErrors]=useState({})
  const validateInput=()=>{
    let newErrors={}
    if(!username.trim()) newErrors.username ='UserName is rquired';
    if(!fullname.trim()) newErrors.fullname ='fullname is rquired';
    if(!gender.trim() || (!gender?.toLocaleLowerCase()  == 'male' && !gender?.toLocaleLowerCase() == 'female' )){
     newErrors.gender= 'gender must be male or female'
    }
    if(!dob.match(/^[0-9]{2}[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}$/g)){
      newErrors.dob= 'dob is must be dd/mm/yyy format'
    }
    if(!phonenumber.match( /^[0-9]{10}$/)){
      newErrors.phonenumber= 'phonrnumber is must be 10 digit format'
    }
    if(!email.match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      newErrors.email= 'email is must be valite format'
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length ==0
  }
  
  const handleSave=()=>{
    if(validateInput()){
    alert("success")
     
    }
  }
  return (
    <SafeAreaView style={styles.container}>
    <View style={{width:"100%",height:"100%",paddingVertical:"10%",}}>
    <View style={{width:"100%",alignItems:"center",justifyContent:"center"}}>
     <View>
     <Image style={{width:100,height:100,borderRadius:borderradius*1.5,borderWidth:2,borderColor:"blue"}} source={require('./Assets/Images/splash.png')} resizeMode='contain'/>
     </View>
     <Text style={styles.para}>Gunaseelan</Text>
      <Text style={styles.para1}>@gunaseelan</Text>
    </View>
    <View style={{width:"90%",alignSelf:"center"}}>
       <View>
       <TextInput
       style={styles.inputcontainer} 
       placeholder='username'
       placeholderTextColor='grey'
       value={username}
       onChangeText={setUserName}
       keyboardType='default'
       />
       {erros.username && <Text style={styles.errtxt}>{erros.username}</Text>}

       </View>
         <View style={{flexDirection:"row",width:"100%",justifyContent:"space-between"}}>
          <View style={{width:"45%"}}>
       <TextInput
       style={styles.inputmale} 
       placeholder='gender'
       placeholderTextColor='grey'
       value={gender}
       onChangeText={setGender}
       keyboardType='default'
       />
         {erros.gender && <Text style={styles.errtxt}>{erros.gender}</Text>}
         </View>
         <View style={{width:"45%"}}>
        <TextInput
       style={styles.inputdob} 
       placeholder='dob'
       placeholderTextColor='grey'
       value={dob}
       onChangeText={setDob}
       />
         {erros.dob && <Text style={styles.errtxt}>{erros.dob}</Text>}
         </View>
       </View>
         <View>
       <TextInput
       style={styles.inputcontainer} 
       placeholder='phonenumber'
       placeholderTextColor='grey'
       value={phonenumber}
       onChangeText={setPhoneNumber}
       keyboardType='numeric'
       />
         {erros.phonenumber && <Text style={styles.errtxt}>{erros.phonenumber}</Text>}
       </View>
           <View>
       <TextInput
       style={styles.inputcontainer} 
       placeholder='email'
       placeholderTextColor='grey'
       value={email}
       onChangeText={setEmail}
       keyboardType='email-address'
       />
         {erros.email && <Text style={styles.errtxt}>{erros.email}</Text>}
       </View>
       <View>
       <TextInput
       style={styles.inputcontainer} 
       placeholder='full name'
       placeholderTextColor='grey'
       value={fullname}
       onChangeText={setFullName}
       />
        {erros.fullname && <Text style={styles.errtxt}>{erros.fullname}</Text>}
       </View>


    </View>
    <View style={{position:"absolute",bottom:"4%",width:"100%",}}>
    <Pressable  onPress={handleSave} style={styles.btn}>
    <Text style={{color:"#fff", fontSize: 18,
    fontWeight: 'bold',}}>Save</Text>
    </Pressable>
    </View>
    </View>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  para: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:10
  },
   para1: {
    fontSize: 18,
    fontWeight: 'regular',
    textAlign: 'center',
    color:"grey",
    marginTop:10
  },
  inputcontainer:{
    height:37,
    borderWidth:0.7,
    borderRadius:10,
    marginTop:"4%",
    paddingHorizontal:15
  },
   inputmale:{
     width:"100%",
    height:37,
    borderWidth:0.7,
    borderRadius:10,
    marginTop:"4%",
    paddingHorizontal:15
  },
   inputdob:{
    width:"100%",
    height:37,
    borderWidth:0.7,
    borderRadius:10,
    marginTop:"4%",
    paddingHorizontal:15
  },
   btn:{
     width:"90%",
    alignSelf:"center",
    height:37,
    borderWidth:0.7,
    borderRadius:10,
    backgroundColor:"#000",
    alignItems:"center",
    justifyContent:"center"

  },
  errtxt:{
    fontSize: 10,
    fontWeight: 'bold',
    color:"red",
    marginTop:6
  }
});

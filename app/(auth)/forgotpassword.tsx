import {
    Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import { EvilIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import axios from "axios";
import Constants from "expo-constants";

export default function ForgotScreen() {
    const [email,setEmail] = useState('');
    const router = useRouter();
    const localhost = Constants.expoConfig?.extra?.localhost;

    const HandleForgotPassword = async()=>{
        if(email){
            try{
                const response = await axios.post(`http://${localhost}:3002/api/auth/forgot-password`,{email});
                if(response.status === 200){
                    router.push({pathname:"/(auth)/codeverify",params:{email}})
                }else if (response.status === 404){
                    Alert.alert("Email not found");
                }
            }catch(e){
                console.log("Error occured",e);
                Alert.alert("Error sending verification code")
            }
        }
        
    }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closebtn} onPress={()=>router.back()}>
          <EvilIcons name="close" size={20} color="#999" />
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.headertxt}>Forgot password?</Text>
        <View style={styles.textinp}>
          <InputField labelTxt="Email :" type="email" onChangeText={(txt)=>setEmail(txt)} />
        </View>

          <Pressable style={styles.resetbtn} onPress={HandleForgotPassword}>
            <Text style={{color:'#fff'}}>Reset Password</Text>
          </Pressable>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F4F7",
        paddingHorizontal:20
      },
      header:{
        marginTop:20,
        marginLeft:'auto',
      },
      closebtn:{
        padding:20,
        backgroundColor:'#e8e8e8',
        borderRadius:30,
      },
      subContainer:{
        justifyContent:'center',
        flex:.7
      },
      textinp:{
        margin:20
      },
      resetbtn:{
        padding:20,
        backgroundColor:"navy",
        borderRadius:8,
        alignItems:'center',
        alignSelf:'center'
      },
      headertxt:{
        fontSize:24,
        fontWeight:'600',
        color:'#000',
      },
});

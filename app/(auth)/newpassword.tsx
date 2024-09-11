import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import InputField from "@/components/InputField";
  import { EvilIcons } from "@expo/vector-icons";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useRouter } from "expo-router";
  
  export default function NewPsswdScreen() {
      const router = useRouter();
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closebtn} onPress={()=>router.back()}>
            <EvilIcons name="close" size={20} color="#999" />
          </TouchableOpacity>
        </View>
        <View style={styles.subContainer}>
        <View style={styles.subheader}>
            <Text style={styles.headertxt}>Set new password</Text>
            <Text style={styles.headersubtxt}>Must be atleast 8 characters.</Text>
        </View>
          <View style={styles.textinp}>
            <InputField labelTxt="New Password :" type="password" />
          </View>
  
            <Pressable style={styles.resetbtn}>
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
        subheader:{
            alignItems:'center',
          },
          headersubtxt:{
            fontSize:14,
            fontWeight:'400',
            color:'gray'
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
          fontSize:20,
          fontWeight:'500',
          color:'#000',
        },
  });
  
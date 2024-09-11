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

export default function ForgotScreen() {
    const router = useRouter();
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
          <InputField labelTxt="Email :" type="email" />
        </View>

          <Pressable style={styles.resetbtn} onPress={()=>router.push("/(auth)/codeverify")}>
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

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import ModalDetails from '@/components/History/ModalDetails'
import { EvilIcons, Octicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router'

export default function DetailsScreen() {
    const navigation = useNavigation();
    const router = useRouter();
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[])
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar />
        <View style={styles.headerStyles}>
            <TouchableOpacity style={styles.headerIcons} onPress={()=>router.back()}>
                <Octicons name="x" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcons}>
                <Octicons name="share" size={20} color="black" />
            </TouchableOpacity>
        </View>
        <View>
            <ModalDetails />
        </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:20,
        backgroundColor:'#f2f4f7',
    },
    headerStyles:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20,
    },
    headerIcons:{
        width:40,height:40,
        backgroundColor:'#e4e4e4',
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
    },
})
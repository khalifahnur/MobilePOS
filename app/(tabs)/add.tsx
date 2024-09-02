import {Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddContainer from '@/components/Add/AddContainer'
import { StatusBar } from 'expo-status-bar'
import { ThemedView } from '@/components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign';
import ManageProduct from '@/components/Add/ManageProduct'
import { Ionicons } from '@expo/vector-icons'
import HeaderComponent from '@/components/Add/HeaderComponent'
import { useRouter } from 'expo-router'

type AddScreenProps = {
  onClose: () => void;
};

export default function AddScreen({onClose}:AddScreenProps) {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='black' />
      <ThemedView
        style={styles.container}
        lightColor="#F2F4F7"
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.HeaderTxt}>Manage Products</Text>
          </View>
          <Pressable style={styles.headerBtn} onPress={()=>router.push('screens/addSection')}>
            <Ionicons name="add-sharp" size={20} color="#fff" />
            <Text style={{color:'#fff'}}>Add New Product</Text>
          </Pressable>
        </View>
        <HeaderComponent />
        {/* <AddContainer /> */}
        <ManageProduct />

      </ThemedView>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
  },
  header:{
    paddingHorizontal:20,
    marginTop:10,
    marginBottom:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  HeaderTxt:{
    fontSize:18,
    fontWeight:'600',
  },
  headerBtn:{
    padding:10,
    backgroundColor:"#4d81f1",
    flexDirection:'row',
    alignItems:'center',
    borderRadius:8,
  }
})
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import ModalDetails from '@/components/History/ModalDetails'
import { EvilIcons, Octicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from 'expo-router'

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';



// Usage
const Data = {
  _id: "66d9da1f041de7af12855c0b",
  restaurantId: "Beirut",
  totalCost: 490,
  createdAt: "2024-09-05T16:19:43.900Z",
  items: [
    { name: "Wacky Wednesday", cost: 490 }
  ]
};


export default function DetailsScreen() {
    const navigation = useNavigation();
    const router = useRouter();
    const params = useLocalSearchParams();
    const data = params.data;

    const shareReceipt = async (data) => {
        // Create a text file with receipt details
        const fileUri = `${FileSystem.documentDirectory}receipt.txt`;
      
        // Content of the receipt or data
        const receiptContent = `
        Receipt ID: ${data._id}
      Restaurant: ${data.restaurantId}
      Total Cost: ${data.totalCost}
      Items: ${data.items.map(item => `${item.name} - $${item.cost}`).join('\n')}
      Date: ${new Date(data.createdAt).toLocaleString()}`;
      
        // Write the content to the file
        await FileSystem.writeAsStringAsync(fileUri, receiptContent);
      
        // Check if sharing is available and share the file
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri);
        } else {
          console.log('Sharing is not available on this device.');
        }
      };


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
            <TouchableOpacity style={styles.headerIcons} onPress={()=>shareReceipt(Data)}>
                <Octicons name="share" size={20} color="black" />
            </TouchableOpacity>
        </View>
        <View>
            <ModalDetails FetchData={data} />
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
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputField from '../InputField'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type editModalProps = {
    data:{
        name:string,
        cost:number,
        title:string,
    },
    onClose:()=>void
}
export default function EditModal({data,onClose}:editModalProps) {

    const [newNme, setNewNme] = useState<string>('');
    const [newPrce, setNewPrce] = useState<number | string>('');
    const [restaurantId, setrestaurantId] = useState();


    //console.log(data);

    const handleUpdateItem = async (restaurantId, title, oldName, oldCost, newName, newCost) => {
        try {
          const response = await axios.put("http://192.168.100.200:3002/api/menu/updateItem", {
            restaurantId,
            title,
            oldName,
            oldCost,
            newName,
            newCost,
          });
      
          console.log("Item updated:", response.data);
        } catch (error:any) {
          console.error("Error updating item:", error.response ? error.response.data : error.message);
        }
      };

      const HandleCancelBtn = ()=>{
        onClose();
        setNewNme('');
        setNewPrce('');
      }

      useEffect(() => {
        const FetchData = async () => {
          const userRawObj = await AsyncStorage.getItem("User");
          if (userRawObj) {
            const userObj = JSON.parse(userRawObj);
            setrestaurantId(userObj.restaurantId);
          }
        };
        FetchData();
      }, []);

  return (
    <View style={styles.container}>
    <View>
      <InputField labelTxt='New Name :' type='text' onChangeText={(txt)=>setNewNme(txt)}/>
      <InputField labelTxt='New Price :' type='number' onChangeText={(num)=>setNewPrce(num)}/>
    </View>
    <View style={styles.btn}>
    <Pressable style={[styles.btns,{backgroundColor: "#00932c",}]} onPress={HandleCancelBtn}>
        <Text style={styles.buttonText}>Cancel</Text>
    </Pressable>
    <Pressable style={[styles.btns,{backgroundColor:'#4d81f1'}]}>
        <Text style={styles.buttonText}>Change</Text>
    </Pressable>
    </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20,
        marginTop:20,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    btn:{
        
        marginTop:20,
    },
    btns:{
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "500",
    },
})
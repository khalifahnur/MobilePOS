import {ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddContainer from '@/components/Add/AddContainer'
import { StatusBar } from 'expo-status-bar'
import { ThemedView } from '@/components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign';
import ManageProduct from '@/components/Add/ManageProduct'
import { Ionicons } from '@expo/vector-icons'
import HeaderComponent from '@/components/Add/HeaderComponent'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

type AddScreenProps = {
  onClose: () => void;
};

export default function AddScreen({onClose}:AddScreenProps) {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurantName, setRestaurantName] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurantNameAndData = async () => {
      try {
        const userRawObj = await AsyncStorage.getItem("User");
        if (userRawObj) {
          const userObj = JSON.parse(userRawObj);
          if (userObj?.restaurantId) {
            setRestaurantName(userObj.restaurantId);
            const response = await axios.get("http://192.168.100.198:3002/api/data/fetchMenu", {
              params: { restaurantId: userObj.restaurantId },
            });
            setData(response.data);
          } else {
            setError("Restaurant ID is missing");
          }
        } else {
          setError("User data not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantNameAndData();
  }, [data]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }


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
        <ManageProduct fetchedData={data}/>

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
    fontWeight:'400',
  },
  headerBtn:{
    padding:10,
    backgroundColor:"#4d81f1",
    flexDirection:'row',
    alignItems:'center',
    borderRadius:8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#f2f4f7'
  },
})
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputField from '@/components/InputField'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface UserProp {
  email: string;
  name: string;
  phoneNumber: string;
  restaurantId: string | null;
  user: string; // This is the userId
}

export default function RestaurantScreen() {
  const [restaurantTxt,setRestaurantTxt] = useState<String>('');
  const [Loading,setLoading] = useState<boolean>(false);
  const [user,setUser] = useState<UserProp>({});

  const router = useRouter();
  const userId = user.user;

  const HandleRestaurantName = async () => {
    setLoading(true)
    const restaurantId = restaurantTxt;
    try {
      const response = await axios.post(`http://192.168.100.198:3002/api/auth/${userId}/updateRestaurantDetails`,{restaurantId});

      const { restaurantName } = response.data;
      await AsyncStorage.setItem("RestaurantName", JSON.stringify(restaurantName));
  
      setLoading(false);

        setTimeout(() => {
          router.replace("/(tabs)/");
        }, 2000);
      
    } catch (error) {
      console.error('Error updating restaurant details:', error);
    }
  };

  useEffect(() => {
    const FetchData = async () => {
      const userRawObj = await AsyncStorage.getItem("User");
      console.log(userRawObj)
      if (userRawObj) {
        const userObj = JSON.parse(userRawObj);
        setUser(userObj);
      }
    };
    FetchData();
  }, []);
  
  console.log("restaurantOBj",user.user);

  return (
    <SafeAreaView style={styles.container}>
      
      <View>
        <InputField labelTxt='Restaurant Name :' type='text' onChangeText={(txt)=>setRestaurantTxt(txt)} />
      </View>
      <Pressable style={styles.btn} onPress={HandleRestaurantName}>
          {Loading && <ActivityIndicator size="small" color="white" />}
          <Text style={styles.btnText}>Continue</Text>
        </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
    justifyContent:"center",
    alignItems:'center'
  },
  btnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  btn: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "navy",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
})
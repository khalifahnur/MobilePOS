import { View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import SubContainer from "@/components/History/SubContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";

export default function HistoryScreen() {
  const [restaurantId, setrestaurantId] = useState();
  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const localhost = Constants.expoConfig?.extra?.localhost;

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

  useEffect(() => {
    const FetchSales = async () => {
      try {
        const response = await axios.get(
          `http://${localhost}:3002/api/sales/fetchSales`, 
          { params: { restaurantId } }
        );
        if (response.status === 200) {
          const resData = JSON.stringify(response.data)
          setData(resData);
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    if (restaurantId) {
      FetchSales();
    }
  
  }, [restaurantId,data]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} backgroundColor="#F2F4F7" style="dark" />
      <ThemedView
        style={[
          styles.container,
          { borderTopWidth: 2, borderTopColor: "#E8E8E8", marginBottom: 65 },
        ]}
        lightColor="#F2F4F7"
      >
        <SubContainer
          FetchedData = {data}
        />
      </ThemedView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#f2f4f7'
  },
});

import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import SubContainer from "@/components/Home/SubContainer";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
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
            const response = await axios.get("http://192.168.100.203:3002/api/data/fetchMenu", {
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

  //console.log(data)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} backgroundColor="#F2F4F7" style="dark" />
      <ThemedView
        style={[styles.container, { borderTopWidth: 2, borderTopColor: "#E8E8E8", marginBottom: 65 }]}
        lightColor="#F2F4F7"
      >
        <SubContainer extractedData={data} />
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
  },
});

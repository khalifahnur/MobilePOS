import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";


export default function FilterScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const filteredData = params;
  console.log("filtered screen",filteredData)
  

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Filter</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => router.back()}
            >
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
         
      </ScrollView>
    <FlatList
  data={filteredData}
  renderItem={({ item, index }) => {
    const createdAtDate = new Date(item?.createdAt);
    return (
      <>
        <View key={item?._id} style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity
          //onPress={()=>HandleModalDetails(item)}
            style={[
              styles.Content,
              {
                backgroundColor: index % 2 === 0 ? "#cce9d5" : "#ffff",
                borderRadius: 8,
              },
            ]}
          >
            {/* Check if data is valid */}
            <Text style={styles.ContentText}># {item?._id.slice(-4,-1)} </Text>
            <Text style={styles.ContentText}>
              {/* Ensure valid date */}
              {isNaN(createdAtDate.getTime())
                ? "Invalid Date"
                : createdAtDate.toLocaleString()}
            </Text>
            <Text style={styles.ContentText}>{item?.totalCost}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Divider} />
      </>
    );
  }}

  
  showsVerticalScrollIndicator={false}
/>
      
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    marginTop: 25,
  },
  mainContainer: {
    backgroundColor: "#f2f4f7",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
    fontWeight: "600",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#eeee",
    padding: 10,
    borderRadius: 20,
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  timeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  timeButtonSelected: {
    backgroundColor: "#d0d0d0",
  },
  selectedText: {
    fontWeight: "bold",
    color: "#000",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  footerButton: {
    flex: 1,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 8,
  },
  footerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  Content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  ContentText: {
    textAlign: "center",
    padding: 5,
    fontSize: 15,
  },
  Divider: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d4d4d4",
    marginTop: 10,
    marginBottom: 10,
  },
});

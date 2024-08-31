import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState,} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AccountScreen() {
  const [userData,setUserData] = useState({});
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [initials, setInitials] = useState("");
  const [initials2, setInitials2] = useState("");
  const [email, setEmail] = useState("khalifah@gmail.com");
  const [loading, setLoading] = useState<boolean>(true);

  const [updatedName, setDisplayName] = useState("");

  const navigation = useNavigation();

  const router = useRouter();

  useEffect(() => {
    const FetchData = async () => {
      const userRawObj = await AsyncStorage.getItem("User");
      console.log(userRawObj)
      if (userRawObj) {
        const userObj = JSON.parse(userRawObj);
        setUserData(userObj);
      }
    };
    FetchData();
  }, []);


  useEffect(() => {
    if (userData && userData.name) {
      const fullName = userData.name;
      const Name = fullName.split(" ");
      setFirstName(Name[0]);
      setSecondName(Name[1]);
      const i = firstName.slice(0, 1).toUpperCase();
      const s = secondName.slice(0, 1).toUpperCase();
      setInitials(i);
      setInitials2(s);
      setEmail(userData.email);
    } else {
      console.log("error");
    }
    
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{ padding: 20, backgroundColor: "#d5dae0", borderRadius: 30 }}
        >
          <Ionicons name="arrow-back-sharp" size={20} color="#000" />
        </Pressable>
        <View
          style={{
            padding: 20,
            backgroundColor: "#fff",
            borderRadius: 30,
            borderColor: "#4d81f1",
            borderWidth: 2,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "500", color: "#4d81f1" }}>
            {firstName.slice(0, 1).toUpperCase()}
            {secondName.slice(0, 1).toUpperCase()}
          </Text>
        </View>
      </View>
      {/* {
        Object.keys(userObj).length === 0 ? (
          <View>
            <Text>No data</Text>
          </View>
        ) : (
          <View>
            <Text>there is data</Text>
          </View>
        )
        // Use a conditional rendering or loading indicator if necessary
      } */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ color: "#4d81f1", fontSize: 20 }}>ACCOUNT DETAILS</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 14, marginBottom: 10, fontWeight: "500" }}>
          Your mobile number
        </Text>
        <TouchableOpacity
          style={{
            padding: 17,
            backgroundColor: "#e4e4e4",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>{userData.phoneNumber}</Text>
          <Text style={{ color: "#84d76b" }}>Change</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 14, marginBottom: 10, fontWeight: "500" }}>
          Personal Details
        </Text>
        <View>
          <TouchableOpacity
            style={{
              padding: 13,
              backgroundColor: "#e4e4e4",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 14, color: "gray" }}>First Name</Text>
            <Text style={{ fontSize: 16, color: "#000", fontWeight: "500" }}>
              {firstName}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              padding: 13,
              backgroundColor: "#e4e4e4",
              flexDirection: "column",
              justifyContent: "space-between",
              marginTop: 13,
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 14, color: "gray" }}>Last Name</Text>
            <Text style={{ fontSize: 16, color: "#000", fontWeight: "500" }}>
              {secondName}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              padding: 13,
              backgroundColor: "#e4e4e4",
              flexDirection: "column",
              justifyContent: "space-between",
              marginTop: 13,
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 14, color: "gray" }}>Email Address</Text>
            <Text style={{ fontSize: 16, color: "#000", fontWeight: "500" }}>
              {email}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

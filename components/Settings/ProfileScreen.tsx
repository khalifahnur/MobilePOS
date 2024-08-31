import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const [changedTheme, setChangedTheme] = useState(false);
  const Theme = useColorScheme();
  const router = useRouter()
  const navigation = useNavigation();
  const window = useWindowDimensions();
  const MAX_WIDTH = window.width;
  const HEADER_HEIGHT = window.height * 0.18;

  const [loading, setLoading] = useState(false);
  const [userData,setUserData] = useState({});


  const LogOutHandler = async () => {
    setLoading(true);
  
    try {
      await AsyncStorage.removeItem('AuthToken');
      await AsyncStorage.removeItem('User');
      router.push('/(auth)/signin');

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.log('Error logging out:', error);
    }
  };

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


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <>

      <ScrollView>
        <View style={styles.container}>
          <View style={{alignItems:"center",padding:10,}}>
            <Text style={{textAlign:'center',fontSize:18,fontWeight:'500'}}>Settings</Text>
          </View>
          <Pressable style={styles.UserChange} onPress={()=>router.push("/screens/account")}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/userImageAvatar.png")}
                style={{ width: 50, height: 50, borderRadius: 30 }}
              />
              <View style={{ marginRight: "auto", marginLeft: 30 }}>
                <Text
                  style={{ color: "#fff", fontWeight: "500", fontSize: 15 }}
                >
                  {userData?.name}
                </Text>
                <Text style={{ color: "#fff", fontSize: 13 }}>
                  {userData?.email}
                </Text>
              </View>
              <View>
                <EvilIcons name="pencil" size={20} color="#fff" />
              </View>
            </View>
          </Pressable>

          {/* notifications */}
          <TouchableOpacity style={styles.details}>
            <View style={styles.detail}>
              <Ionicons name="notifications" size={24} color="black" />
              <Text style={{ marginRight: "auto", marginLeft: 30 }}>
                Notifications
              </Text>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
          {/* dark mode */}
          <TouchableOpacity style={styles.details}>
            <View style={styles.detail}>
              <MaterialCommunityIcons
                name="theme-light-dark"
                size={24}
                color="black"
              />
              <Text style={{ marginRight: "auto", marginLeft: 30 }}>
                Dark Mode
              </Text>
              <FontAwesome
                name={changedTheme ? "toggle-on" : "toggle-off"}
                size={24}
                color="black"
              />
              {/* <FontAwesome name="toggle-off" size={24} color="black" /> */}
            </View>
          </TouchableOpacity>

          {/* share app */}
          <TouchableOpacity style={styles.details}>
            <View style={styles.detail}>
              <Entypo name="share" size={24} color="black" />
              <Text style={{ marginRight: "auto", marginLeft: 30 }}>
                Share App
              </Text>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
          {/* rate us */}
          <TouchableOpacity style={styles.details}>
            <View style={styles.detail}>
              <MaterialIcons name="star-rate" size={24} color="black" />
              <Text style={{ marginRight: "auto", marginLeft: 30 }}>
                Rate Us
              </Text>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
          {/* Help and Support */}
          <TouchableOpacity
            style={styles.details}
            //onPress={() => navigation.navigate("HelpScreen")}
          >
            <View style={styles.detail}>
              <MaterialIcons name="contact-support" size={24} color="black" />
              <Text style={{ marginRight: "auto", marginLeft: 30 }}>
                Help and Support
              </Text>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
          {/* About */}
          <TouchableOpacity
            style={styles.details}
            //onPress={() => navigation.navigate("InfoScreen")}
          >
            <View style={styles.detail}>
              <MaterialIcons name="language" size={24} color="black" />
              <Text style={{ marginRight: "auto", marginLeft: 30 }}>About</Text>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
          {/* log out */}
          <TouchableOpacity style={styles.details} 
          onPress={LogOutHandler}
          >
            <View style={styles.detail}>
              <MaterialIcons name="logout" size={24} color="black" />
              <Text style={{ marginRight: "auto", marginLeft: 30 }}>
                Log Out
              </Text>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View
        style={{
          justifyContent: "center",
          backgroundColor: "#ecf0f1",
        }}
      >
        <Spinner
          visible={loading}
          textContent={"Logout..."}
          textStyle={{ color: "#FFF" }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#f2f4f7",
    flex: 1,
  },
  UserChange: {
    marginTop: 10,
    backgroundColor: "#4d81f1",
    padding: 10,
    borderRadius: 10,
  },
  details: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderColor: "#e8e8e8",
    borderWidth: 2,
    borderRadius: 10,
  },
  detail: {
    flexDirection: "row",
  },
  svgCurve: {
    width: "100%",
  },
});

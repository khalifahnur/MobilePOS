import {
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
  LayoutChangeEvent,
  StyleProp
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RestaurantNameType = {
  restaurantId: string;
};

type HeaderProps={
  onLayoutHeader:(event: LayoutChangeEvent) => void,
  customHeaderStyle:{
    header: number;
    stickyHeader: number;
},
restaurantName:string,

}

export default function Header({ onLayoutHeader, customHeaderStyle, restaurantName }:HeaderProps) {
  //console.log(onLayoutHeader,customHeaderStyle)
  const route = useRouter();
  const [restaurantID, setRestaurantID] = useState();

  const HandleCartNavigate = () => {
    route.navigate("/screens/cart");
  };

  const cart = useSelector((item: RootState) => item.cart.cart);

  useEffect(() => {
    const FetchData = async () => {
      const userRawObj = await AsyncStorage.getItem("User");
      if (userRawObj) {
        const userObj = JSON.parse(userRawObj);
        setRestaurantID(userObj.restaurantId);
      }
    };
    FetchData();
  }, []);

  return (
    <Animated.View
      onLayout={onLayoutHeader}
      style={{ marginBottom: customHeaderStyle }}
    >
      <View style={styles.header}>
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontFamily: "PlusJakartaSansMedium",
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            {/* Restaurant name*/}
            {restaurantName ? restaurantName : restaurantID}
          </Text>
          <Text
            style={{
              fontFamily: "PlusJakartaSansRegular",
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            Halal
          </Text>
        </View>
        <Pressable onPress={HandleCartNavigate} style={styles.button}>
      {cart?.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cart.length}</Text>
        </View>
      )}
      <AntDesign name="shoppingcart" size={20} color="black" />
    </Pressable>
      </View>
      <View style={{ paddingHorizontal: 20, marginBottom: 25 }}>
        <View style={styles.imageHeader}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              alignItems: "center",
              height: 95,
            }}
          >
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "PlusJakartaSansMedium",
                  fontSize: 15,
                  fontWeight: "500",
                  color: "#fff",
                }}
              >
                Fast Food
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSansMedium",
                  fontSize: 15,
                  fontWeight: "500",
                  color: "#fff",
                }}
              >
                Best Offer
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSansRegular",
                  fontSize: 13,
                  fontWeight: "400",
                  color: "#fff",
                }}
              >
                Discount up to 70%
              </Text>
            </View>
            <View style={{ width: 80, height: 80, alignItems: "center" }}>
              <Image
                source={require("../../assets/images/headerImage.jpeg")}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  imageHeader: {
    marginTop: 10,
    backgroundColor: "#4d81f1",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#4d81f1",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10,
    position: "relative",
  },
  badge: {
    position: "absolute",
    height:20,
    width:20,
    backgroundColor: "red",
    top: -10,
    right: 0,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff", 
    fontSize: 12,
    textAlign:"center"
  },
});

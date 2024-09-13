import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { StatusBar } from "expo-status-bar";
import DetailsTabs from "@/components/DetailsTabs";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/CartSlice";
import Toast from "react-native-toast-message";

type ProductData = {
  cost: number;
  id: string;
  name: string;
  quantity: string;
  image: string;
};

export default function ProductScreen() {
  const [selectedValue, setSelectedValue] = useState<string>("Reviews");
  const [cost, setCost] = useState<number>(1);
  const [data, setData] = useState<ProductData | null>(null);

  const router = useRouter();

  const params = useLocalSearchParams();
  const imageUri = Array.isArray(params.image) ? params.image[0] : params.image;

  console.log(imageUri)
  const price = params?.cost;

  const HandleAdd = () => {
    setCost(cost + 1);
  };

  const HandleSub = () => {
    if (cost > 1) {
      setCost(cost - 1);
    } else {
      setCost(1);
    }
  };

  const dispatch = useDispatch();

  const HandleAddToCart = () => {
    if (params) {
      dispatch(
        addToCart({
          id: params?.id,
          name: params?.name,
          image: params?.image,
          cost: price * cost,
          quantity: cost,
        })
      );

      Toast.show({
        type: "success",
        text1: "Item Added to Cart",
        text2: `${params?.name} has been added to your cart.`,
      });

      setTimeout(() => {
        router.back();
      }, 3000);
    }
  };

  return (
    <>
      <View style={styles.overlay}>
        <StatusBar />
        <View style={styles.upperContainer}>
          <View style={styles.header}>
            <Pressable style={styles.iconButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" size={20} color="black" />
            </Pressable>
            <Pressable style={styles.iconButton}>
              <Entypo name="dots-three-vertical" size={20} color="black" />
            </Pressable>
          </View>
          <View>
          {imageUri ? (
        <Image
          source={imageUri}
          style={styles.image}
        />
      ) : (
        <Text>No image available</Text>
      )}
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.productDetails}>
            <View>
              <Text style={styles.productName}>{params?.name}</Text>
              <Text style={styles.productCategory}>Burger</Text>
            </View>
            <Text style={styles.productPrice}>Ksh. {price * cost}.00</Text>
          </View>
          <DetailsTabs
            selectedTab={selectedValue}
            setSelectedTab={setSelectedValue}
            tabsName={["Reviews", "Ratings"]}
          >
            {selectedValue === "Reviews" ? (
              <Text>
                A hamburger is a sandwich with a beef patty, served between two
                soft buns, and topped with various condiments such as cheese,
                lettuce, and ketchup. It's a popular...{" "}
                <Text style={styles.seeMore}>See more.</Text>
              </Text>
            ) : (
              <Text>5 star ratings</Text>
            )}
          </DetailsTabs>
        </View>
      </View>

      {/* bottom container */}
      <View style={styles.cartContainer}>
        <View style={styles.quantityContainer}>
          <Pressable
            style={[
              styles.quantityButton,
              { backgroundColor: cost > 1 ? "#cce9d5" : "#fff" },
            ]}
            onPress={HandleSub}
          >
            <AntDesign name="minus" size={24} color={"black"} />
          </Pressable>
          <Text style={styles.quantityText}>{cost}</Text>
          <Pressable style={styles.quantityButton} onPress={HandleAdd}>
            <Ionicons name="add-outline" size={24} color="black" />
          </Pressable>
        </View>
        <Pressable style={styles.addToCartButton} onPress={HandleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#F2F4F7",
  },
  upperContainer: {
    backgroundColor: "#4d81f1",
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    paddingBottom: 20,
    flex: 0.6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  iconButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
  },
  imageContainer: {
    position: "absolute",
    bottom: -40,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 70,
    flex: 0.4,
  },
  productDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  productName: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  productCategory: {
    fontSize: 14,
    color: "#666",
  },
  productPrice: {
    fontSize: 17,
    fontWeight: "400",
    color: "red",
    textAlign: "center",
  },
  seeMore: {
    color: "red",
  },
  cartContainer: {
    backgroundColor: "#F2F4F7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
  },
  quantityButton: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#cce9d5",
    borderRadius: 20,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: "500",
    marginHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: "#4d81f1",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
});

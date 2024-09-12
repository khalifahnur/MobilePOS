import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/Store";
import CheckoutModal from "@/components/Checkout/CheckoutModal";
import ModalLoader from "@/components/ModalLoader";
import PaymentModal from "@/components/Checkout/PaymentModal";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { emptyCart } from "@/redux/CartSlice";
import Constants from 'expo-constants';

export default function CheckoutScreen() {
  const [visibleModal, setModalVisible] = useState(false);
  const [activePayment, setActivePayment] = useState<string>(
    "Credit or Debit Card"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [modalPaymentSuccess, setModalPaymentSuccess] =
    useState<boolean>(false);
  const [counter, setCounter] = useState(1);
  const [restaurantId,setrestaurantId] = useState();
  

  const navigation = useNavigation();
  const router = useRouter();

  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  const subTotal = cart.reduce(
    (acc, item) => acc + item.cost * item.quantity,
    0
  );

  const PaymentCost = subTotal;
  const localhost = Constants.expoConfig?.extra?.localhost;

  const HandlePayment = async() => {
    setLoading(true);
    try{
      const response = await axios.post(`http://${localhost}:3002/api/sales/createSales`,{
        restaurantId,
        items:cart,
        totalCost:subTotal
      })
      console.log(response.data)
      

      if(response.status === 200){
        setTimeout(() => {
          dispatch(emptyCart())
          setLoading(false);
          setModalPaymentSuccess(true);
        }, 2000);
      }
    }catch (error) {
      setLoading(false);
      console.error('Error submitting order:', error);
    }
  };


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

  const HandleBtnModal = ()=>{
    setModalPaymentSuccess(false)
   // router.navigate("/(tabs)/")
  }


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        
        <View style={styles.header}>
        <View style={{alignItems:'center'}}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontFamily: "PlusJakartaSansMedium",
          }}
        >
          Checkout
        </Text>
        </View>
          <View style={styles.cartTotalStyle}>
            <View
              style={{
                borderColor: "#999",
                borderWidth: 1,
                borderStyle: "solid",
                marginBottom: 2,
                marginTop: 2,
              }}
            />
            <View style={styles.cartTotal}>
              <Text style={styles.cartTotalTxt}>ITEM</Text>
              <Text style={styles.cartTotalTxt}>QTY</Text>
              <Text style={styles.cartTotalTxt}>AMOUNT</Text>
            </View>
            <View
              style={{
                borderColor: "#999",
                borderWidth: 1,
                borderStyle: "solid",
                marginBottom: 2,
                marginTop: 2,
              }}
            />
            {cart.map((item, index) => (
              <View style={styles.cartTotal} key={item.id}>
                <View style={{ flex: 0.5 }}>
                  <Text style={styles.cartTotalTxt}>{item.name}</Text>
                </View>
                <View style={{ flex: 0.1 }}>
                  <Text style={styles.cartTotalTxt}>{item.quantity}</Text>
                </View>
                <View>
                  <Text style={styles.cartTotalTxt}>Ksh.{item.cost}</Text>
                </View>
              </View>
            ))}
            <View
              style={{
                borderColor: "#999",
                borderWidth: 1,
                borderStyle: "dashed",
                marginBottom: 10,
                marginTop: 10,
              }}
            />
            <View style={styles.cartTotal}>
              <Text style={styles.cartTotalTxt}>Subtotal</Text>
              <Text style={styles.cartTotalTxt}>Ksh.{subTotal}.00</Text>
            </View>
            <View style={styles.cartTotal}>
              <Text style={styles.cartTotalTxt}>VAT</Text>
              <Text style={styles.cartTotalTxt}>ksh.40</Text>
            </View>
            <View style={styles.cartTotal}>
              <Text style={styles.TotalTxt}>Total Cost</Text>
              <Text style={styles.TotalTxt}>Ksh.{subTotal + 40}.00</Text>
            </View>
          </View>

          <View style={styles.paymentBtnModal}>
            <Text
              style={{
                color: "#999",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              PAYMENT METHOD
            </Text>
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <TouchableOpacity
                style={{
                  padding: 15,
                  flexDirection: "row",
                  gap: 20,
                  backgroundColor: "#d5dae0",
                  borderRadius: 10,
                }}
              >
                <AntDesign name="creditcard" size={24} color="black" />
                <Text
                  style={{ color: "#000", fontWeight: "bold", fontSize: 15 }}
                >
                  {activePayment}
                </Text>
              </TouchableOpacity>
              <Pressable
                style={{ marginTop: 8 }}
                onPress={() => setModalVisible(true)}
              >
                <Text style={{ color: "#84d76b" }}>
                  + Show other ways to pay
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.checkoutBtn}>
          <Pressable style={styles.addToCartButton} onPress={HandlePayment}>
            <Text style={styles.addToCartText}>Process Payment</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      {/* Modal */}
      <CheckoutModal
        visibleModal={visibleModal}
        setModalVisible={setModalVisible}
        activePayment={activePayment}
        setActivePayment={setActivePayment}
      />

      {/*loading Modal*/}

      <ModalLoader loading={loading} />

      {/*Pyament Modal */}

      {modalPaymentSuccess && (
        <PaymentModal
          visible={modalPaymentSuccess}
          onClose={HandleBtnModal}
          subTotal={PaymentCost}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
  },
  header: {
    marginTop: 5,
    paddingHorizontal: 20,
  },
  checkoutCard: {
    borderWidth: 2,
    borderColor: "#000",
  },
  cartTotalStyle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: "#fff",
    shadowColor: "#fff",
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 15,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 12,
  },
  cartStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    marginBottom: 10,
  },

  cartTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    textAlign: "justify",
  },
  cartTotalTxt: {
    fontSize: 13,
    fontFamily: "PlusJakartaSansMedium",
    textAlign: "justify",
  },
  TotalTxt: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "justify",
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: "#4d81f1",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  checkoutBtn: {
    position: "absolute",
    flex: 0.5,
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  paymentBtnModal: {
    paddingVertical: 8,
    marginTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f8f8f8",
    shadowColor: "#fff",
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 15,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 12,
  },
});

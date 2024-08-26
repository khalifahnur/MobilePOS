import { StyleSheet, Text, useWindowDimensions, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modals'
import { AntDesign } from '@expo/vector-icons';

type paymentMethodTypes = {
    id: number;
    payment: string;
    icon: string;
  }[];
  
  const paymentMethod: paymentMethodTypes = [
    { id: 1, payment: "Credit or Debit Card", icon: "creditcard" },
    { id: 2, payment: "Mobile Money", icon: "mobile1" },
    { id: 3, payment: "Cash on delivery", icon: "wallet" },
    { id: 4, payment: "Card on delivery", icon: "creditcard" },
  ];

  type CheckoutModalProps = {
    visibleModal: boolean;
    setModalVisible: (visible: boolean) => void;
    activePayment: string;
    setActivePayment: (payment: string) => void;
};

export default function CheckoutModal({visibleModal,setModalVisible,activePayment, setActivePayment}:CheckoutModalProps) {
    // const [activePayment, setActivePayment] = useState<string>(
    //     "Credit or Debit Card"
    //   );

    const window = useWindowDimensions();
    const MAX_WIDTH = window.width;
  return (
    <Modal
        visible={visibleModal}
        backdropColor="#fff"
        hasBackdrop={true}
        backdropOpacity={1}
        backdropTransitionOutTiming={100}
        swipeDirection={"down"}
      >
        <View
          style={{
            backgroundColor: "#f4f4f4",
            paddingHorizontal: 20,
            paddingTop: 10,
          }}
        >
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 22, color: "#1e1e1e", fontWeight: "500" }}>
              PAYMENT
            </Text>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 17, color: "#1e1e1e", fontWeight: "500" }}>
              Choose a Payment Method
            </Text>
          </View>
          {/* PAYMENT */}
          <View
            style={{
              backgroundColor: "#e4e4e4",
              borderRadius: 8,
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
          >
            {paymentMethod.map((item, index) => (
              <>
                <Pressable
                  key={index}
                  style={{ height: 40 }}
                  onPress={() => setActivePayment(item.payment)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 20,
                      alignItems: "center",
                    }}
                  >
                    <AntDesign
                      name={item.icon}
                      size={15}
                      color={activePayment == item.payment ? "#4d81f1" : "#000"}
                    />
                    <Text
                      style={{
                        fontSize: 17,
                        color:
                          activePayment == item.payment ? "#4d81f1" : "#000",
                        fontWeight: "500",
                      }}
                    >
                      {item.payment}
                    </Text>
                    {activePayment == item.payment ? (
                      <View style={{ flex: 1, position: "absolute", right: 0 }}>
                        <AntDesign
                          name="check"
                          size={20}
                          color={
                            activePayment == item.payment ? "#4d81f1" : "#000"
                          }
                        />
                      </View>
                    ) : null}
                  </View>
                </Pressable>

                <View
                  style={{
                    borderColor: "#e8e8e8",
                    borderWidth: 1,
                    marginBottom: 10,
                  }}
                />
              </>
            ))}
          </View>
        </View>

        {/* FOOTER */}
        <View
          style={{
            height: 90,
            backgroundColor: "#f8f8f8",
            shadowOpacity: 0.6,
            elevation: 5,
            shadowColor: "#e0e0e0",
            shadowOffset: { width: 2, height: 2 },
            shadowRadius: 2,
            width: MAX_WIDTH,
          }}
        >
          <View style={{ marginTop: 20 }}>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={{
                width: MAX_WIDTH * 0.9,
                padding: 15,
                backgroundColor: "#4d81f1",
                paddingHorizontal: 20,
                alignSelf: "center",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  color: "#fff",
                }}
              >
                BACK
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({})
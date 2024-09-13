import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Modal from "react-native-modals";
import { AntDesign } from "@expo/vector-icons";

type PaymentModalProps = {
  visible: boolean;
  onClose: () => void;
  subTotal: number;
};

export default function PaymentModal({ visible, onClose, subTotal }: PaymentModalProps) {

  return (
    <Modal visible={visible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        <View>
          <View style={{ alignItems: "center" }}>
            <AntDesign
              name="checkcircleo"
              size={50}
              color="#4CAF50"
              style={styles.icon}
            />
            <Text style={styles.title}>Payment Success!</Text>
            <Text style={styles.changeText}>Ksh.{subTotal}.00</Text>
          </View>

          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>New Order</Text>
          </Pressable>
          <Pressable style={styles.printButton} onPress={handlePrint}>
            <AntDesign name="printer" size={15} color="#fff" />
            <Text style={styles.printText}>Print Receipt</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  icon: {
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "PlusJakartaSansMedium",
  },
  changeText: {
    fontFamily: "PlusJakartaSansMedium",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#4d81f1",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
  printButton: {
    backgroundColor: "#00932c",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  printText: {
    color: "#fff",
    marginLeft: 10,
  },
});

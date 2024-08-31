import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

type PaymentModalProps = {
  visible: boolean;
  onClose: () => void;
  data: {
    date: string;
    refNumber: string;
    itemName: string;
    quantity: number;
    itemCost: number;
    tax: number;
    totalPayment: number;
  };
};

export default function ModalDetails() {
  const [width, setWidth] = useState<number>();
  const {cost,id,itemId,quantity,name,date} = useLocalSearchParams();

  return (
    <View style={styles.container} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      <Header date={date} />
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Ref Number:{itemId} </Text>
      </View>
      <ItemDetails
        itemName={name}
        quantity={quantity}
        itemCost={cost}
        id={id}
      />
      <Separator />
      <PaymentDetails tax={70} totalPayment={cost} />
      <Separator dashed />
    </View>
  );
}

const Header = ({ date }: { date: string | string[] }) => (
  <View style={styles.header}>
    <Image
      source={require("../../assets/images/userImageAvatar.png")}
      style={styles.checkmark}
    />
    <Text style={styles.title}>Beirut Treats</Text>
    <Text>{date}</Text>
  </View>
);

const ItemDetails = ({
  itemName,
  quantity,
  itemCost,
  id,
}: {
  itemName: string;
  quantity: number;
  itemCost: string | string[];
}) => (
  <View style={styles.infoBox}>
    <Text style={{fontWeight:'500',fontSize:14}}>{id}</Text>
    <Text style={[styles.infoText,{textAlign:'justify',width:100,fontWeight:'500'}]}>{itemName}</Text>
    <Text style={{fontWeight:'500',fontSize:14}}>x{quantity}</Text>
    <Text style={{fontWeight:'500',fontSize:14}}>Ksh. {itemCost}.00</Text>
  </View>
);

const PaymentDetails = ({ tax, totalPayment }: { tax: number; totalPayment: string }) => (
  <>
    <View style={styles.row}>
      <Text style={styles.infoText}>Tax</Text>
      <Text>Ksh. {tax.toFixed(2)}</Text>
    </View>
    <View style={[styles.row,{marginTop:5}]}>
      <Text style={styles.totalPayment}>Total Payment:</Text>
      <Text style={styles.totalPayment}>Ksh. {totalPayment}.00</Text>
    </View>
  </>
);

const Separator = ({ dashed }: { dashed?: boolean }) => (
  <View
    style={[
      styles.separator,
      dashed && { borderStyle: "dashed" },
    ]}
  />
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  header: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  checkmark: {
    width: 30,
    height: 30,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoContainer: {
    marginBottom: 10,
  },
  infoBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical:20,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
  },
  totalPayment: {
    fontSize: 17,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  separator: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#1e1e1e",
    marginVertical: 20,
  },
});

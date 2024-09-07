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

export default function ModalDetails({FetchData}) {
  const [width, setWidth] = useState<number>();

 const data = JSON.parse(FetchData);

 const itemId = data?._id.slice(-6,-1);
  const restaurantName = data?.restaurantId;
  const date1 = new Date (data?.createdAt).toLocaleString();
  const foodName = data?.items?.map((item)=>item.name);
  const quantity = data?.items?.map((item)=>item.quantity);
  const price = data?.items?.map((item)=>item.cost);
  const _id = data?.items?.map((item)=>item.id.slice(-4,-1));
  const totalCost = data?.totalCost;

  console.log(restaurantName,foodName,totalCost,date1)
  

  return (
    <View style={styles.container} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      <Header date={date1} title={restaurantName}  />
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Ref Number: # {itemId} </Text>
      </View>
      <ItemDetails
        data={data}
      />
      <Separator />
      <PaymentDetails tax={70} totalPayment={totalCost} />
      <Separator dashed />
    </View>
  );
}

const Header = ({ date,title }) => (
  <View style={styles.header}>
    <Image
      source={require("../../assets/images/userImageAvatar.png")}
      style={styles.checkmark}
    />
    <Text style={styles.title}>{title}</Text>
    <Text>{date}</Text>
  </View>
);

const ItemDetails = ({
  data
}) => (
  
    data?.items?.map((item,index)=>(
  <View style={styles.infoBox} key={index}>
    <View>
      <Text style={{fontWeight:'500',fontSize:14}}>#{item.id.slice(-5,-1)}</Text>
    </View>
      <View style={{flexDirection:'column',justifyContent:'center'}}>
        <Text style={[styles.infoText,{textAlign:'justify',width:100,fontWeight:'500'}]}>{item.name}</Text>
      </View>
      
      <View>
        <Text style={{fontWeight:'500',fontSize:14}}>x{item.quantity}</Text>
      </View>
      <View>
        <Text style={{fontWeight:'500',fontSize:14}}>Ksh. {item.cost}.00</Text>
      </View>
    </View>
    ))
  
  
);

const PaymentDetails = ({ tax, totalPayment }: { tax: number; totalPayment: string }) => (
  <>
    
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

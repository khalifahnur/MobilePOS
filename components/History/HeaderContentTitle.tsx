import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import React from "react";


type headerContentProps = {
    HeaderContentLayout:(event:LayoutChangeEvent)=>void;
}

export default function HeaderContentTitle({HeaderContentLayout}:headerContentProps) {
  return (

      <View style={styles.HeaderTitle} onLayout={HeaderContentLayout} >
        <Text style={styles.HeaderText}>Order ID</Text>
        <Text style={styles.HeaderText}>Date</Text>
        <Text style={styles.HeaderText}>Total</Text>
      </View>

    //   <View style={styles.Divider}
  );
}

const styles = StyleSheet.create({
  HeaderTitle: {
    flex:1,
    backgroundColor:'#F2F4F7',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom:20,
    padding:18,
  },
  HeaderText: {
    fontSize: 17,
    fontWeight: "500",
  },
});

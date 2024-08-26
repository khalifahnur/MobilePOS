import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import React from "react";

type headerTitleProps={
    HeaderTitleLayout:(event:LayoutChangeEvent)=>void;
}
export default function HeaderTitle({HeaderTitleLayout}:headerTitleProps) {
  return (
    <View onLayout={HeaderTitleLayout} style={{ padding: 10, flex:1 }}>
      <Text style={{ fontSize: 18, fontWeight: "400", textAlign: "center" }}>
        Order History
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({

});

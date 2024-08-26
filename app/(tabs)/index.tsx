import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import SubContainer from "@/components/Home/SubContainer";

export default function HomeScreen() {
  return (
    <SafeAreaView style={style.container}>
      <StatusBar hidden={false} backgroundColor="#F2F4F7" style="dark" />
      <ThemedView
        style={[style.container, {borderTopWidth:2,borderTopColor:'#E8E8E8',marginBottom:65}]}
        lightColor="#F2F4F7"
      >
        <SubContainer />
      </ThemedView>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
    
  },
});

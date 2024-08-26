import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ThemedView } from '@/components/ThemedView';
import ProfileScreen from '@/components/Settings/ProfileScreen';


export default function SettingsScreen() {
  return (
    <SafeAreaView style={style.container}>
      <StatusBar hidden={false} backgroundColor="#F2F4F7" style="dark" />
      <ThemedView
        style={[style.container, {borderTopWidth:2,borderTopColor:'#E8E8E8',marginBottom:65}]}
        lightColor="#F2F4F7"
      >
        <ProfileScreen />
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
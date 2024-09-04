import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import AddContainer from '@/components/Add/AddContainer'
import { useNavigation } from '@react-navigation/native'

export default function AddSectionScreen() {
  const navigation = useNavigation();

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerShown:false
    })

  })
  return (
    <View style={styles.container}>
      <AddContainer />
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
  },
})
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
    <AddContainer />
  )
}

const styles = StyleSheet.create({})
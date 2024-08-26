import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

export default function SearchInp({HandlePress}:any) {
  return (
    <View style={{padding:5,borderWidth:2,borderColor:'#e8e8e8',borderRadius:8,backgroundColor:'#fff'}}>
      <Pressable style={{padding:5}} onPress={HandlePress}>
        <Text>Search ...</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({})
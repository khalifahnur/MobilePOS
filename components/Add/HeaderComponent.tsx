import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HeaderComponent() {
    const HeaderTitle = ["Name","Price","Action"];
  return (
    <View style={styles.header}>
      {
        HeaderTitle.map((title)=>(
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
    header:{
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#00932c'
    },
    title:{
        fontSize:16,
        fontWeight:'500',
        color:'#ffff'
    },
    
})
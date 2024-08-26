import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type modalLoaderProps ={
    loading:boolean;
}
export default function ModalLoader({loading}:modalLoaderProps) {
  return (
        <Modal
        animationType='fade'
        transparent={true}
        visible={loading}
        statusBarTranslucent={true}
        >
            <View style={styles.centerView}>
                <View style={styles.modalView}>
                    <ActivityIndicator size={'large'} color={"#999"}/>
                </View>
            </View>

        </Modal>
  )
}

const styles = StyleSheet.create({
    centerView:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:'#0008'
    },
    modalView:{
        margin:20,
        width:200,
        height:70,
        backgroundColor:'#fff',
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:.25,
        shadowRadius:4,
        elevation:5
    },
})
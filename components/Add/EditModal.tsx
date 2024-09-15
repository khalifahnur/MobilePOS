import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';

type editModalProps = {
  data: {
    name: string;
    cost: number;
    title: string;
  };
  onClose: () => void;
};
export default function EditModal({ data, onClose }: editModalProps) {
  const [newNme, setNewNme] = useState<string>("");
  const [newPrce, setNewPrce] = useState<number | string>("");
  const [restaurantId, setrestaurantId] = useState();

  const localhost = Constants.expoConfig?.extra?.localhost;

  //console.log(data);

  const HandleUpdateItem = async () => {
    const title = data?.title;
    const oldName = data?.name;
    const oldCost = data?.cost * 100;
    const newName = newNme;
    const newCost = newPrce;
    console.log(title,restaurantId,oldName,newCost)

    if (restaurantId && title && oldName && oldCost && newName && newCost) {
      try {
        const response = await axios.put(
          `http://${localhost}:3002/api/menu/update`,
          {
            restaurantId,
            title,
            oldName,
            oldCost,
            newName,
            newCost,
          }
        );

        if(response.status === 200){
            Alert.alert("Item updated:")
            onClose();
        }else if(response.status === 404){
            Alert.alert("No matching item found")
        }else{
            Alert.alert("Something else occured")
        }
      } catch (error: any) {
        console.error(
          "Error updating item:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const HandleCancelBtn = () => {
    onClose();
    setNewNme("");
    setNewPrce("");
  };

  useEffect(() => {
    const FetchData = async () => {
      const userRawObj = await AsyncStorage.getItem("User");
      if (userRawObj) {
        const userObj = JSON.parse(userRawObj);
        setrestaurantId(userObj.restaurantId);
      }
    };
    FetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <InputField
          labelTxt="New Name :"
          type="text"
          onChangeText={(txt) => setNewNme(txt)}
        />
        <InputField
          labelTxt="New Price :"
          type="number"
          onChangeText={(num) => setNewPrce(num)}
        />
      </View>
      <View style={styles.btn}>
        <Pressable
          style={[styles.btns, { backgroundColor: "#00932c" }]}
          onPress={HandleCancelBtn}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable style={[styles.btns, { backgroundColor: "#4d81f1" }]} onPress={HandleUpdateItem}>
          <Text style={styles.buttonText}>Change</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    marginTop: 20,
  },
  btns: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
});

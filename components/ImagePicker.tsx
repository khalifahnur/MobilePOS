import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from '@expo/vector-icons/AntDesign';

const MyComponent = () => {
  const [image, setImage] = useState<string | null>(null);
  const [statusMedia, requestPermissionMedia] =
    ImagePicker.useMediaLibraryPermissions();
  const [statusCamera, requestPermissionCamera] =
    ImagePicker.useCameraPermissions();

    console.log(image)

  const pickImage = async () => {
    Alert.alert("Select Source", "Choose an option to select the image", [
      { text: "Camera", onPress: () => openCamera() },
      { text: "Gallery", onPress: () => openGallery() },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const openCamera = async () => {
    if (!statusCamera?.granted) {
      const permission = await requestPermissionCamera();
      if (!permission.granted) {
        console.log("Permission to access camera was denied");
        return;
      }
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (e) {
      console.log("Error occurred", e);
    }
  };

  const openGallery = async () => {
    if (!statusMedia?.granted) {
      const permission = await requestPermissionMedia();
      if (!permission.granted) {
        console.log("Permission to access media library was denied");
        return;
      }
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (e) {
      console.log("Error occurred", e);
    }
  };

  const HandleImageRemove = () =>{
    setImage(null)
  }

  return (
    <View>
      <Pressable style={styles.btn} onPress={pickImage}>
        <Text style={{ color: "#444" }}>Choose Image</Text>
        <FontAwesome name="image" size={24} color="#444" />
      </Pressable>
      {image && (
        <View style={{position:'relative'}}>
        <Pressable onPress={HandleImageRemove} style={{position:'absolute',top:-13,left:85,zIndex:999}}>
          <AntDesign name="closecircleo" size={28} color="red" />
          </Pressable>
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
          </View>
      )}
    </View>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#d5dae0",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});

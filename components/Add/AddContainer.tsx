import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Alert,
  Image,
} from "react-native";
import AnimatedInput from "../AnimatedInput";
import AmountInput from "../AmountInput";
import ImagePickerExample from "../ImagePicker";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function AddContainer() {
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const [image, setImage] = useState<string | null>(null);

  const [statusMedia, requestPermissionMedia] =
    ImagePicker.useMediaLibraryPermissions();
  const [statusCamera, requestPermissionCamera] =
    ImagePicker.useCameraPermissions();

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

  const HandleImageRemove = () => {
    setImage(null);
  };
  
  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
  }

  console.log(typeof(amount))

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ marginTop: 2, alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontSize: 20 }}>Add To Menu</Text>
      </View>
      <View style={{ flexDirection: "column" }}>
        <View style={styles.row}>
          <View style={styles.inputWrapper}>
            <AnimatedInput
              value={category}
              onChange={setCategory}
              placeholder="Category"
            />
          </View>
          <View style={styles.inputWrapper}>
            <AnimatedInput
              value={title}
              onChange={setTitle}
              placeholder="Title"
            />
          </View>
        </View>
        <AnimatedInput
          value={desc}
          onChange={setDesc}
          placeholder="Description"
          multiline
          numberOfLines={4}
        />
        {/* insert Image */}
        <View style={styles.AddImage}>
          <Pressable style={styles.btn} onPress={pickImage}>
            <Text style={{ color: "#444" }}>Choose Image</Text>
            <FontAwesome name="image" size={24} color="#444" />
          </Pressable>
          {image && (
            <View style={{ position: "relative" }}>
              <Pressable
                onPress={HandleImageRemove}
                style={{
                  position: "absolute",
                  top: -13,
                  left: 85,
                  zIndex: 999,
                }}
              >
                <AntDesign name="closecircleo" size={28} color="red" />
              </Pressable>
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100 }}
              />
            </View>
          )}
        </View>
      </View>

      {/* insert Cost */}

      <View style={[styles.row, { marginTop: 10 }]}>
        <View style={styles.inputWrapper}>
          <AmountInput value={amount} onChangeValue={handleAmountChange} />
        </View>
        <View style={styles.inputWrapper}>
          <Pressable
            style={{ backgroundColor: "#4d81f1", padding: 13, borderRadius: 5 }}
          >
            <Text
              style={{
                fontFamily: "PlusJakartaSansMedium",
                color: "#fff",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Save
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  inputWrapper: {
    flex: 0.5,
    marginRight: 10,
  },
  AddImage: {
    padding: 20,
    borderColor: "#999",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
  },
  btn: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#d5dae0",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});

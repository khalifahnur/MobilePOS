import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useRouter } from "expo-router";
import data from "@/components/Data";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


type RootStackParamList = {
  "screens/product": {
    productData: {
      cost: string;
      id: number;
      name: string;
      quantity: string;
      image: string;
    };
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SearchScreen() {
  const router = useRouter();
  const navigation = useNavigation<NavigationProp>();

  const [value, setValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    const filteredText = data.flatMap((item) =>
      item.description.filter((desc) =>
        desc?.name?.toLowerCase().includes(value?.toLowerCase())
      )
    );
    setFilteredData(filteredText);
  }, [value]);
  console.log(filteredData);

  const HandleItem = (productData:{cost: string;
    id: number;
    name: string;
    quantity: string;
    image: string;
  }) => {
    //console.log(productData)
    navigation.navigate("screens/product", { productData: JSON.stringify(productData) });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            backgroundColor: "#e8e8e8",
            flex: 1,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <EvilIcons name="search" size={24} color="black" />
          <TextInput
            placeholder="Search the menu"
            onChangeText={(text) => setValue(text)}
            value={value}
          />
        </View>
        <Pressable style={{ padding: 10 }} onPress={() => router.back()}>
          <Text>Cancel</Text>
        </Pressable>
      </View>

      <View style={{ flex: 1 }}>
        {value !== "" ? (
          filteredData.length > 0 ? (
            <FlatList
              data={filteredData}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              renderItem={({ item }) => (
                <Pressable onPress={() => HandleItem(item)}>
                  <View style={styles.Description}>
                    <View style={{ flex: 0.7 }}>
                      <Text style={styles.TextName}>{item.name}</Text>
                      <Text
                        style={styles.TextDesc}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                      >
                        {item.quantity}
                      </Text>
                      <Text style={styles.TextCost}>Ksh.{item.cost}</Text>
                    </View>
                    <View style={{ flex: 0.3, alignItems: "flex-end" }}>
                      <Image source={item.image} style={styles.ImageStyle} />
                    </View>
                  </View>
                </Pressable>
              )}
              ItemSeparatorComponent={() => <View style={styles.Divider} />}
            />
          ) : (
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text>No matches found</Text>
            </View>
          )
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            {data.map((item, index) => (
              <Pressable key={index} style={{ padding: 20 }}>
                <Text style={{ color: "#999" }}>{item.title}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 10,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 5,
  },
  Description: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  TextName: {
    fontFamily: "PlusJakartaSansMedium",
    fontSize: 14,
    fontWeight: "700",
    paddingBottom: 2,
  },
  TextDesc: {
    fontFamily: "PlusJakartaSansMedium",
    fontSize: 12,
    fontWeight: "300",
    textAlign: "justify",
    paddingBottom: 2,
  },
  TextCost: {
    fontFamily: "PlusJakartaSansMedium",
    fontSize: 12,
    fontWeight: "700",
  },
  Divider: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    width: "100%",
  },
  ImageStyle: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});

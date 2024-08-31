import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Animated,
  LayoutChangeEvent,
  Pressable,
} from "react-native";
import React, { useState, useRef } from "react";
import data from "../Data";
import Header from "./Header";
import StickyHeader from "./StickyHeader";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
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

export default function SubContainer() {
  const navigation = useNavigation<NavigationProp>();
  const HandleItem = (productData:{cost: string;
    id: number;
    name: string;
    quantity: string;
    image: string;
  }) => {
    //console.log(productData)
    navigation.navigate("screens/product", { productData: JSON.stringify(productData) });
  };
  
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const listRef = useRef<Animated.FlatList | null>(null);
  const [customHeight, setCustomHeight] = useState({
    header: 0,
    stickyHeader: 0,
  });

  // get height of the layout
  const onLayoutStickyHeader = (event: LayoutChangeEvent) => {
    setCustomHeight({
      ...customHeight,
      stickyHeader: event.nativeEvent.layout.height,
    });
  };

  const onLayoutHeader = (event: LayoutChangeEvent) => {
    setCustomHeight({
      ...customHeight,
      header: event.nativeEvent.layout.height,
    });
  };

  const header = (
    <Header
      onLayoutHeader={onLayoutHeader}
      customHeaderStyle={customHeight.stickyHeader}
    />
  );


  const handleTabPress = (index: number) => {
    if (listRef.current) {
      const position = customHeight.header + customHeight.stickyHeader;
      listRef.current.scrollToOffset({
        offset: index * position,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.StickyHeader,
          {
            backgroundColor: "#f2f4f7",
            zIndex: 999,
            marginTop: customHeight.header,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, customHeight.header],
                  outputRange: [0, -customHeight.header],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
        onLayout={onLayoutStickyHeader}
      >
        <StickyHeader onTabPress={handleTabPress} />
      </Animated.View>
      <Animated.FlatList
        ref={listRef}
        data={data}
        renderItem={({ item, index }) => (
          <View key={index}>
            <View style={{ backgroundColor: "#ffff", padding: 10 }}>
              <Text style={styles.Title}>{item.title}</Text>
            </View>
            <View style={{ flex: 1 }}>
              {item.description?.map((descItem, descIndex: number) => (
                <Pressable onPress={() => HandleItem(descItem)} key={descIndex}>
                  <View style={styles.Description}>
                    <View style={{ flex: 0.7 }}>
                      <Text style={styles.TextName}>{descItem.name}</Text>
                      <Text
                        style={styles.TextDesc}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                      >
                        {descItem.quantity}
                      </Text>
                      <Text style={styles.TextCost}>Ksh.{descItem.cost}</Text>
                    </View>
                    <View style={{ flex: 0.3, alignItems: "flex-end" }}>
                      <Image
                        source={descItem.image}
                        style={styles.ImageStyle}
                      />
                    </View>
                  </View>
                  {descIndex < item.description.length - 1 && (
                    <View style={styles.Divider} />
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        )}
        ListHeaderComponent={header}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 2,
  },
  Title: {
    fontFamily: "PlusJakartaSansMedium",
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
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
  StickyHeader: {
    top: 0,
    left: 0,
    position: "absolute",
    shadowColor: "#fff",
    shadowRadius: 5,
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.5,
    elevation: 5,
  },
});

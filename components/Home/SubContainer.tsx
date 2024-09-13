import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  LayoutChangeEvent,
  Pressable,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import StickyHeader from "./StickyHeader";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

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

export default function SubContainer({ extractedData }) {
  const router = useRouter();
  const [restaurantName, setRestaurantName] = useState<string>("");

  const navigation = useNavigation<NavigationProp>();

  const HandleItem = (productData) => {
    //console.log(productData.image.uri)
    router.push({
      pathname: "/screens/product",
      params: {
        id: productData.id,
        cost: productData.cost,
        image: productData.image.uri,
        name: productData.name,
        quantity: productData.quantity,
      },
    });
  };

  const scrollY = useRef(new Animated.Value(0)).current;
  const listRef = useRef<Animated.FlatList | null>(null);
  const [customHeight, setCustomHeight] = useState({
    header: 0,
    stickyHeader: 0,
  });

  // Get height of the layout
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

  useEffect(() => {
    const FetchData = async () => {
      const userRawObj = await AsyncStorage.getItem("RestaurantName");
      if (userRawObj) {
        const userObj = JSON.parse(userRawObj);
        setRestaurantName(userObj);
      }
    };
    FetchData();
  }, []);

  const header = (
    <Header
      onLayoutHeader={onLayoutHeader}
      customHeaderStyle={customHeight.stickyHeader}
      restaurantName={restaurantName}
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

  // Grouped data
  const groupedData = extractedData?.reduce((acc, item) => {
    const dataItems = item.data || [];

    dataItems.forEach((dataItem) => {
      //console.log('Processing data item:', dataItem); // Log each data item to understand its structure

      const title = dataItem?.title?.toUpperCase() || "UNKNOWN";
      const descriptionData = (dataItem?.description || []).map((desc) => ({
        id: dataItem._id || "UNKNOWN_ID",
        name: desc.name || "No Name",
        quantity: desc.quantity || "0",
        cost: (desc.cost / 100).toFixed(2) || "0",
        image: { uri: desc.image },
      }));

      const existingCategory = acc?.find((cat) => cat?.title === title);

      if (existingCategory) {
        existingCategory.description.push(...descriptionData);
      } else {
        acc.push({
          id: dataItem._id || "UNKNOWN_ID",
          title,
          description: descriptionData,
        });
      }
    });

    return acc;
  }, []);

  return extractedData.length !== 0 ? (
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
        <StickyHeader onTabPress={handleTabPress} data={groupedData}  />
      </Animated.View>
      <Animated.FlatList
        ref={listRef}
        data={groupedData}
        renderItem={({ item, index }) => (
          <View key={index}>
            <View style={{ backgroundColor: "#ffff", padding: 10 }}>
              <Text style={styles.Title}>{item.title}</Text>
            </View>
            <View style={{ flex: 1 }}>
              {item.description?.map((descItem, descIndex: number) =>{ 
                // console.log(descItem)
                return(
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
              )})}
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
  ) : (
    <View
      style={[
        styles.Maincontainer,
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
          },
        ]}
      >
        <Text style={{ fontSize: 24, fontWeight: "500", color: "#4d81f1" }}>
          Welcome user!
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "500",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Tap on the plus button add your menu
        </Text>
        <View
          style={{
            marginTop: 40,
          }}
        >
          <LottieView
            source={require("../../assets/images/arrowDown.json")}
            autoPlay
            loop
            style={{ width: 100, height: 100 }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
  },
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

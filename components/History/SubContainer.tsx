import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import Search from "./Search";
import HeaderTitle from "./HeaderTitle";
import HeaderContentTitle from "./HeaderContentTitle";
import { useLocalSearchParams, useRouter } from "expo-router";

type FetchedDataProps = {
  FetchedData: {
    id: string;
    restaurantId: string;
    items: {
      cost: number;
      id: string;
      image: string;
      name: string;
      quantity: number;
      _id: string;
    }[];
    totalCost: number;
    createdAt: string;
    updatedAt: string;
  }[];
};

export default function SubContainer({ FetchedData }: FetchedDataProps) {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const listRef = useRef<Animated.FlatList | null>(null);

  const [customHeight, setCustomHeight] = useState({
    HeaderTitleHeight: 0,
    searchHeader: 0,
    headerContentTitleHeight: 0,
  });

  const onLayoutStickyHeaderTitle = (event: LayoutChangeEvent) => {
    setCustomHeight({
      ...customHeight,
      HeaderTitleHeight: event.nativeEvent.layout.height,
    });
  };

  const onLayoutSearchHeader = (event: LayoutChangeEvent) => {
    setCustomHeight({
      ...customHeight,
      searchHeader: event.nativeEvent.layout.height,
    });
  };

  const onLayoutStickyHeaderContentTitleHeight = (event: LayoutChangeEvent) => {
    setCustomHeight({
      ...customHeight,
      headerContentTitleHeight: event.nativeEvent.layout.height,
    });
  };

  // Check if FetchedData is a string, then parse it to JSON
  const parsedData =
    typeof FetchedData === "string" ? JSON.parse(FetchedData) : FetchedData;

  const HandleModalDetails = (data) => {
    console.log("Modal data", data);
    router.push({
      pathname: "/screens/details",
      params: {
        data: JSON.stringify(data),
      },
    });
  };

  return (
    <View style={styles.Container}>
      {/* Header Title */}
      <Animated.View
        style={[
          styles.StickyHeader,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [
                    0,
                    customHeight.HeaderTitleHeight +
                      customHeight.headerContentTitleHeight +
                      customHeight.searchHeader,
                  ],
                  outputRange: [0, -10],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
          {
            marginBottom: customHeight.searchHeader,
            zIndex: 999,
            alignItems: "center",
            backgroundColor: "#F2F4F7",
          },
        ]}
      >
        <HeaderTitle HeaderTitleLayout={onLayoutStickyHeaderTitle} />
      </Animated.View>
      {/* Header content Title */}
      <Animated.View
        style={[
          styles.StickyHeader,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [
                    0,
                    customHeight.HeaderTitleHeight +
                      customHeight.headerContentTitleHeight +
                      customHeight.searchHeader,
                  ],
                  outputRange: [0, -(customHeight.searchHeader + 15)],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
          {
            marginTop:
              customHeight.HeaderTitleHeight + customHeight.searchHeader,
            zIndex: 999,
          },
        ]}
      >
        <HeaderContentTitle
          HeaderContentLayout={onLayoutStickyHeaderContentTitleHeight}
        />
      </Animated.View>

      {FetchedData?.length > 0 ? (
        <Animated.FlatList
          ref={listRef}
          data={parsedData}
          renderItem={({ item, index }) => {
            const createdAtDate = new Date(item?.createdAt);
            return (
              <>
                <View key={item?._id} style={{ paddingHorizontal: 20 }}>
                  <TouchableOpacity
                    onPress={() => HandleModalDetails(item)}
                    style={[
                      styles.Content,
                      {
                        backgroundColor: index % 2 === 0 ? "#cce9d5" : "#ffff",
                        borderRadius: 8,
                      },
                    ]}
                  >
                    {/* Check if data is valid */}
                    <Text style={styles.ContentText}>
                      # {item?._id.slice(-4, -1)}{" "}
                    </Text>
                    <Text style={styles.ContentText}>
                      {/* Ensure valid date */}
                      {isNaN(createdAtDate.getTime())
                        ? "Invalid Date"
                        : createdAtDate.toLocaleString()}
                    </Text>
                    <Text style={styles.ContentText}>{item?.totalCost}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.Divider} />
              </>
            );
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          ListHeaderComponent={
            <Search
              onLayoutSearch={onLayoutSearchHeader}
              searchMarginTopStyle={customHeight.HeaderTitleHeight}
              searchMarginBottomStyle={customHeight.headerContentTitleHeight}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View>
          <Text>Filtered data:null</Text>
        </View>
        // <Animated.FlatList
        //   ref={listRef}
        //   data={HistoryPlaceholder}
        //   renderItem={({ item, index }) => (
        //     <>
        //       <View key={item.id} style={{ paddingHorizontal: 20 }}>
        //         <TouchableOpacity
        //           onPress={() => HandleModalDetails(item)}
        //           style={[
        //             styles.Content,
        //             {
        //               backgroundColor: index % 2 === 0 ? "#cce9d5" : "#ffff",
        //               borderRadius: 8,
        //             },
        //           ]}
        //         >
        //           <Text style={styles.ContentText}>{item.itemId}</Text>
        //           <Text style={styles.ContentText}>{item.date}</Text>
        //           <Text style={styles.ContentText}>{item.cost}</Text>
        //         </TouchableOpacity>
        //       </View>
        //       <View style={styles.Divider} />
        //     </>
        //   )}
        //   onScroll={Animated.event(
        //     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        //     { useNativeDriver: true }
        //   )}
        //   ListHeaderComponent={
        //     <Search
        //       onLayoutSearch={onLayoutSearchHeader}
        //       searchMarginTopStyle={customHeight.HeaderTitleHeight}
        //       searchMarginBottomStyle={customHeight.headerContentTitleHeight}
        //     />
        //   }
        //   showsVerticalScrollIndicator={false}
        // />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginTop: 2,
  },

  Content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  ContentText: {
    textAlign: "center",
    padding: 5,
    fontSize: 15,
  },
  Divider: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d4d4d4",
    marginTop: 10,
    marginBottom: 10,
  },
  StickyHeader: {
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    shadowColor: "#fff",
    shadowRadius: 5,
    shadowOffset: {
      width: 10,
      height: 0,
    },
    shadowOpacity: 0.5,
    elevation: 5,
  },
});

import {
  Animated,
  FlatList,
  LayoutChangeEvent,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
// import HistoryPlaceholder from "../HistoryPlaceholder";
import Search from "./Search";
import HeaderTitle from "./HeaderTitle";
import HeaderContentTitle from "./HeaderContentTitle";
import { useLocalSearchParams, useRouter } from "expo-router";
import ModalDetails from "./ModalDetails";

type HistoryPlaceholderItem = {
  id: number;
  itemId: string;
  name: string;
  date: string;
  quantity: number;
  cost: number;
};

type HistoryPlaceholderProps = {
  HistoryPlaceholder: HistoryPlaceholderItem[];
};

export default function SubContainer({HistoryPlaceholder}:HistoryPlaceholderProps) {
  const [modalDetailsVisible,setModalDetailsVisible] = useState<boolean>(false);
  

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

  const HandleModalDetails =(data:HistoryPlaceholderItem)=>{
    router.push({pathname:'/screens/details',params:{cost:data.cost,date:data.date,id:data.id,itemId:data.itemId,name:data.name,quantity:data.quantity}})
  }
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
                  outputRange: [
                    0,
                    -10,
                  ],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
          {
            marginBottom:customHeight.searchHeader,
            zIndex:999,
            alignItems:'center',
            backgroundColor:'#F2F4F7'
          }
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
                  outputRange: [
                    0,
                    -(
                      customHeight.searchHeader+15 ),
                  ],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
          {
            marginTop:customHeight.HeaderTitleHeight + customHeight.searchHeader,
            zIndex:999,
            
            
          }
        ]}
      >
        <HeaderContentTitle
          HeaderContentLayout={onLayoutStickyHeaderContentTitleHeight}
        />
      </Animated.View>

      <Animated.FlatList
        ref={listRef}
        data={HistoryPlaceholder}
        renderItem={({ item, index }) => (
          <>
            <View key={index} style={{paddingHorizontal:20}}>
              <TouchableOpacity
               onPress={()=>HandleModalDetails(item)}
                style={[
                  styles.Content,
                  {
                    backgroundColor: index % 2 === 0 ? "#cce9d5" : "#ffff",
                    borderRadius: 8,
                  },
                ]}
              >
                <Text style={styles.ContentText}>{item.itemId}</Text>
                <Text style={styles.ContentText}>{item.date}</Text>
                <Text style={styles.ContentText}>{item.cost}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.Divider} />
          </>
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
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
    right:0,
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

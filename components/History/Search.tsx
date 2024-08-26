import {
  Animated,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { EvilIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import FilterModal from "./FilterModal";
import { useRouter } from "expo-router";


type searchProps = {
  onLayoutSearch: (event: LayoutChangeEvent) => void;
  searchMarginBottomStyle: number;
  searchMarginTopStyle: number;
};
export default function Search({
  onLayoutSearch,
  searchMarginBottomStyle,
  searchMarginTopStyle,
}: searchProps) {

  const router = useRouter();
  const [filterModal,setFilterModal] = useState<boolean>(false);
  const HandleFilterData = ()=>{
    router.navigate("/screens/filter")
  }
  return (
    <>
    <Animated.View
      onLayout={onLayoutSearch}
      style={{
        marginBottom: searchMarginBottomStyle,
        marginTop: searchMarginTopStyle,
        paddingHorizontal: 20,
      }}
    >
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
          <EvilIcons name="search" size={20} color="black" />
          <TextInput
            placeholder="Search Order ID"
            // onChangeText={(text) => setValue(text)}
            // value={value}
          />
        </View>
        <View style={{flexDirection:'row',gap:10,marginLeft:5}}>
          <TouchableOpacity
          onPress={HandleFilterData}
            style={{ padding: 15, backgroundColor: "#e8e8e8", borderRadius: 20 }}
          >
            <Ionicons name="filter" size={15} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 15, backgroundColor: "#e8e8e8", borderRadius: 20 }}
          >
            <FontAwesome name="sort" size={15} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
    <FilterModal modalFilterVisible={filterModal} setModalFilterVisible={setFilterModal} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 5,
      height: 0,
    },
    elevation: 2,
    shadowRadius: 5,
  },
});

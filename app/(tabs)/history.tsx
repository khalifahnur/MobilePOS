import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { ThemedView } from "@/components/ThemedView";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import SubContainer from "@/components/History/SubContainer";
import { useLocalSearchParams } from "expo-router";
import HistoryPlaceholder from "@/components/HistoryPlaceholder";

export default function HistoryScreen() {
  const { FilteredDates, selectedCost, selectedTime } = useLocalSearchParams();
  const selectedPeriodTime = JSON.stringify(selectedTime);

const minTime = selectedPeriodTime?.split("-")[0].trim();
const maxTime = selectedPeriodTime?.split("-")[1].trim()
// Check if FilteredDates is a string before parsing
const parsedFilteredDates = typeof FilteredDates === 'string' ? JSON.parse(FilteredDates) : FilteredDates;

const selectedCostRange = { min: 400, max: 1000 }; // Example cost range

// Function to filter based on the inputs
const filteredHistory = HistoryPlaceholder.filter(item => {

  const date = item.date.split(",")[0].replace(/ /g, "-");
  // Check if itemDate is included in dates array
  const isDateMatch = parsedFilteredDates?.includes(date);

  // Filter by time (assuming time in "HH:mm:ss" format)
  const itemTime = item.date.split(", ")[1].split(":").slice(0, 2).join(":");  
  const isTimeMatch = itemTime >= minTime && itemTime <= maxTime;

  // Filter by cost
  const isCostMatch = item.cost >= selectedCostRange.min && item.cost <= selectedCostRange.max;

  return isDateMatch && isTimeMatch && isCostMatch;
});

  return (
    <SafeAreaView style={style.container}>
      <StatusBar hidden={false} backgroundColor="#F2F4F7" style="dark" />
      <ThemedView
        style={[style.container, {borderTopWidth:2,borderTopColor:'#E8E8E8',marginBottom:65}]}
        lightColor="#F2F4F7"
      >
        
        <SubContainer HistoryPlaceholder={filteredHistory.length > 0 ? filteredHistory : HistoryPlaceholder} />
      </ThemedView>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
    
  },
});

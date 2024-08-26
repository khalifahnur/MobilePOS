import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";

export default function FilterScreen() {
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("AM");
  const [selectedTime, setSelectedTime] = useState('');
  //const [selectedAM, setSelectedAM] = useState('');
  const [selectedCost, setSelectedCost] = useState(350);

  // console.log(Object.keys(selectedDates));
  // console.log(selectedPM);
  // console.log("cost", selectedCost);
  const FilteredDates = Object.keys(selectedDates);

  const AM = [
    { id: 1, am: "00-03 hrs" },
    { id: 2, am: "03-06 hrs" },
    { id: 3, am: "06-09 hrs" },
    { id: 4, am: "09-12 hrs" },
  ];
  const PM = [
    { id: 1, pm: "12-15 hrs" },
    { id: 2, pm: "15-18 hrs" },
    { id: 3, pm: "18-21 hrs" },
    { id: 4, pm: "21-00 hrs" },
  ];

  const router = useRouter();

  const handleDayPress = (day) => {
    setSelectedDates((prevDates) => ({
      ...prevDates,
      [day.dateString]: {
        selected: true,
        disableTouchEvent: true,
        selectedDotColor: "orange",
      },
    }));
  };

  const handleReset = () => {
    setSelectedDates({});
    setSelectedTimePeriod("AM");
    setSelectedTime("");
  };


  const handleFilter = () => {
    if (FilteredDates && selectedCost && selectedTime) {
      router.push({
        pathname: '/history',
        params: {
          FilteredDates: JSON.stringify(FilteredDates),
          selectedCost: selectedCost.toString(),
          selectedTime:selectedTime,
        }
      });
    }
  };
  
  

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Filter</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => router.back()}
            >
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>

          {/* Time */}

          <View style={styles.card}>
            <Text style={styles.subHeaderText}>Month</Text>
            <Calendar  onDayPress={handleDayPress} markedDates={selectedDates} />
          </View>

          {/* Time */}

          <View style={styles.card}>
            <Text style={styles.subHeaderText}>Time</Text>
            <View style={styles.timeContainer}>
              <Pressable
                style={[
                  styles.timeButton,
                  selectedTimePeriod === "AM" && styles.timeButtonSelected,
                ]}
                onPress={() => setSelectedTimePeriod("AM")}
              >
                <Text
                  style={selectedTimePeriod === "AM" && styles.selectedText}
                >
                  AM
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.timeButton,
                  selectedTimePeriod === "PM" && styles.timeButtonSelected,
                ]}
                onPress={() => setSelectedTimePeriod("PM")}
              >
                <Text
                  style={selectedTimePeriod === "PM" && styles.selectedText}
                >
                  PM
                </Text>
              </Pressable>
            </View>
            {selectedTimePeriod === "AM" ? (
              <View>
                {AM.map(({ am, id }) => (
                  <View key={id}>
                    <TouchableOpacity
                      style={{ padding: 5 }}
                      onPress={() => setSelectedTime(am)}
                    >
                      <Text
                        style={{
                          backgroundColor: selectedTime === am ? "#4d81f1" : "#84d76b",
                          padding: 10,
                          fontSize: 15,
                          borderRadius: 8,
                          color: selectedTime === am ? "#fff" : "#1e1e1e",
                        }}
                      >
                        {am}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : (
              <View>
                {PM.map(({ pm, id }) => (
                  <View key={id}>
                    <TouchableOpacity
                      style={{ padding: 5 }}
                      onPress={() => setSelectedTime(pm)}
                    >
                      <Text
                        style={{
                          backgroundColor: selectedTime === pm ? "#4d81f1" : "#84d76b",
                          padding: 10,
                          fontSize: 15,
                          borderRadius: 8,
                          color: selectedTime === pm ? "#fff" : "#1e1e1e",
                        }}
                      >
                        {pm}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.subHeaderText}>Cost</Text>
            <Slider
              style={styles.slider}
              minimumValue={350}
              maximumValue={12000}
              lowerLimit={350}
              minimumTrackTintColor="#1e1e1e"
              maximumTrackTintColor="#000000"
              value={selectedCost} // initial value
              onValueChange={(value) => setSelectedCost(value)}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Pressable style={styles.footerButton} onPress={handleReset}>
          <Text style={styles.footerButtonText}>Reset</Text>
        </Pressable>
        <Pressable style={styles.footerButton} onPress={handleFilter}>
          <Text style={styles.footerButtonText}>Apply Filters</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    marginTop: 25,
  },
  mainContainer: {
    backgroundColor: "#f2f4f7",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
    fontWeight: "600",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#eeee",
    padding: 10,
    borderRadius: 20,
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  timeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  timeButtonSelected: {
    backgroundColor: "#d0d0d0",
  },
  selectedText: {
    fontWeight: "bold",
    color: "#000",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  footerButton: {
    flex: 1,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 8,
  },
  footerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

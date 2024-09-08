import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import Modal, {
  BottomModal,
  ModalContent,
  ModalFooter,
} from "react-native-modals";
import { AntDesign } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { useRouter } from "expo-router";

type ModalFilterProps = {
  modalFilterVisible: boolean;
  setModalFilterVisible: (visible: boolean) => void;
};

export default function FilterModal({
  modalFilterVisible,
  setModalFilterVisible,
}: ModalFilterProps) {
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("AM");
  const [selectedTime, setSelectedTime] = useState("");

  const FilteredDates = Object.keys(selectedDates);
console.log(FilteredDates)
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
    if (FilteredDates && selectedTime) {
      router.push({
        pathname: "/history",
        params: {
          FilteredDates: JSON.stringify(FilteredDates),
          selectedCost: selectedCost.toString(),
          selectedTime: selectedTime,
        },
      });
    }
  };

  return (
    <BottomModal
      visible={modalFilterVisible}
      swipeDirection={["up", "down"]}
      swipeThreshold={200}
      
    >
      
        <ModalContent style={styles.mainContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Filter</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalFilterVisible(false)}
            >
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>

          {/* Date */}

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
                          backgroundColor:
                            selectedTime === am ? "#4d81f1" : "#84d76b",
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
                          backgroundColor:
                            selectedTime === pm ? "#4d81f1" : "#84d76b",
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
        </ModalContent>

      <ModalFooter style={styles.footer}>
        <Pressable style={styles.footerButton} onPress={handleReset}>
          <Text style={styles.footerButtonText}>Reset</Text>
        </Pressable>
        <Pressable style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Apply Filters</Text>
        </Pressable>
      </ModalFooter>
    </BottomModal>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingBottom: 20,
  },
  mainContainer: {
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#f8f8f8",
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
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginTop:5
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
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

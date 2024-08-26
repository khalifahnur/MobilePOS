import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Pressable, ScrollView } from "react-native";
import Modal, { BottomModal, ModalContent, ModalFooter } from "react-native-modals";
import { AntDesign } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import Slider from "@react-native-community/slider";

type ModalFilterProps = {
    modalFilterVisible: boolean;
    setModalFilterVisible: (visible: boolean) => void;
};

export default function FilterModal({ modalFilterVisible, setModalFilterVisible }: ModalFilterProps) {
    const [selectedDates, setSelectedDates] = useState({});
    const [selectedTimePeriod, setSelectedTimePeriod] = useState("AM"); // AM or PM

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
        // Add any additional reset logic here
    };

    const renderTimeOptions = () => {
        return selectedTimePeriod === "AM" ? (
            <View>
                <Text>12-&gt;03 hrs</Text>
                <Text>03-&gt;06 hrs</Text>
                <Text>06-&gt;09 hrs</Text>
                <Text>09-&gt;12 hrs</Text>
            </View>
        ) : (
            <View>
                <Text>12-&gt;03 hrs</Text>
                <Text>03-&gt;06 hrs</Text>
                <Text>06-&gt;09 hrs</Text>
                <Text>09-&gt;12 hrs</Text>
            </View>
        );
    };

    return (
        <BottomModal
            visible={modalFilterVisible}
            swipeDirection={['up', 'down']}
            swipeThreshold={200}
            style={{ margin: 0, flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <ModalContent style={styles.mainContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Filter</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalFilterVisible(false)}>
                            <AntDesign name="close" size={20} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.subHeaderText}>Month</Text>
                        <Calendar
                            onDayPress={handleDayPress}
                            markedDates={selectedDates}
                        />
                    </View>

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
                                <Text style={selectedTimePeriod === "AM" && styles.selectedText}>AM</Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.timeButton,
                                    selectedTimePeriod === "PM" && styles.timeButtonSelected,
                                ]}
                                onPress={() => setSelectedTimePeriod("PM")}
                            >
                                <Text style={selectedTimePeriod === "PM" && styles.selectedText}>PM</Text>
                            </Pressable>
                        </View>
                        {renderTimeOptions()}
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.subHeaderText}>Cost</Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={1000}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                        />
                    </View>
                </ModalContent>
            </ScrollView>
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
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#f8f8f8',
        padding: 10,
        borderRadius: 20,
    },
    subHeaderText: {
        fontSize: 18,
        fontWeight: '400',
        marginBottom: 8,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    timeButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    timeButtonSelected: {
        backgroundColor: '#d0d0d0',
    },
    selectedText: {
        fontWeight: 'bold',
        color: '#000',
    },
    slider: {
        width: '100%',
        height: 40,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    footerButton: {
        flex: 1,
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 8,
    },
    footerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

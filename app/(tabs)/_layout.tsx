import React, { useState } from 'react';
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { AntDesign } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  Text,
  StyleSheet,
  Button,
} from "react-native";

const TabLayout: React.FC = () => {
  const window = useWindowDimensions();
  const BOTTOM_WIDTH = (3.7 / 4) * window.width;

  return (
    <>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarBackground: () => (
              <BlurView
                tint="systemMaterialDark"
                intensity={100}
                style={StyleSheet.absoluteFill}
              />
            ),
          }}
          tabBar={({ state, descriptors, navigation }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                borderRadius: 21,
                backgroundColor: "#FFFF",
                bottom: 15,
                left: 20,
                right: 20,
                elevation: 0,
                height: 55,
                width: BOTTOM_WIDTH,
                position: "absolute",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                {state.routes.map((route, index) => {
                  const { options } = descriptors[route.key];
                  const isFocused = state.index === index;

                  const onPress = () => {
                    const event = navigation.emit({
                      type: "tabPress",
                      target: route.key,
                      canPreventDefault: true,
                    });

                    if (!event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                  };

                  return (
                    <TouchableOpacity
                      accessibilityRole="button"
                      testID={options.tabBarTestID}
                      accessibilityState={isFocused ? { selected: true } : {}}
                      key={index}
                      onPress={onPress}
                      style={{ flex: 1, alignItems: "center" }}
                    >
                      {options.tabBarIcon &&
                        options.tabBarIcon({ focused: isFocused })}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
        >
          {/* index screen */}
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={[
                    focused && styles.ActiveIconStyle,
                    { alignItems: "center" },
                  ]}
                >
                  <Ionicons
                    name="home-outline"
                    size={focused ? 20 : 25}
                    color={focused ? "#00932C" : "#1E1E1E"}
                  />
                  {focused && (
                    <View>
                      <Text style={{ color: "#00932C", fontSize: 9 }}>Home</Text>
                    </View>
                  )}
                </View>
              ),
            }}
          />
          {/* report screen */}
          <Tabs.Screen
            name="report"
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={[
                    focused && styles.ActiveIconStyle,
                    { alignItems: "center" },
                  ]}
                >
                  <Feather
                    name="pie-chart"
                    size={focused ? 20 : 25}
                    color={focused ? "#00932C" : "#1E1E1E"}
                  />
                  {focused && (
                    <View>
                      <Text style={{ color: "#00932C", fontSize: 9 }}>Report</Text>
                    </View>
                  )}
                </View>
              ),
            }}
          />
          {/* report screen */}
          <Tabs.Screen
            name="add"
            options={{
              
              tabBarIcon: ({ focused }) => (
                <View style={styles.container}>
                  <View style={styles.iconContainer}>
                    <View style={styles.iconWrapper}>
                      <AntDesign
                        name="plus"
                        size={30}
                        color="#00932C"
                        style={styles.icon}
                      />
                    </View>
                  </View>
                </View>
              ),
            }}
          />
          {/* history screen */}
          <Tabs.Screen
            name="history"
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={[
                    focused && styles.ActiveIconStyle,
                    { alignItems: "center" },
                  ]}
                >
                  <Icon
                    name="receipt"
                    size={focused ? 20 : 25}
                    color={focused ? "#00932C" : "#1E1E1E"}
                  />
                  {focused && (
                    <View>
                      <Text style={{ color: "#00932C", fontSize: 9 }}>History</Text>
                    </View>
                  )}
                </View>
              ),
            }}
          />
          {/* serrings screen */}
          <Tabs.Screen
            name="settings"
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={[
                    focused && styles.ActiveIconStyle,
                    { alignItems: "center" },
                  ]}
                >
                  <Ionicons
                    name="settings-outline"
                    size={focused ? 20 : 25}
                    color={focused ? "#00932C" : "#1E1E1E"}
                  />
                  {focused && (
                    <View>
                      <Text style={{ color: "#00932C", fontSize: 9 }}>Settings</Text>
                    </View>
                  )}
                </View>
              ),
            }}
          />
        </Tabs>

    </>
  );
};

const styles = StyleSheet.create({
  ActiveIconStyle: {
    backgroundColor: "#CCE9D5",
    padding: 8,
    borderRadius: 32,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "white",
  },
  iconContainer: {
    position: "absolute",
    bottom: -2,
    left: "0%", // Move the left edge to the center
    transform: [{ translateX: -32 }], // Move it back by half of its width to center it
  },
  iconWrapper: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 32,
  },
  icon: {
    alignItems: "center",
  },
  addScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default TabLayout;

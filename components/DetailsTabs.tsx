import React, { Children } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { PropsWithChildren } from 'react';

type TabsNameProps = PropsWithChildren< {
  tabsName: string[];
  setSelectedTab: (tab: string) => void;
  selectedTab: string;
}>;

const DetailsTabs = ({children, tabsName, setSelectedTab, selectedTab }: TabsNameProps) => {
  return (
    <View>
    <View style={styles.tabsContainer}>
      {tabsName.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedTab(tab)}
          style={[styles.tabButton, { backgroundColor: selectedTab === tab ? "#4d81f1" : "#fff" }]}
        >
          <Text style={{ color: selectedTab === tab ? "#fff" : "#000",fontSize:16,fontWeight:'500' }}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
     <Text style={styles.children}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    gap:20,
    marginBottom:20,
  },
  tabButton: {
    padding: 10,
    borderRadius: 20,
  },
  children:{
    fontSize:16,
    fontWeight:'300',

  },
});

export default DetailsTabs;

import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import data from '../Data';
import SearchInp from './SearchInp';
import { useRouter } from 'expo-router';

interface Item {
  title: string;
  description: { name: string }[];
}

interface StickyHeaderProps {
  onTabPress: (index: number) => void;
}

export default function StickyHeader({ onTabPress }: StickyHeaderProps) {
    const route = useRouter()
  const tabsScrollView = useRef<FlatList>(null);
  const [activeBtn, setActiveBtn] = useState<string>('PROMOTIONS');
  const [ind, setInd] = useState<number>(0);

  useEffect(() => {
    if (tabsScrollView.current && ind >= 0 && ind < data.length) {
      tabsScrollView.current.scrollToIndex({ index: ind, viewPosition: 0.5 });
    }
  }, [ind]);

  const HandleActiveBtn = (index: number, title: string) => {
    setActiveBtn(title);
    if (tabsScrollView.current) {
      tabsScrollView.current.scrollToIndex({ index: index, viewPosition: 0.5 });
    }
    setInd(index);
    onTabPress(index);
  };

  const HandleSearchNavigation=():void =>{
    route.navigate("/screens/search")
  }

  return (
    <View>
      <View style={{ paddingHorizontal: 10, paddingBottom: 3 }}>
        <SearchInp HandlePress={HandleSearchNavigation} />
      </View>
      <View>
        <FlatList
          ref={tabsScrollView}
          data={data}
          renderItem={({ item, index }) => (
            <View key={index} style={{ padding: 5 }}>
              <Pressable
                onPress={() => HandleActiveBtn(index, item.title)}
                style={{
                  backgroundColor: activeBtn === item.title ? '#4d81f1' : '#f2f4f7',
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: activeBtn === item.title ? '#f2f4f7' : '#000' }}>
                  {item.title}
                </Text>
              </Pressable>
            </View>
          )}
          horizontal
          contentContainerStyle={{ marginBottom: 20, zIndex: 999 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

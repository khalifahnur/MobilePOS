import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LineChart } from "react-native-gifted-charts";
import PieChartComponent from "./PieChartComponent";
import { FontAwesome6 } from "@expo/vector-icons";
import moment from "moment";

const ScrollTabs = () => {
  const tabsScrollView = useRef<FlatList>(null);
  const [activeBtn, setActiveBtn] = useState<string>("Today");
  const [ind, setInd] = useState<number>(0);

  const Tabs = [
    { id: 1, title: "Yesterday" },
    { id: 2, title: "Today" },
    { id: 3, title: "Week" },
    { id: 4, title: "Month" },
    { id: 5, title: "Year" },
  ];

  useEffect(() => {
    if (tabsScrollView.current && ind >= 0 && ind < Tabs.length) {
      tabsScrollView.current.scrollToIndex({ index: ind, viewPosition: 0.5 });
    }
  }, [ind]);

  const HandleActiveBtn = (index: number, title: string) => {
    setActiveBtn(title);
    if (tabsScrollView.current) {
      tabsScrollView.current.scrollToIndex({ index: index, viewPosition: 0.5 });
    }
    setInd(index);
  };
  return (
    <FlatList
      ref={tabsScrollView}
      data={Tabs}
      renderItem={({ item, index }) => (
        <View key={index} style={{ padding: 5 }}>
          <Pressable
            onPress={() => HandleActiveBtn(index, item.title)}
            style={{
              //backgroundColor: activeBtn === item.title ? "#4d81f1" : "#f2f4f7",
              padding: 10,
              borderRadius: 10,
              borderBottomWidth: activeBtn === item.title ? 3 : 0,
              borderBottomColor:
                activeBtn === item.title ? "#4d81f1" : "#f2f4f7",
            }}
          >
            <Text style={{ color: activeBtn === item.title ? "#000" : "#999" }}>
              {item.title}
            </Text>
          </Pressable>
        </View>
      )}
      horizontal
      contentContainerStyle={{ marginBottom: 20, zIndex: 999 }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const TrendingFood = [
  {
    id: 1,
    category: "Food",
    name: "cheese burger",
    orders: 590,
    icon:'burger'
  },
  {
    id: 2,
    category: "Drinks",
    name: "Latte",
    orders: 400,
    icon:'coffee'
  },
  {
    id: 3,
    category: "Food",
    name: "Spicy Chicken",
    orders: 508,
    icon:'burger'
  },
  {
    id: 4,
    category: "Food",
    name: "Shawarma",
    orders: 600,
    icon:'burger'
  },
];

const TrendingDishesCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Trending Dishes</Text>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <Text>Dishes</Text>
        <Text>Sales</Text>
      </View>
      {TrendingFood.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome6 name={item.icon} size={20} color="#FFA500" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>
          <Text style={styles.orders}>{item.orders}</Text>
        </View>
      ))}
    </View>
  );
};

export default function SubContainer({sales}) {
  const Sales = JSON.parse(sales);
  const salesByDay: { [key: string]: number } = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };
  
  // Group sales by day of the week
  Sales.forEach(sale => {
    const dayOfWeek = moment(sale.createdAt).format('dddd');
    salesByDay[dayOfWeek] += sale.totalCost;
  });
  

  const data = [
    { day: 'Monday', totalSales: salesByDay['Monday'] },
    { day: 'Tuesday', totalSales: salesByDay['Tuesday'] },
    { day: 'Wednesday', totalSales: salesByDay['Wednesday'] },
    { day: 'Thursday', totalSales: salesByDay['Thursday'] },
    { day: 'Friday', totalSales: salesByDay['Friday'] },
    { day: 'Saturday', totalSales: salesByDay['Saturday'] },
    { day: 'Sunday', totalSales: salesByDay['Sunday'] },
  ];

  const dayMap = {
    'Monday': 'Mon',
    'Tuesday': 'Tue',
    'Wednesday': 'Wed',
    'Thursday': 'Thu',
    'Friday': 'Fri',
    'Saturday': 'Sat',
    'Sunday': 'Sun'
  };
  
  const transformedData = data.map(item => ({
    value: item.totalSales, 
    label: dayMap[item.day],
  }));
  
  console.log(transformedData);

  return (
    <ScrollView >
      <View style={styles.Subcontainer}>
        <View style={styles.headerStyle}>
          <Text style={styles.HeaderTxt}>Overview</Text>
        </View>

        <View style={styles.ReportContainerStyles}>
          <View style={{ paddingHorizontal: 10, paddingVertical: 2 }}>
            <Text style={styles.Reporttxt}>Daily Sales</Text>
            <Text style={[styles.Reporttxt, { color: "navy" }]}>2.56</Text>
            <Text style={styles.Reporttxt3}>2.1% vs last week</Text>
          </View>
          <View style={{ paddingVertical: 10, }}>
            <LineChart
              data={transformedData}
              yAxisExtraHeight={10}
              isAnimated
              animationDuration={1200}
              spacing={50}
              initialSpacing={15}
              // yAxisLabelTexts={Labels}
              yAxisOffset={0}
              yAxisLabelWidth={40}
              //yAxisLabelPrefix="Ksh. "
              // hideYAxisText
              //secondaryData={data}
              showVerticalLines
              color="#1e1e1e"
            />
            
          </View>
        </View>

        {/* Daily sales */}
        <View style={styles.DailySales}>
          <View style={{ alignItems: "center" }}>
            <ScrollTabs />
          </View>
          <PieChartComponent />
        </View>

        {/* Trending Food */}
        <View style={{marginTop:20}}>
          <TrendingDishesCard  />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Subcontainer: {
    marginBottom:20,
    paddingTop: 10,
  },
  headerStyle: {
    alignItems: "center",
  },
  HeaderTxt: {
    fontSize: 18,
    fontWeight: "500",
  },
  ReportContainerStyles: {
    marginTop: 10,
    backgroundColor: "#f8f8f8",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
    borderRadius: 15,
  },
  Reporttxt: {
    fontSize: 14,
    fontWeight: "500",
  },
  Reporttxt3: {
    fontSize: 10,
    fontWeight: "400",
    color: "blue",
  },
  DailySales: {
    paddingHorizontal: 20,
  },
  trending: {
    flexDirection: "row",
    justifyContent:'space-around',
    alignItems:'center',
    paddingHorizontal:20,
    paddingVertical:5
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 12,
    color: '#777',
  },
  orders: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

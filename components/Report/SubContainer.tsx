import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { BarChart, LineChart } from "react-native-gifted-charts";
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
    icon: "burger",
  },
  {
    id: 2,
    category: "Drinks",
    name: "Latte",
    orders: 400,
    icon: "coffee",
  },
  {
    id: 3,
    category: "Food",
    name: "Spicy Chicken",
    orders: 508,
    icon: "burger",
  },
  {
    id: 4,
    category: "Food",
    name: "Shawarma",
    orders: 600,
    icon: "burger",
  },
];

const TrendingDishesCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Trending Dishes</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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

export default function SubContainer({ sales }) {
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

  // Get today’s day of the week (e.g., 'Thursday')
  const today = moment().format("dddd");

  // Get the date of the same day last week (7 days ago)
  const lastWeekToday = moment().subtract(7, "days").format("YYYY-MM-DD");

  const filteredSales = Sales.filter((sale) => {
    const saleDate = moment(sale.createdAt).format("YYYY-MM-DD");
    return moment(saleDate).isBetween(lastWeekToday, moment(), undefined, "[]");
  });

  filteredSales.forEach((sale) => {
    const dayOfWeek = moment(sale.createdAt).format("dddd");
    salesByDay[dayOfWeek] += sale.totalCost;
  });

  const data = [
    { day: "Monday", totalSales: salesByDay["Monday"] },
    { day: "Tuesday", totalSales: salesByDay["Tuesday"] },
    { day: "Wednesday", totalSales: salesByDay["Wednesday"] },
    { day: "Thursday", totalSales: salesByDay["Thursday"] },
    { day: "Friday", totalSales: salesByDay["Friday"] },
    { day: "Saturday", totalSales: salesByDay["Saturday"] },
    { day: "Sunday", totalSales: salesByDay["Sunday"] },
  ];

  const dayMap = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Find today's index
  const todayIndex = daysOfWeek.indexOf(today);

  // Get the reordered days starting from last week's Friday to today
  const reorderedDays = [
    ...daysOfWeek.slice(todayIndex + 1),
    ...daysOfWeek.slice(0, todayIndex + 1),
  ];

  // Transform data and reorder it
  const transformedData = reorderedDays.map((day) => ({
    value: salesByDay[day],
    label: dayMap[day],
  }));

  const calculateTrendingDishes = () => {
    const dishSales = {};

    // Group sales by dishes
    Sales?.forEach((sale) => {
      const dishName = sale.name;
      if (!dishSales[dishName]) {
        dishSales[dishName] = 0;
      }
      dishSales[dishName] += sale.totalCost;
    });

    // Sort dishes by total sales (descending order)
    return Object.entries(dishSales)
      .map(([dishName, totalSales]) => ({ dishName, totalSales }))
      .sort((a, b) => b.totalSales - a.totalSales);
  };

  const trendidished = calculateTrendingDishes();
  console.log(trendidished);

  return sales.length !== 0 ? (
    <ScrollView>
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
          <View style={{ paddingVertical: 10 }}>
            <BarChart
              barWidth={22}
              barBorderRadius={4}
              frontColor="lightgray"
              data={transformedData}
              yAxisThickness={0}
              xAxisThickness={0}
              isThreeD
              height={200}
              yAxisLabelWidth={50}
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
        <View style={{ marginTop: 20 }}>
          <TrendingDishesCard />
        </View>
      </View>
    </ScrollView>
  ) : (
    <View
      style={[
        styles.Maincontainer,
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      <View
        style={[
          styles.Subcontainer,
          {
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
          },
        ]}
      >
        <Text style={{ fontSize: 24, fontWeight: "500", color: "#4d81f1" }}>
          Overview Screen
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "500",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Add menu to show reports about your sales
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
  },
  Subcontainer: {
    marginBottom: 20,
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
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  iconContainer: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    fontSize: 12,
    color: "#777",
  },
  orders: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

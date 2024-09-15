import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function PieChartComponent({Sales}) {


  const calculatePerformance = (sales) => {
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalCost, 0);
    const totalSales = sales.length;
  
    const totalItemsSold = sales.reduce((total, sale) => {
      return total + sale.items.reduce((sum, item) => sum + item.quantity, 0);
    }, 0);
  
    const averageOrderValue = totalSales ? totalRevenue / totalSales : 0;
    const revenuePerItem = totalItemsSold ? totalRevenue / totalItemsSold : 0;
  
    return {
      totalRevenue,
      totalSales,
      totalItemsSold,
      averageOrderValue,
      revenuePerItem
    };
  };
  
  const performanceMetrics = calculatePerformance(Sales);
  console.log(performanceMetrics);
  
  const evaluateSalesPerformanceWithPercentage = (metrics, targets) => {
    const { totalRevenue, totalSales, averageOrderValue } = metrics;
    const { targetRevenue, targetSales, targetAOV } = targets;
  
    const ratePerformance = (value, target) => {
      const percentage = (value / target) * 100;
      let rating;
      if (percentage >= 90) {
        rating = 'Excellent';
      } else if (percentage >= 70) {
        rating = 'Good';
      } else if (percentage >= 50) {
        rating = 'Okay';
      } else {
        rating = 'Poor';
      }
      return { rating, percentage: percentage.toFixed(2) + '%' };
    };
  
    return {
      revenue: ratePerformance(totalRevenue, targetRevenue),
      sales: ratePerformance(totalSales, targetSales),
      aov: ratePerformance(averageOrderValue, targetAOV),
    };
  };
  
  // Example metrics and targets
  const metrics = {
    totalRevenue: 12000,
    totalSales: 100,
    averageOrderValue: 120,
  };
  
  const targets = {
    targetRevenue: 15000,
    targetSales: 120,
    targetAOV: 150,
  };
  
  // Calculate performance ratings and percentages
  const performanceRatings = evaluateSalesPerformanceWithPercentage(metrics, targets);
  console.log(performanceRatings);
  



  const pieData = [
    {
      value: 47,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      focused: true,
    },
    { value: 40, color: "#93FCF8", gradientCenterColor: "#3BE9DE" },
    { value: 16, color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
    { value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97" },
  ];

  const renderDot = (color) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
            gap: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {renderDot("#006DFF")}
            <Text style={{ color: "#fff", fontSize: 9 }}>Excellent: 90%</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {renderDot("#8F80F3")}
            <Text style={{ color: "#fff", fontSize: 9 }}>Okay: 50%</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
            gap: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {renderDot("#3BE9DE")}
            <Text style={{ color: "#fff", fontSize: 9 }}>Good: 70%</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {renderDot("#FF7F97")}
            <Text style={{ color: "#fff", fontSize: 9 }}>Poor: below 50%</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        //backgroundColor: '#34448B',
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
      }}
    >
      <View
        style={{
          padding: 16,
          borderRadius: 20,
          backgroundColor: "#232B5D",
          flex: 0.5,
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Perfomance
        </Text>
        <View style={{ padding: 20, alignItems: "center" }}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={50}
            innerRadius={25}
            innerCircleColor={"#232B5D"}
            centerLabelComponent={() => {
              return (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{ fontSize: 14, color: "white", fontWeight: "bold" }}
                  >
                    %
                  </Text>
                  <Text style={{ fontSize: 10, color: "white" }}>
                    Good
                  </Text>
                </View>
              );
            }}
          />
        </View>
        {renderLegendComponent()}
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          flex: 0.5,
          shadowColor: "#000",
          shadowOffset: {
            width: 10,
            height: 5,
          },
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 10,
          borderRadius: 15,
          height: 150,
        }}
      >
        <View style={{ padding: 20 }}>
          <Text>Total Orders:</Text>
          <Text>{performanceMetrics.totalSales}</Text>
        </View>
      </View>
    </View>
  );
}

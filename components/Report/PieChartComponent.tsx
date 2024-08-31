import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function PieChartComponent() {
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
            <Text style={{ color: "#fff", fontSize: 9 }}>Excellent: 47%</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {renderDot("#8F80F3")}
            <Text style={{ color: "#fff", fontSize: 9 }}>Okay: 16%</Text>
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
            <Text style={{ color: "#fff", fontSize: 9 }}>Good: 40%</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {renderDot("#FF7F97")}
            <Text style={{ color: "#fff", fontSize: 9 }}>Poor: 3%</Text>
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
          Total Income
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
                    47%
                  </Text>
                  <Text style={{ fontSize: 10, color: "white" }}>
                    Excellent
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
          <Text>Total Orders</Text>
          <Text>-2.23%</Text>
          <Text>23,456</Text>
        </View>
      </View>
    </View>
  );
}

import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  StatusBar
} from "react-native";
import Svg from "react-native-svg";
import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryLegend,
  createContainer
} from "victory-native";

import Colors from "../constants/Colors";

import { VictoryTheme } from "victory-core";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 50,
  },
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 30
  }
});

const legendData = [
  {
    name: "Johns Hopkins Hospital",
    symbol: {
      type: "circle",
      fill: "#006064"
    }
  },
  {
    name: "Mayo Clinic",
    symbol: {
      type: "circle",
      fill: "#00796B"
    }
  },
  {
    name: "MGH",
    symbol: {
      type: "circle",
      fill: "#FFF59D"
    }
  }
];

export default class Chart extends Component {
  renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 72,
          backgroundColor: Colors.mainStrong,
          paddingTop: 24,
          padding: 8,
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          hitSlop={{ top: 8, right: 8, left: 8, bottom: 8 }}
        >
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../assets/images/icons8-left_4.png")}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginLeft: 4,
            color: "white"
          }}
        >
          Uploaded Documents
        </Text>
      </View>
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
      <StatusBar barStyle='light-content'/>
        {this.renderHeader()}
        <ScrollView
          contentContainerStyle={styles.container}
          style={{ flex: 1, backgroundColor: "#fff" }}
        >
          <Text
            style={{
              textAlign: "center",
              color: Colors.text,
              fontWeight: "600",
              fontSize: 18,
              marginTop: 48
            }}
          >
            Price Comparison for Lung Cancer Treatment
          </Text>
          <Text style={{fontWeight: '600', color: Colors.main, textAlign: 'center', fontSize: 24, marginTop: 8}}>38% Higher than Average</Text>
          <Svg width={Dimensions.get("window").width} height={200}>
            <VictoryLegend
              x={5}
              y={100}
              data={legendData}
              standalone={false}
              itemsPerRow={3}
            />
          </Svg>

          <VictoryChart domain={{ x: [0, 3] }}>
            <VictoryGroup offset={25} colorScale={"qualitative"}>
              <VictoryBar
                data={[
                  { x: 1, y: 35000 },
                  { x: 2, y: 26000 },
                  { x: 3, y: 50000 }
                ]}
              />
              <VictoryBar
                data={[
                  { x: 1, y: 20100 },
                  { x: 2, y: 14129 },
                  { x: 3, y: 72387 }
                ]}
              />
              <VictoryBar
                data={[
                  { x: 1, y: 39000 },
                  { x: 2, y: 42309 },
                  { x: 3, y: 92342 }
                ]}
              />
            </VictoryGroup>
          </VictoryChart>
        </ScrollView>
      </View>
    );
  }
}

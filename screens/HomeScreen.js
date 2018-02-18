import React, { Component } from "react";
import {
  Animated,
  View,
  Image,
  Button,
  Dimensions,
  Text,
  TouchableOpacity,
  Easing,
  StatusBar,
  StyleSheet
} from "react-native";
import Colors from "../constants/Colors";
import ElevatedView from "react-native-elevated-view";
import * as Animatable from "react-native-animatable";
import Carousel from "react-native-snap-carousel";
import moment from "moment";

const { width, height } = Dimensions.get("window");

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    animatedHeight: new Animated.Value(0),
    animatedHeight2: new Animated.Value(0),
    pages: [1, 2],
    index: 0
  };

  componentDidMount() {
    Animated.timing(this.state.animatedHeight, {
      toValue: height,
      duration: 2000,
      easing: Easing.quad
    }).start();
  }

  grow() {
    Animated.timing(this.state.animatedHeight2, {
      toValue: height,
      duration: 1000,
      easing: Easing.quad
    }).start();
  }

  shrink() {
    Animated.timing(this.state.animatedHeight2, {
      toValue: 0,
      duration: 1000,
      easing: Easing.quad
    }).start();
  }

  renderBG() {
    const { animatedHeight, animatedHeight2 } = this.state;
    return (
      <View
        style={{
          position: "absolute",
          width,
          height,
          left: 0,
          top: 0
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width,
            height: animatedHeight,
            backgroundColor: Colors.main
          }}
        />
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width,
            height: animatedHeight2,
            backgroundColor: Colors.blue2
          }}
        />

        <Image
          style={{ position: "absolute", left: 0, top: 0, width, height }}
          source={require("../assets/images/overlay.png")}
        />
      </View>
    );
  }

  renderHeader() {
    const { index } = this.state;
    const menu =
      index == 1 ? (
        <Image
          style={{ width: 24, height: 24 }}
          source={require("../assets/images/icons8-menu_filled_blue.png")}
        />
      ) : (
        <Image
          style={{ width: 24, height: 24 }}
          source={require("../assets/images/icons8-menu_filled.png")}
        />
      );
    return (
      <View style={{ height: 60, paddingTop: 24, padding: 8 }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 4 }}
        >
          <TouchableOpacity
            hitSlop={{ top: 8, right: 8, left: 8, bottom: 8 }}
            onPress={() => this.props.navigation.navigate("DrawerOpen")}
          >
            {menu}
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "600",
              color: Colors.textBlack,
              marginLeft: 8
            }}
          >
            Dashboard
          </Text>
        </View>
      </View>
    );
  }

  renderBox(color) {
    return (
      <Animatable.View
        animation="fadeInUp"
        delay={1800}
        duration={1500}
        style={{ marginTop: 48 }}
      >
        <ElevatedView
          elevation={24}
          style={{
            width: 250,
            backgroundColor: "#f7f7f7",
            padding: 16,
            margin: 16,
            borderRadius: 8
          }}
        >
          <Text style={{ color: Colors.text }}>My Balance</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 36, height: 36 }}
              source={
                color == Colors.mainStrong
                  ? require("../assets/images/mbcoin.png")
                  : require("../assets/images/mbcoin_blue.png")
              }
            />
            <Text
              style={{
                color,
                fontWeight: "600",
                fontSize: 48,
                marginVertical: 8
              }}
            >
              100.02
            </Text>
          </View>
          <Text style={{ color: "#7d7d7d" }}>
            {moment().format("MMM Do, YYYY")}
          </Text>
        </ElevatedView>
      </Animatable.View>
    );
  }

  renderBox2(color) {
    return (
      <Animatable.View
        animation="fadeInUp"
        delay={2400}
        duration={1500}
        style={{ marginTop: 48 }}
      >
        <ElevatedView
          elevation={24}
          style={{
            width: 250,
            backgroundColor: "#f7f7f7",
            padding: 16,
            margin: 16,
            borderRadius: 8
          }}
        >
          <Text style={{ color: "#7d7d7d" }}>Pending Documents</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 16
            }}
          >
            <Image
              style={{ width: 32, height: 32 }}
              source={require("../assets/images/icons8-document.png")}
            />
            <View style={{ marginLeft: 8 }}>
              <Text style={{ color, fontSize: 18 }}>Medical Bill v1.0</Text>
              <Text style={{ color: Colors.text, fontSize: 12 }}>Pending</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Docs")}
          >
            <Text style={{ textAlign: "right" }}>See All Documents</Text>
          </TouchableOpacity>
        </ElevatedView>
      </Animatable.View>
    );
  }

  renderBox3() {
    return (
      <Animatable.View
        animation="fadeInUp"
        delay={2400}
        duration={1500}
        style={{ alignSelf: "center", marginTop: 80 }}
      >
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Send')}>
          <ElevatedView
            elevation={24}
            style={{
              width: 250,
              backgroundColor: "#f7f7f7",
              padding: 16,
              margin: 16,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginVertical: 16
              }}
            >
              <Image
                style={{ width: 32, height: 32 }}
                source={require("../assets/images/icons8-donate.png")}
              />
              <View style={{ marginLeft: 8 }}>
                <Text style={{ color: Colors.blue2, fontSize: 18 }}>
                  Send MBC
                </Text>
              </View>
            </View>
          </ElevatedView>
        </TouchableOpacity>
      </Animatable.View>
    );
  }
  renderBox4() {
    return (
      <Animatable.View
        animation="fadeInUp"
        delay={2400}
        duration={1500}
        style={{ alignSelf: "center", marginTop: 48 }}
      >
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Receive')}>
          <ElevatedView
            elevation={24}
            style={{
              width: 250,
              backgroundColor: "#f7f7f7",
              padding: 16,
              margin: 16,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginVertical: 16
              }}
            >
              <Image
                style={{ width: 32, height: 32 }}
                source={require("../assets/images/icons8-receive_cash.png")}
              />
              <View style={{ marginLeft: 8 }}>
                <Text style={{ color: Colors.blue2, fontSize: 18 }}>
                  Receive MBC
                </Text>
              </View>
            </View>
          </ElevatedView>
        </TouchableOpacity>
      </Animatable.View>
    );
  }

  renderCameraButton() {
    const size = 64;
    return (
      <Animatable.View
        style={{
          position: "absolute",
          bottom: 24,
          alignSelf: "center"
        }}
        animation="slideInUp"
        delay={3000}
        duration={1000}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Camera");
          }}
        >
          <View
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: 2,
              borderColor: "white",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{ width: 32, height: 32 }}
              source={require("../assets/images/icons8-camera.png")}
            />
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  }
  renderDots() {
    const { index, pages } = this.state;
    const bigSize = 12;
    const smallSize = 8;
    const selectedStyle = {
      width: bigSize,
      height: bigSize,
      borderRadius: bigSize / 2,
      backgroundColor: index == 1 ? Colors.blue2 : Colors.main,
      marginHorizontal: 4
    };
    const nonSelectedStyle = {
      width: smallSize,
      height: smallSize,
      borderRadius: smallSize / 2,
      backgroundColor: "#eee",
      marginHorizontal: 4
    };

    const dots = pages.map((item, i) => (
      <View key={i} style={index == i ? selectedStyle : nonSelectedStyle} />
    ));

    return (
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          alignItems: "center",
          top: 72,
          alignSelf: "center"
        }}
      >
        {dots}
      </View>
    );
  }

  _renderItem({ index }) {
    if (index == 0) {
      return (
        <View style={{ width, height }}>
          {this.renderBox(Colors.mainStrong)}
          {this.renderBox2(Colors.mainStrong)}
        </View>
      );
    } else {
      return (
        <View style={{ width, height }}>
          {this.renderBox3()}
          {this.renderBox4()}
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" animated={true} />
        {this.renderBG()}
        {this.renderHeader()}
        <Carousel
          data={this.state.pages}
          renderItem={i => this._renderItem(i)}
          onSnapToItem={index => {
            if (index == 1) {
              this.grow();
            } else {
              this.shrink();
            }
            this.setState({ index });
          }}
          sliderWidth={width}
          itemWidth={width}
        />
        {this.renderDots()}
        {this.renderCameraButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

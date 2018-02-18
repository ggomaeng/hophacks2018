import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  NativeModules
} from "react-native";
import { DangerZone } from "expo";
import Carousel from "react-native-snap-carousel";
import { NavigationActions, withNavigation } from "react-navigation";
const { Lottie } = DangerZone;
const { width, height } = Dimensions.get("window");
import Colors from "../constants/Colors";

export default class GuideScreen extends Component {
  static navigationOptions = {
    header: null
  }
  state = {
    index: 0,
    success: false,
    animations: [
      {
        animation: require("../lottie/wallet.json"),
        title: `Save Money`,
        desc: `See how much you're overpaying on your medical bill`
      },
      {
        animation: require("../lottie/doc.json"),
        title: `Automated Process`,
        desc: `Let us compare your bills to the pool of available data`
      },
      {
        animation: require("../lottie/phonological.json"),
        title: `Blockchain Technology`,
        desc: `Leading transparent and secure technology`
      }
    ]
  };

  componentWillUnmount() {
    const {animations} = this.state;
    animations.map((i, index) => {
      this[`animation${index}`].reset();
    })
  }

  _renderItem({ item, index }) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Landing" })]
    });

    if (Platform.OS === "android") {
      authFunction = () => {
        this.props.navigation.dispatch(resetAction);
      };
    } else if (Platform.OS === "ios") {
      authFunction = async () => {
        let result = await NativeModules.ExponentFingerprint.authenticateAsync(
          "Please verify your identity"
        );
        if (result.success) {
          this.setState({ success: true });
          this.props.navigation.dispatch(resetAction);
          // this.props.navigation.navigate('Landing');
          // alert('Success!');
        } else {
          this.setState({ success: false });
          this.props.navigation.dispatch(resetAction);
          // alert('Cancel!');
        }
      };
    }

    const button =
      index == 2 ? (
        <TouchableOpacity
          onPress={() => authFunction()}
          style={{
            paddingHorizontal: 32,
            paddingVertical: 8,
            borderRadius: 48,
            backgroundColor: Colors.main,
            marginTop: 64
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
            Get Started
          </Text>
        </TouchableOpacity>
      ) : null;
    return (
      <View
        style={{
          width,
          height,
          alignItems: "center",
          paddingTop: 100
        }}
      >
        <View style={{ marginBottom: 64 }}>
          <Lottie
            ref={animation => {
              this[`animation${index}`] = animation;
              if (animation) {
                animation.play();
              }
            }}
            style={{
              width: index == 3 ? 150 : 200,
              height: index == 3 ? 150 : 200
            }}
            source={item.animation}
          />
        </View>
        <Text style={{ fontSize: 24, color: Colors.main, fontWeight: "600" }}>
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: Colors.text,
            fontWeight: "300",
            marginTop: 8,
            textAlign: "center",
            marginHorizontal: 64
          }}
        >
          {item.desc}
        </Text>
        {button}
      </View>
    );
  }

  renderDots() {
    const { index, animations } = this.state;
    const bigSize = 14;
    const smallSize = 12;
    const selectedStyle = {
      width: bigSize,
      height: bigSize,
      borderRadius: bigSize / 2,
      backgroundColor: Colors.main,
      marginHorizontal: 4
    };
    const nonSelectedStyle = {
      width: smallSize,
      height: smallSize,
      borderRadius: smallSize / 2,
      backgroundColor: "#eee",
      marginHorizontal: 4
    };

    const dots = animations.map((item, i) => (
      <View key={i} style={index == i ? selectedStyle : nonSelectedStyle} />
    ));

    return (
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          alignItems: "center",
          bottom: 32,
          alignSelf: "center"
        }}
      >
        {dots}
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Carousel
          data={this.state.animations}
          renderItem={i => this._renderItem(i)}
          onSnapToItem={index => this.setState({ index })}
          sliderWidth={width}
          itemWidth={width}
        />
        {this.renderDots()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    width,
    height
  }
});

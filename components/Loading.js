import React from "react";
import { Dimensions, StyleSheet, Modal, View, Text } from "react-native";
import { DangerZone } from "expo";
const { Lottie } = DangerZone;
const { width, height } = Dimensions.get("window");
import Colors from '../constants/Colors';

export default class App extends React.Component {
  state = {
    animation: require("../lottie/preloader.json")
  };

  _playAnimation() {
    if (this.animation) {
      this.animation.play();
    }
  }

  render() {
    if(!this.props.visible) {
      return null
    }
    return (
      <View style={{flex: 1}}>
        {this.state.animation && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              paddingTop: 64,
            }}
          >
            <View>
              <Lottie
                loop
                ref={animation => {
                  this.animation = animation;
                  if(animation) animation.play();
                }}
                style={{
                  width: 200,
                  height: 200
                }}
                source={this.state.animation}
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                backgroundColor: "transparent",
                color: Colors.textBlack,
                fontSize: 14,
                fontWeight: "700"
              }}
            >
              {this.props.text}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

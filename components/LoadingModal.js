import React from "react";
import { Dimensions, StyleSheet, Modal, View, Text } from "react-native";
import { DangerZone } from "expo";
const { Lottie } = DangerZone;
const { width, height } = Dimensions.get("window");

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
    const { visible } = this.props;

    return (
      <Modal
        onShow={() => {
          this._playAnimation();
        }}
        onDismiss={() => {
            // this.animation.reset();
        }}
        animationType="fade"
        visible={visible}
        transparent={true}
        style={styles.container}
      >
        {this.state.animation && (
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,.8)",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View>
              <Lottie
                loop
                ref={animation => {
                  this.animation = animation;
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
                color: "white",
                fontSize: 14,
                fontWeight: "700"
              }}
            >
              {this.props.text}
            </Text>
          </View>
        )}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

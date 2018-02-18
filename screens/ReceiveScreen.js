import React, { Component } from "react";
import {
  View,
  Dimensions,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Slider,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as Animatable from "react-native-animatable";

const { width, height } = Dimensions.get("window");
import Colors from "../constants/Colors";

export default class Receive extends Component {
  state = {
    value: 0.0,
    resultValue: 0,
    message: "",
    generated: false,
    args: {}
  };
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
          Request MBC
        </Text>
      </View>
    );
  }
  render() {
    const { value, message, generated, args } = this.state;
    var content;
    if (generated) {
      content = (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#fff'}}
        >
          <Animatable.View animation="fadeIn" duration={1500}>
            <QRCode
              size={width - 100}
              logo={require("../assets/images/mbcoin.png")}
              logoSize={32}
              color={Colors.text}
              value={JSON.stringify(args)}
            />
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={300} duration={1500}>
            <TouchableOpacity
              onPress={() => {
                const args = {
                  value,
                  message
                };
                this.setState({
                  generated: false
                });
              }}
              style={{
                paddingHorizontal: 24,
                paddingVertical: 8,
                backgroundColor: Colors.main,
                borderRadius: 32,
                marginTop: 24
              }}
            >
              <Text style={{ fontWeight: "500", color: "white" }}>
                Re-generate QR
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      );
    } else {
      content = (
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff"
          }}
        >
          <Animatable.View
            animation="fadeInUp"
            duration={1500}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 32
            }}
          >
            <Image
              source={require("../assets/images/mbcoin.png")}
              style={{ width: 48, height: 48 }}
            />
            <Text style={{ color: Colors.text }}>10.00 MBC</Text>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" delay={500} duration={1500}>
            <TextInput
              value={value + ""}
              onChangeText={value => this.setState({ value })}
              keyboardType="decimal-pad"
              style={{
                width: 200,
                height: 40,
                borderWidth: 2,
                borderColor: Colors.text,
                color: Colors.main,
                paddingLeft: 4
              }}
            />

            <TextInput
              value={message}
              onChangeText={message => this.setState({ message })}
              multiline={true}
              placeholder={"Message (Optional)"}
              placeholderTextColor={Colors.text}
              style={{
                width: 200,
                height: 80,
                borderWidth: 2,
                borderColor: Colors.text,
                color: Colors.main,
                justifyContent: "center",
                alignItems: "center",
                padding: 4,
                marginTop: 24
              }}
            />
          </Animatable.View>
          <Animatable.View animation="fadeInUp" delay={1200} duration={1500}>
            <TouchableOpacity
              onPress={() => {
                const args = {
                  value,
                  message
                };

                if (args.value > 0) {
                  this.setState({
                    args,
                    generated: true
                  });
                }
              }}
              style={{
                paddingHorizontal: 24,
                paddingVertical: 8,
                backgroundColor: Colors.main,
                borderRadius: 32,
                marginTop: 24
              }}
            >
              <Text style={{ fontWeight: "500", color: "white" }}>
                Generate QR
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </KeyboardAvoidingView>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='light-content'/>
        {this.renderHeader()}
        {content}
      </View>
    );
  }
}

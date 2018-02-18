import React from "react";
import {
  Alert,
  Text,
  Image,
  View,
  TouchableOpacity,
  Modal,
  StatusBar,
  StyleSheet,
  Dimensions
} from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import Colors from "../constants/Colors";

const { width, height } = Dimensions.get("window");

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    modalVisible: false,
    qrCode: {
      value: 1,
      message: "Some really cool message should go here yeah!"
    }
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  renderModal() {
    const { qrCode, modalVisible } = this.state;
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            paddingVertical: 64,
            paddingHorizontal: 32,
            backgroundColor: "rgba(0,0,0,.8)"
          }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ modalVisible: false })}
            style={{ position: "absolute", width, height }}
          />
          <View
            style={{
              backgroundColor: "white",
              flex: 1,
              padding: 16,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center'}}>
              <Image
                style={{ width: 48, height: 48 }}
                source={require("../assets/images/mbcoin.png")}
              />
              <Text
                style={{
                  fontSize: 24,
                  color: Colors.main,
                  textAlign: "center"
                }}
              >
                {Number(qrCode.value).toFixed(2)}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.text,
                  marginVertical: 24,
                  textAlign: "center"
                }}
              >
                {qrCode.message}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => this.setState({ modalVisible: false })}
              style={{
                width: 250,
                alignItems: "center",
                paddingHorizontal: 24,
                paddingVertical: 16,
                backgroundColor: Colors.main,
                borderRadius: 32
              }}
            >
              <Text style={{ color: "white" }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
          {this.renderModal()}
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    this.setState({ modalVisible: true, qrCode: JSON.parse(data) });
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}

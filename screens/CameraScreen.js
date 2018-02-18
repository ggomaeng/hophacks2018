import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from "react-native";
import { Camera, Permissions } from "expo";
import Colors from "../constants/Colors";
import {uploadPicture} from '../utils/firebaseUtil';
import Loading from '../components/LoadingModal';
const { width, height } = Dimensions.get("window");

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    taken: false,
    uri: null,
    loading: false,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  takePicture = async () => {
    console.log("taking picture");
    if (this.camera) {
      const options = {
        quality: 0,
        base64: true
      };
      this.camera.takePictureAsync(options).then(({ uri, base64 }) => {
        // console.log(data);
        // this.setState({ uri, base64, taken: true });
        this.setState({ uri, taken: true });
      });
    }
  };

  upload() {
      this.setState({loading: true})
      const options = {
        format: 'jpeg',
        quality: 0,
        result: 'base64',
        height: 534,
        width: 300
      }
      Expo.takeSnapshotAsync(this.image, options).then((data) => {
        console.log(data);
        uploadPicture(data).then(() => {
          this.setState({loading: false})
            this.props.navigation.goBack();
        });
      })
     
      // uploadPicture(this.state.base64).then(() => {
      //   this.setState({loading: false})
      //     this.props.navigation.goBack();
      // });
  }

  renderCamera() {
    return (
      <Camera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1
        }}
        style={{ flex: 1 }}
        type={this.state.type}
        autoFocus={"on"}
      >
        <Image
          style={{ position: "absolute", top: 0, left: 0, width, height }}
          source={require("../assets/images/bill.png")}
        />
        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <TouchableOpacity onPress={() => this.takePicture()}>
            <Image
              style={{ width: 48, height: 48, marginBottom: 24 }}
              source={require("../assets/images/icons8-camera.png")}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    );
  }

  renderImage() {
    const { uri } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Image ref={ref => this.image = ref} style={{ flex: 1, paddingTop: 24 }} source={{ uri }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 8,
            height: 48,
            backgroundColor: "white"
          }}
        >
          <TouchableOpacity
            hitSlop={{ top: 8, right: 8, left: 8, bottom: 8 }}
            onPress={() => this.setState({ taken: false, uri: "" })}
          >
            <Text style={{ fontSize: 18, color: Colors.main }}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={{ top: 8, right: 8, left: 8, bottom: 8 }}
            onPress={() => this.upload()}
          >
            <Text style={{ fontSize: 18, color: Colors.textBlack }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { hasCameraPermission, taken, loading } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      this.props.navigation.goBack();
    } else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" animated={true} />
          {taken ? this.renderImage() : this.renderCamera()}
          <Loading visible={loading} text={'Uploading Document'}/>
        </View>
      );
    }
  }
}

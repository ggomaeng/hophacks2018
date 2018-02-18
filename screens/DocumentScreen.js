import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar
} from "react-native";
import Colors from "../constants/Colors";
import Loading from "../components/Loading";
import * as Animatable from "react-native-animatable";
import moment from "moment";

import { loadDocuments } from "../utils/firebaseUtil";

export default class Docs extends Component {
  state = {
    loading: false,
    documents: []
  };
  componentDidMount() {
    //loadstuff
    this.setState({ loading: true });
    loadDocuments().then(snapshot => {
      this.setState({
        documents: Object.values(snapshot.val()),
        loading: false
      });
    });
  }
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

  _renderItem(item) {
    return (
      <Animatable.View animation="fadeInUp">
        <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Chart')}
          style={{
            padding: 12,
            borderBottomColor: "#eee",
            borderBottomWidth: StyleSheet.hairlineWidth
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{ width: 32, height: 32 }}
                source={require("../assets/images/icons8-document.png")}
              />
              <Text
                style={{ color: Colors.main, fontWeight: "600", marginLeft: 4 }}
              >
                {item.id}
              </Text>
            </View>
            <View >
            <Text style={{fontWeight: '300', color: Colors.textBlack, marginRight: 8}}>PENDING</Text>
            </View>
          </View>
          <Text style={{ marginTop: 8, color: Colors.text }}>
            {moment(item.timestamp).format("MMMM Do YYYY, h:mm:ss a")}
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  }

  renderContent() {
    const { loading, documents } = this.state;
    if (loading) {
      return <Loading visible={loading} text={"Fetching Data"} />;
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={documents}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => this._renderItem(item)}
        />
      </View>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar barStyle="light-content" />
        {this.renderHeader()}
        {this.renderContent()}
      </View>
    );
  }
}

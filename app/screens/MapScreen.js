import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import Map from "../components/Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../components/NavigateCard";
import RideOptions from "../components/RideOptions";
import { Icon } from "react-native-elements";

const windowHeight = Dimensions.get("window").height;
const Stack = createNativeStackNavigator();

const MapScreen = () => {
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: "#eeeeee",
          position: "absolute",
          top: 64,
          left: 32,
          zIndex: 50,
          padding: 12,
          //shadow large //rounded full
        }}
      >
        <Icon name="menu" />
      </TouchableOpacity>

      <View style={styles.map}>
        <Map />
      </View>

      <View style={styles.menu}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="NavigateCard" component={NavigateCard} />
          <Stack.Screen name="RideOptionsCard" component={RideOptions} />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    height: windowHeight / 2,
  },
  menu: {
    height: windowHeight / 2,
  },
});

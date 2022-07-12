import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import { selectTravelTime } from "../redux/slices/navReducer";
import Intl from "intl";
import "intl/locale-data/jsonp/en-GB";

const data = [
  {
    id: "Uber-X-123",
    title: "Uber X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptions = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTime);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "gray",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={styles.touchable}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={styles.rides}>
          Select a Ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.seprator} />}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            style={[
              styles.carsStyle,
              id === selected?.id && { backgroundColor: "#eeeeee" },
            ]}
            onPress={() => setSelected(item)}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View style={styles.carsContainer}>
              <Text style={styles.carsTitle}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text}</Text>
            </View>
            <Text style={styles.carsSubTitle}>
              £{" "}
              {new Intl.NumberFormat(
                "en-gb" <
                  {
                    style: "currency",
                    current: "GBP",
                  }
              ).format(
                (travelTimeInformation?.duration.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          disabled={!selected}
          style={[styles.button, !selected && { backgroundColor: "lightgray" }]}
        >
          <Text style={styles.buttonText}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexGrow: 1,
    overflow: "scroll",
  },
  touchable: {
    position: "absolute",
    top: 12,
    left: 20,
    zIndex: 50,
    padding: 12,
  },
  rides: {
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 20,
    fontWeight: "700",
  },
  carsStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  carsContainer: {
    marginLeft: 24,
  },
  carsTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  carsSubTitle: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 12,
    margin: 12,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
  seprator: {
    backgroundColor: "#eeeeee",
    height: 1,
  },
});

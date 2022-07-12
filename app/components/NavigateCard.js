import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../redux/slices/navReducer";
import { useNavigation } from "@react-navigation/native";
import NavFourites from "./NavFourites";
import { Icon } from "react-native-elements";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.greetings}>Hello BrownBoy code</Text>
      <View style={styles.bottomContainer}>
        <View>
          <GooglePlacesAutocomplete
            styles={styles.searchInput}
            placeholder="where to ?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            enablePoweredByContainer={false}
            fetchDetails={true}
            returnKeyType={"search"}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
            }}
            minLength={2}
          />
        </View>
        {/* 
        <NavFourites /> */}

        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.carDetailsTouch}
            onPress={() => navigation.navigate("RideOptionsCard")}
          >
            <Icon name="car" type="font-awesome" color="white" size={18} />
            <Text
              style={{ color: "white", textAlign: "right", marginLeft: 10 }}
            >
              Rides
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.carDetailsTouch, { backgroundColor: "white" }]}
          >
            <Icon
              name="fast-food-outline"
              type="ionicon"
              color="black"
              size={18}
            />
            <Text
              style={{ color: "black", textAlign: "right", marginLeft: 10 }}
            >
              Eats
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-evenly",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: "auto",
    borderTop: 1,
    borderColor: "#eeeeee",
  },
  carDetailsTouch: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "black",
    width: 96,
    paddingLeft: 12,
    paddingRight: 12,
    paddingVertical: 12,
    borderRadius: 12,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  greetings: {
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 20,
  },
  bottomContainer: {
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
    borderStyle: "solid",
    flexShrink: 10,
    paddingHorizontal: 20,
  },
  searchInput: {
    container: {
      backgroundColor: "white",
      paddingTop: 20,
      flex: 0,
    },
    textInput: {
      backgroundColor: "#DDDDDF",
      borderRadius: 0,
      fontSize: 18,
    },
    textInputContainer: {
      paddingHorizantal: 20,
      paddingBottom: 0,
    },
  },
});

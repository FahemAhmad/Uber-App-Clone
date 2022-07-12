import { Image, View, StyleSheet } from "react-native";
import React from "react";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch } from "react-redux";

import { setDestination, setOrigin } from "../redux/slices/navReducer";
import NavFourites from "../components/NavFourites";

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.spaces}>
        <Image
          style={styles.image}
          source={{ uri: "https://links.papareact.com/gzs" }}
        />

        <GooglePlacesAutocomplete
          styles={styles.input}
          placeholder="Where from ?"
          debounce={400}
          enablePoweredByContainer={false}
          nearbyPlacesAPI="GooglePlacesSearch"
          minLength={2}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={"search"}
        />
        <NavOptions />
        <NavFourites />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    marginTop: 8,
  },
  spaces: {
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  input: {
    container: {
      flex: 0,
    },
    textInput: {
      fontSize: 18,
    },
  },
});

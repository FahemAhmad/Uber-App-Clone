import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { selectOrigin } from "../redux/slices/navReducer";
import { useSelector } from "react-redux";

const data = [
  {
    id: 1,
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: 2,
    title: "Order found",
    image: "https://links.papareact.com/28w",
    screen: "EatScreen",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate("MapScreen")}
          disabled={!origin}
        >
          <View style={!origin && styles.subContainer}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <Text style={styles.text}>{item.title}</Text>
            <Icon
              style={styles.icon}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingLeft: 24,
    paddingBottom: 16,
    paddingRight: 8,
    backgroundColor: "#EEEEEE",
    margin: 8,
    width: 160,
    borderRadius: 10,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  text: {
    marginTop: 8,
    fontWeight: "600",
  },
  icon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "black",
    marginTop: 16,
    width: 40,
  },
  subContainer: {
    opacity: 0.5,
  },
});

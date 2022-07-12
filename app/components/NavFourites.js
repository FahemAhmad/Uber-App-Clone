import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements/dist/icons/Icon";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Code Street, London, UK",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "London Eye, London, UK",
  },
];

const NavFourites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.seprator} />}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity style={styles.touch}>
          <Icon
            style={styles.icons}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={styles.location}>{location}</Text>
            <Text style={styles.destination}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFourites;

const styles = StyleSheet.create({
  touch: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  icons: {
    marginRight: 16,
    borderRadius: 9,
    backgroundColor: "#EEEEEE",
    padding: 12,
  },
  location: {
    fontWeight: "600",
    fontSize: 16,
  },
  destination: {
    color: "gray",
  },
  seprator: {
    backgroundColor: "#eeeeee",
    height: 1,
  },
});

import { StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTime,
} from "../redux/slices/navReducer";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch } from "react-redux";

var axios = require("axios");

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  const dispatch = useDispatch();

  const mapRef = useRef(null);

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      var config = {
        method: "get",
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}%2C%20DC&destinations=${destination.description}%20York%20City%2C%20NY&units=imperial&key=${GOOGLE_MAPS_API_KEY}`,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          const data = response.data;

          dispatch(setTravelTime(data.rows[0].elements[0]));
        })

        .catch(function (error) {
          console.log(error);
        });
    };
    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_API_KEY]);

  return (
    <MapView
      ref={mapRef}
      style={styles.maps}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor={"black"}
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;
const styles = StyleSheet.create({
  maps: {
    flex: 1,
  },
});

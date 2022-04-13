import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { auth } from "./../../firebase";
import LocationTracking from "../screens/LocationScreen";
//Files
import uhclStyle from "../styles/mapStyle";

const handleSignout = () => {
  auth
    .signOut()
    // need to get navigation back to login working for here
    .catch((error) => alert(error.message));
};

var region = {
  latitude: 29.584,
  longitude: -95.102,
  latitudeDelta: 0.015,
  longitudeDelta: 0.015,
};

export default function MapComponent() {
  return (
    
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={uhclStyle} // custom style from mapstyles.js
        initialRegion={region}
        showUserLocation
      >
        
        <Marker 
          coordinate={
            { latitude: 29.578252, 
            longitude: -95.104159 }
          }>
          <Callout>
            <Image source={require("../images/delta-building.jpg")} />
            <Text>Real Time Bus</Text>
          </Callout>
          <Image
            style={styles.markerImage}
            source={require("../images/hawk-logo.png")}
          />
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    backgroundColor: "#0782F9",
    flex: 5,
  },
  signOutContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "25%",
    padding: 10,
    borderRadius: 10,
    position: "absolute",
    bottom: 15,
    right: 10,
  },
  buttonText: {
    color: "white",
    alignItems: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  title: {
    fontSize: 40,
  },
  map: {
    // height: imageWidth * (5 / 3),
    height: "100%",
    zIndex: -1,
  },
  markerImage: {
    width: 30,
    height: 30,
  },
  calloutCustomization: {
    // Hold
  },
});

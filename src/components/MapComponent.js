import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { auth } from "./../../firebase";
import { db } from "./../../firebase";
import LocationTracking from "../screens/LocationScreen";
//Files
import uhclStyle from "../styles/mapStyle";
import { GOOGLE_MAPS_API_KEY } from "../constants/MapsAPIKey";

const id = "HKxoa3D5yxnbIzbe3rY9";

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

var busLatitude;
var busLongitude;

const coordinates = [
  { latitude: 29.561950133, longitude: -95.115615515 },

  { latitude: 29.552874933427443, longitude: -95.12420096370195 },

  { latitude: 29.569863566531023, longitude: -95.11018505215024 },

  { latitude: 29.574083302941812, longitude: -95.10754740123505 },

  { latitude: 29.57689945321822, longitude: -95.10630695303462 },

  { latitude: 29.578042477429793, longitude: -95.1028376873912 },

  { latitude: 29.58665434643349, longitude: -95.0949528817226 },

  { latitude: 29.585956169582044, longitude: -95.09822634535767 },

  { latitude: 29.58533148291235, longitude: -95.09792277159933 },

  { latitude: 29.584092478872343, longitude: -95.09768513897552 },

  { latitude: 29.582925, longitude: -95.097646 },
];

// class MapWithMarkers extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {markers: this.props.markers};
//   }

//   updateMarker() {
//     this.setState(prevState => {
//       const markers = [...prevState.markers];
//       markers[index] = {lat: busLatitude, lng: busLongitude};
//       return {markers}
//     })
//   }

//   componentDidMount() {
//     this.intervalId = setInterval(this.updateMarker.bind(this), 1000);
//   }

//   componentWillUnmount() {
//     clearInterval(this.intervalId);
//   }

//   render() {
//     return (
//       <Map center={this.prop.center} zoom={this.props.zoom} places={this.state.markers} />
//     );
//   }

// }

export default function MapComponent() {
  const [busLong, setLong] = useState("null");
  const [busLat, setLat] = useState("null");
  const [error, setError] = useState("null");

  useEffect(() => {
    let ref = db.collection("driverLocation");
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        var busData = [];

        snapshot.docs.forEach((doc) => {
          var data = doc.data();
          var busLocation = data.busLocation;
          busLatitude = busLocation.latitude;
          busLongitude = busLocation.longitude;
          console.log("Current Bus Latitude:", busLatitude);
          console.log("Current Bus Longitude:", busLongitude);
          setLong(busLongitude);
          setLat(busLatitude);
        });
      },
      (error) => {
        setError('This is broken');
        return;
      }
    );

    // unsubscribe on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={uhclStyle} // custom style from mapstyles.js
        initialRegion={region}
        followsUserLocation
        showsUserLocation
        tracksViewChanges
        redraw
      >
        {busLong ? (
          <Marker 
          coordinate={{
            latitude: busLat,
            longitude: busLong,
          }}
          title="Real-Time Shuttle" >
          <Image
            source={require("../images/shuttleIcon.png")}
          />
          </Marker>
        ):
        <Text>{error}</Text>
        }


        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[3]}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={5}
          strokeColor="#0078AE"
        />

        <MapViewDirections
          origin={coordinates[1]}
          destination={coordinates[2]}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={5}
          strokeColor="#0078AE"
        />

        <MapViewDirections
          origin={coordinates[2]}
          destination={coordinates[3]}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={5}
          strokeColor="#0078AE"
        />
        <MapViewDirections
          origin={coordinates[3]}
          destination={coordinates[4]}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={5}
          strokeColor="#0078AE"
        />
        <MapViewDirections
          origin={coordinates[4]}
          destination={coordinates[5]}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={5}
          strokeColor="#0078AE"
        />
        <MapViewDirections
          origin={coordinates[5]}
          destination={coordinates[6]}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={5}
          strokeColor="#0078AE"
        />
        <MapViewDirections
          origin={coordinates[6]}
          destination={coordinates[10]}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={5}
          strokeColor="#0078AE"
        />
        <MapViewDirections
          origin={coordinates[10]}
          destination={coordinates[1]}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={5}
          strokeColor="#0078AE"
        />
      </MapView>
    </View>
  );
}

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

import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import * as Location from "expo-location";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

//component to ask permission from driver and ask Driver to share the location of the
// updated 4-11-22
export default function ShareLocation() {
  //new code

  const [location, setLocation] = useState({
    longitude: "",
    latitude: "",
  });

  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);

  const [send, setSend] = useState(false);

  //---------------------------here starts the firebase pushing of the current location-------------

  const locationRef = collection(db, "driverLocation");

  const upload = (id, longitude, latitude) => {
    const newFields = {
      longitude: location.longitude,
      latitude: location.latitude,
    };
    const locationDoc = doc(db, "driverLocation", id);
    //updateDoc(locationDoc, newFields);
    updateDoc(locationDoc, { longitude: longitude, latitude: latitude });
  };

  //---------------------------here ends the pushing of the firebase current  location-----------------

  //-----------------creating the useEffect function to upload code used in Hackathon

  useEffect(() => {
    // Setting the required permission
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Getting user location as latitude and longitude
      let location = await Location.getCurrentPositionAsync({});
      //setLocation(location);

      // Setting Map Region
      let mapCordinate = {
        longitude: Number(location.coords.longitude),
        latitude: Number(location.coords.latitude),
      };
      setLocation(mapCordinate);
    })();
  }, []);

  //----------------ends here useEffect---------------------

  {
    /*
  // Setting the required permission
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    // Getting user location as latitude and longitude
    let locate = await Location.getCurrentPositionAsync({});
    //setLocation(JSON.stringify(location));
    setLocation({
      longitude: Number(locate.coords.longitude),
      latitude: Number(locate.coords.latitude),
    });
  })();

*/
  }

  //useeffect hooks
  useEffect(() => {
    const interval = setInterval(() => {
      //let locate = Location.getCurrentPositionAsync({});
      //setLocation(JSON.stringify(locate));
      let id = "HKxoa3D5yxnbIzbe3rY9";
      upload(id, location.longitude, location.latitude);
      console.log("Data sent to server");
    }, 5000);
  }, [location]);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, Driver. Welcome to the job!!</Text>

      <View style={{ flexDirection: "row" }}>
        <View style={styles.button1}>
          <Button
            title="Share location"
            color="#f194ff"
            type="solid"
            onPress={() => {
              alert(
                "location sharing now " +
                  location.longitude +
                  " " +
                  location.latitude
              );
              console.log(location);
              setSend(true);
            }}
          ></Button>
        </View>

        <View style={styles.button2}>
          <Button
            title="Stop sharing location"
            color="red"
            type="solid"
            onPress={() => {
              alert(
                "location sharing now " +
                  location.longitude +
                  " " +
                  location.latitude
              );
              setSend(false);
            }}
          ></Button>
        </View>
      </View>

      {/*} 
       
       Uncomment this comment for showing current location
       
       <Text>
          {location
            ? "Your location is " + location
            : "It is getting loaded"}
        </Text>
  
          */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },

  button1: {
    backgroundColor: "rgba(78, 116, 289, 1)",
    borderRadius: 3,
    marginRight: 3,
  },
  button2: {
    backgroundColor: "rgba(78, 116, 289, 1)",
    borderRadius: 3,
    color: "red",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 40,
  },
});

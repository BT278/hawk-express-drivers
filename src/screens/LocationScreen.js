import React, { useEffect, useState } from "react";
import { Text, View, Button, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { styleSheet } from "../styles/accountStyle";
import DropDownPicker from "react-native-dropdown-picker";
import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const LOCATION_TASK_NAME = "LOCATION_TASK_NAME";
const id = "HKxoa3D5yxnbIzbe3rY9";
const ref = db.collection('driverLocation');

// Define the background task for location tracking
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    // Extract location coordinates from data
    const { locations } = data;
    const location = locations[0];
    if (location) {
      const newFields = {
        // longitude: location.coords.longitude,
        // latitude: location.coords.latitude
        busLocation: location.coords
      };
      const updatedDocument = ref.doc(id).update(newFields);      
      console.log("Location Data sent");
    }
  }
});

export default function LocationTracking({ navigation }) {
  // Retrieve Location Data from Firebase
  useEffect(() => {
    let ref = db.collection("driverLocation");

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          // console.log({ ...doc.data() });
          let data = ({ ...doc.data("latitude") });
          // var busLong = data["longitude"].toNumber();
          console.log("latitude: ", data);

        });
      },
      (error) => {
        console.log(error);
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, []);

  // Define position state: {latitude: number, longitude: number}
  const [position, setPosition] = useState(null);

  // Request permissions right after starting the app
  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync();
      if (foreground.granted)
        await Location.requestBackgroundPermissionsAsync();
    };
    requestPermissions();
  }, []);

  // Start location tracking in background
  const startBackgroundUpdate = async () => {
    // Don't track position if permission is not granted
    const { granted } = await Location.getBackgroundPermissionsAsync();
    if (!granted) {
      console.log("location tracking denied");
      return;
    }

    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME);
    if (!isTaskDefined) {
      console.log("Task is not defined");
      return;
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    );
    if (hasStarted) {
      console.log("Already started");
      return;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      // For better logs, we set the accuracy to the most sensitive option
      accuracy: Location.Accuracy.BestForNavigation,
      // Make sure to enable this notification if you want to consistently track in the background
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Location",
        notificationBody: "Location tracking in background",
        notificationColor: "#fff",
      },
    });
  };

  // Stop location tracking in background
  const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    );
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      console.log("Location tacking stopped");
    }
  };

  return (

    <View style={styleSheet.container}>
      <Image
        source={require("../images/hawk-logo.png")}
        style={styles.image}
      />

      <View style={styleSheet.titleContainer}>
        <Text style={styleSheet.titleStyle}>Hawk Express Tracker</Text>
        <Text style={styleSheet.subtitleLabel}>
          Manage Your Location Sharing
        </Text>
      </View>

      <TouchableOpacity 
          style={styles.startSharingButton}
          onPress={startBackgroundUpdate}
        >
              <Text style={styleSheet.buttonText}>Share Location in Background</Text>
      </TouchableOpacity> 

      <TouchableOpacity 
          style={styles.stopSharingButton}
          onPress={stopBackgroundUpdate}
        >
              <Text style={styleSheet.buttonText}>Stop Sharing Location</Text>
      </TouchableOpacity> 

      <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate("HomeScreen")}
        >
              <Text style={styleSheet.buttonText}>Return to Map</Text>
      </TouchableOpacity> 

    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 330,
    width: 330,
    marginTop: 30
  },
  profileContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
  },
  startSharingButton: {
    height: 54,
    marginTop: 20,
    width: 300,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#018744',
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowColor: '#0078AE',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  stopSharingButton: {
    height: 54,
    marginTop: 20,
    width: 300,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0078AE',
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowColor: '#0078AE',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  button: {
    height: 54,
    marginTop: 75,
    width: 300,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0078AE',
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowColor: '#0078AE',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  buttonText: {
    color: "white",
    alignItems: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});

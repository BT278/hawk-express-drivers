import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Linking,
  Button,
} from "react-native";
import { styleSheet } from "../styles/accountStyle";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Successful login!!!");
  };

  return (
    <ScrollView contentContainerStyle={styleSheet.container}>
      <Image
        source={require("../images/hawk-logo.png")}
        style={styleSheet.image}
      />

      <View style={styleSheet.titleContainer}>
        <Text style={styleSheet.titleStyle}>Hawk Express Tracker</Text>
        <Text style={styleSheet.subtitleLabel}>Driver Login</Text>
      </View>

      <View style={styleSheet.inputContainer}>
        <Text style={styleSheet.inputLabel}>Email</Text>
        <TextInput
          placeholder="bsmith1234@uhcl.edu"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styleSheet.input}
        />

        <Text style={styleSheet.inputLabel}>Password</Text>
        <TextInput
          placeholder="********"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styleSheet.input}
          secureTextEntry
        />
      </View>

      <View style={styleSheet.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styleSheet.button}>
          <Text style={styleSheet.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text>Password problem?</Text>

        <Button
          onPress={() =>
            //this will work when mobile app we will have will have mail application installed
            Linking.openURL(
              "mailto:admin@hawkstracker.edu?subject=SendMail@Body=Description"
            )
          }
          title="Email the administrator"
        >
          <Text style={{ color: "#0078AE" }}>Email admin</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LandingPage from "./components/LandingPage";

export default function App() {
  return (
    <View style={styles.container}>
      <LandingPage />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#018744",
    alignItems: "center",
    justifyContent: "center",
  },
});

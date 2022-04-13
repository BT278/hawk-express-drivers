import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Landing from "../screens/Landing";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import LocationTracking from "../screens/LocationScreen"
import HawkExpressTracker from "../screens/HomeScreen";
import { AuthContextProvider } from "../../context/AuthContext";

const Stack = createNativeStackNavigator();
const RootNavigator = () => {
  return (
    /*
     * The AuthContextProvider wraps the whole app and
     * allows to maintain the  app state
     */
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="HomeScreen" component={HawkExpressTracker} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Location" component={LocationTracking} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
};

export default RootNavigator;

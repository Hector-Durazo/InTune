import React from "react"
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native"
import Intro from "./pages/Intro"
import LoginScreen from "./pages/LoginScreen"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Intro" component={Intro} options={{header:()=>null}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{header:()=>null}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

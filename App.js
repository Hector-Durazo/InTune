import React from "react"
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native"
import LoginScreen from "./pages/LoginScreen"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {useFonts, Inter_400Regular} from '@expo-google-fonts/inter';

const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
  })

  if(!fontsLoaded){
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Login" component={LoginScreen} options={{header:()=>null}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
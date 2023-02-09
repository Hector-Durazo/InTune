import { useRef } from 'react';
import { Animated } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { registerRootComponent } from "expo";
import LoginScreen from "./pages/LoginScreen";
import MainScreen from "./pages/MainScreen";
import ShareScreen from "./pages/ShareScreen";
import FriendScreen from './pages/FriendScreen';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LogBox } from 'react-native';
import ProfileScreen from './pages/ProfileScreen';

// Main App controller for navigation

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);


const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
  })

  const showNav = useRef(new Animated.Value(0))

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Header showRef={showNav} />
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Login" component={LoginScreen} initialParams={{ showRef: showNav }} options={{ header: () => null }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ header: () => null }} />
        <Stack.Screen name="Share" component={ShareScreen} options={{
          animation: "slide_from_bottom",
          title: "Share a Song",
          cardStyle: {
            backgroundColor: "transparent"
          },
          presentation: "modal",
          detachPreviousScreen: false,
          headerStyle: {
            backgroundColor: "#0F0F0F",
          },
          headerTintColor: "#DFDDE4"
        }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{
          animation: "slide_from_right",
          header: () => null
        }} />
        <Stack.Screen name="Friend" component={FriendScreen} options={{
          animation: "slide_from_left",
          header: () => null
        }} />
      </Stack.Navigator>
      <Footer showRef={showNav} />
    </NavigationContainer>
  )
}

registerRootComponent(App)

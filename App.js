import { useRef } from 'react';
import { Animated } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { registerRootComponent } from "expo";
import { useURL, parse } from 'expo-linking'
import { Header, Footer } from './components/index';
import { LoginScreen, MainScreen, ShareScreen, 
        ProfileScreen, SettingsScreen, SearchScreen,
        UserScreen, NotificationScreen
      } from './pages/index';
import { LogBox } from 'react-native';
import { AppStateProvider } from './utils/AppState';
import { authorizeSpotifyUser } from './utils/Spotify';
import { auth } from './firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Main App controller for navigation

LogBox.ignoreLogs([
  'Non-serializable',
  'AsyncStorage'
]);


const Stack = createNativeStackNavigator();
export default function App() {
  const url = useURL()
  if(url){
    const { hostname, path, queryParams } = parse(url)
    const refresh = getRefresh()
    if((!refresh) && queryParams && queryParams.code){
      const { code, state } = queryParams
      authorizeSpotifyUser(code)
    }
  }

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
  })

  const showNav = useRef(new Animated.Value(0))
  const navRef = useNavigationContainerRef()

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppStateProvider>
      <NavigationContainer ref={navRef}>
        <Header showRef={showNav} navRef={navRef} />
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
          <Stack.Screen name="Settings" component={SettingsScreen} options={{
            animation: "slide_from_bottom",
            title: "Settings",
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
          <Stack.Screen name="Search" component={SearchScreen} options={{
            animation: "slide_from_left",
            header: () => null
          }} />
          <Stack.Screen name="User" component={UserScreen} options={{
            animation: "slide_from_right",
            header: () => null
          }} />
          <Stack.Screen name="Notification" component={NotificationScreen} options={{
            animation: "slide_from_left",
            header: () => null
          }} />
        </Stack.Navigator>
        <Footer showRef={showNav} navRef={navRef} />
      </NavigationContainer>
    </AppStateProvider>
  )
}

registerRootComponent(App)

const getRefresh = async () => {
  return await AsyncStorage.getItem('@spotifyRefresh')
}
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { registerRootComponent } from "expo";
import LoginScreen from "./pages/LoginScreen";
import MainScreen from "./pages/MainScreen";
import Header from "./components/Header";
import Footer from "./components/Footer"

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
      <Header/>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Login" component={LoginScreen} options={{header:()=>null}}/>
        <Stack.Screen name="Main" component={MainScreen} options={{header:()=>null}}/>
      </Stack.Navigator>
      <Footer/>
    </NavigationContainer>
  )
}

registerRootComponent(App)
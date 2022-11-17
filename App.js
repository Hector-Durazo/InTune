
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

  if(!fontsLoaded){
    return null;
  }

  return (
    <NavigationContainer>
      <Header showRef={showNav}/>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Login" component={LoginScreen} initialParams={{showRef:showNav}} options={{header:()=>null}}/>
        <Stack.Screen name="Main" component={MainScreen} options={{header:()=>null}}/>
        <Stack.Screen name="Share" component={ShareScreen} options={{
          animation:"slide_from_bottom",
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
          }}/>
      </Stack.Navigator>
      <Footer showRef={showNav}/>
    </NavigationContainer>
  )
}

registerRootComponent(App)
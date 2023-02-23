import React, { useRef, useEffect, useState, useContext } from "react";
import { Dimensions, Animated, View, Text, TextInput, Pressable } from "react-native";
import { styles } from "../styles/App.component.style.js";
import { Button, PhoneInput } from "../components";
import { auth } from "../firebaseConfig.js";
import { getUserData } from "../utils/UserData.js";
import { AppState } from "../utils/AppState.js";

export const LoginScreen = ({ route, navigation }) => {
  const {showRef} = route.params;

  const [{friends}, dispatch] = useContext(AppState);

  // Animations
  const logoFade = useRef(new Animated.Value(0)).current
  const introFade = useRef(new Animated.Value(0)).current
  const introSlide = useRef(new Animated.Value(0)).current
  const loginFade = useRef(new Animated.Value(0)).current
  useEffect(()=>{
    Animated.sequence([
      // Fade in Logo and Tagline
      Animated.parallel([
        Animated.timing(logoFade,
          {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
          }),
        Animated.timing(introFade,
          {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
          })
      ]),
      // Translate logo, fade out tagline
      Animated.parallel([
        Animated.timing(introSlide,
          {
            toValue: 1,
            duration: 800,
            useNativeDriver: true
          }),
        Animated.timing(introFade,
          {
            toValue: 0,
            duration: 800,
            useNativeDriver: true
          })
      ]),
      // Fade in login
      Animated.timing(loginFade,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }
      )
    ]).start();
  })

  function logIn() {
      getUserData(dispatch);
      Animated.timing(showRef.current,{
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start()
      navigation.reset({
        index: 0,
        routes: [{name: "Main"}]
      })
  }

  // Listens for authorization and logs in
  auth.onAuthStateChanged((user) => {
    if((user) && (user.displayName)) {
      setTimeout(() => {logIn();}, 800)
    }
  })

  // References and Variables
  const userRef = useRef(null);

  const winHeight = Dimensions.get('window').height;

  return (
    <View style={styles.MainView}>
      <Animated.Image
				style={{
				...styles.Logo, 
				opacity:logoFade,
				transform: [{
					translateY: introSlide.interpolate({
					inputRange: [0,1],
					outputRange: [winHeight/4,0]
					})
				}]}}
				source={require("../assets/InTune_Logo.png")}/>
      <PhoneInput 
        loginFade={loginFade}
        user={userRef}
        onConfirm={logIn}
        />
      <Animated.Text style={{
        ...styles.Text, 
        opacity:introFade,
        color:"#CE6EF2",
        position: "absolute",
        top: winHeight/2
        }}>
        Share, Listen, Together
      </Animated.Text>
    </View>
  );
}

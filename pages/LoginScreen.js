import React, { useRef, useEffect, useState } from "react";
import { Dimensions, Animated, View, Text, TextInput, Pressable } from "react-native";
import styles from "../styles/App.component.style.js";
import Button from "../components/Button.js";
import PhoneInput from "../components/PhoneInput.js";

export default function LoginScreen({navigation}) {

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

  

  // References and Variables
  const verified = useRef(null);
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
      <Animated.View>
        <PhoneInput 
          loginFade={loginFade}
          user={userRef}
          onConfirm={() => {navigation.navigate("Main")}}
          />
      </Animated.View>
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

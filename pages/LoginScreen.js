import React, { useRef, useEffect, useState } from "react";
import { Animated, View, Text, TextInput, Pressable } from "react-native";
import {useFonts, Inter_400Regular} from '@expo-google-fonts/inter';
import styles from "../styles/App.component.style.js"
import Button from "../components/Button.js"

export default function LoginScreen() {
  // Animations
  const logoFade = useRef(new Animated.Value(0)).current
  const introFade = useRef(new Animated.Value(0)).current
  const introAnim = useRef(new Animated.Value(0)).current
  const loginFade = useRef(new Animated.Value(0)).current
  const [inputState, setInput] = useState("none")
  useEffect(()=>{
    Animated.sequence([
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

      Animated.parallel([
        Animated.timing(introAnim,
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

      Animated.timing(loginFade,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }
      )
      
    ]).start();
  })

  return (
    <View style={styles.MainView}>
      <Animated.Image
        style={{
          ...styles.Logo, 
          opacity:logoFade,
          transform: [{
            translateY: introAnim.interpolate({
              inputRange: [0,1],
              outputRange: [200,0]
            })
          }]
        }}
        source={
          require("../assets/InTune_Logo.png")
        }
      />
      <Animated.View style={{
          opacity:loginFade, 
          }}>
        <TextInput
          style={styles.TextField}
          placeholder={"Email"}
          />
        <TextInput 
          style={styles.TextField}
          placeholder={"Password"}
          />
        <View style={styles.Row}>
          <Button>Create Account</Button>
          <Button variant="accent">Sign In</Button>
        </View>
      </Animated.View>
      <Animated.Text style={{
        ...styles.Text, 
        opacity:introFade,
        color:"#CE6EF2"
        }}>
        Share, Listen, Together
      </Animated.Text>
    </View>
  );
}

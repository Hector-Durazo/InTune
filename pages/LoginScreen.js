import React, { useRef, useEffect, useState } from "react";
import { Dimensions, Animated, View, Text, TextInput, Pressable } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import styles from "../styles/App.component.style.js";
import Button from "../components/Button.js";
import {auth, verifier, signInSend, signInConfirm} from "../utils/Auth.js";


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

  const inputSlide = useRef(new Animated.Value(0)).current;

  // References and Variables
  const phoneInput = useRef(null);
  const phoneNo = useRef(null)
  const formatted = useRef(null)

  const winWidth = Dimensions.get('window').width;

  return (
    <View style={styles.MainView}>
      <Animated.Image
				style={{
				...styles.Logo, 
				opacity:logoFade,
				transform: [{
					translateY: introSlide.interpolate({
					inputRange: [0,1],
					outputRange: [120,0]
					})
				}]}}
				source={require("../assets/InTune_Logo.png")}/>
      <Animated.View style={{
          ...styles.Row,
          width: "200%",
          opacity:loginFade,
          transform: [{
            translateX: inputSlide.interpolate({
              inputRange: [0,1],
              outputRange: [winWidth/2, -winWidth/2]
            })
          }]
          }}>
        <View style={{...styles.MainView, width:"50%"}}>
          <PhoneInput
              ref={phoneInput}
              defaultCode="US"
              defaultValue={phoneNo.current}
              placeholder="(000) 000-0000"
              containerStyle={styles.PhoneContainer}
              textContainerStyle={styles.PhoneTextContainer}
              onChangeText={(text)=>{
                phoneNo.current = text;
              }}
              onChangeFormattedText={(text) => {
                formatted.current = text;
              }}/>
          <Button id="signInButton" 
          onPress={() => {
            const valid = phoneInput.current?.isValidNumber(phoneNo.current);
            if(valid){
              // Phone number is valid
              console.log("Valid Number")
              signInSend(phoneNo.current)
              Animated.timing(inputSlide,{
                toValue: 1,
                duration: 500,
                useNativeDriver: true
              }).start()
            } else{
              console.log("Invalid Number")
              // Phone number is invalid
            }
          }} variant="accent">
            Continue
          </Button>
        </View>
        <View style={{...styles.MainView, width:"50%"}}>
          <TextInput 
            placeholder="Confirmation Code" 
            style={styles.TextField}/>
          <Button variant="accent">
            Confirm
          </Button>
          <Button onPress={()=> {
            Animated.timing(inputSlide,{
              toValue: 0,
              duration: 500,
              useNativeDriver: true
            }).start()
          }}>
            Cancel
          </Button>
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

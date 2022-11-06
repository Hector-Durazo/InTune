import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Dimension } from "react-native"
import {useFonts} from 'expo-font'

export default function Intro() {
    const [loaded] = useFonts({
        Monserrat: require('./assets/fonts/Inter-Regular.ttf'
        )
    });
    if(!loaded){
        return null;
    }
  return (
    <View style={styles.Intro}>
      <View style={styles.LoadingScreen}>
        <Image
          style={styles.Frame4}
          source={require("./assets/InTune_Logo.png")
          }
        />
        <Text style={styles.Txt935}>Share, Listen, Together</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Intro: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%',
    backgroundColor: "rgba(15,15,15,1)",
    
  },
  LoadingScreen: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 32,
  },
  Frame4: {
    width: 335,
    height: 149,
    marginBottom: 112,
  },
  Txt935: {
    fontSize: 24,
    fontFamily: "Inter-Regular",
    fontWeight: "400",
    color: "rgba(206,110,242,1)",
    textAlign: "center",
    justifyContent: "center",
    width: 316,
  },
})

import React from "react";
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native";

export default function Intro() {
  return (
    <View style={styles.Intro}>
      <View style={styles.LoadingScreen}>
        <Image
          style={styles.Frame4}
          source={
            require("../assets/InTune_Logo.png")
          }
        />
        <Text style={styles.Txt775}>Share, Listen, Together</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Intro: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(15,15,15,1)",
  },
  LoadingScreen: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "rgba(15,15,15,1)",
  },
  Frame4: {
    width: 335,
    height: 149,
    marginBottom: 112,
  },
  Txt775: {
    fontSize: 24,
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
    color: "rgba(206,110,242,1)",
    textAlign: "center",
    justifyContent: "center",
    width: 316,
  },
});

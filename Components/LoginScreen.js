import React from "react";
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native";

export default function LoginScreen1() {
  return (
    <View style={styles.LoginScreen1}>
      <View style={styles.LoginScreen}>
        <Image
          style={styles.Logo}
          source={
            require("../assets/InTune_Logo.png")
          }
        />
        <View style={styles.EmailField}>
          <Text style={styles.Txt377}>Email</Text>
        </View>
        <View style={styles.PasswordField}>
          <Text style={styles.Txt599}>Password</Text>
        </View>
        <Text style={styles.Txt729}>Create Account</Text>
        <Text style={styles.Txt504}>Sign In</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  LoginScreen1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0,0,0,0.25)",
    elevation: 0,
    shadowOffset: { width: 0, height: 4 },
    width: "100%",
    height: "100%",
  },
  LoginScreen: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 69,
    paddingBottom: 69,
    paddingLeft: 19,
    paddingRight: 19,
    backgroundColor: "rgba(15,15,15,1)",
    width: 390,
    height: 844,
  },
  Logo: {
    width: 315,
    height: 129,
    marginBottom: 51,
  },
  EmailField: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 18,
    paddingRight: 18,
    marginBottom: 51,
    borderRadius: 15,
    backgroundColor: "rgba(141,106,246,0.27)",
    width: 230,
    height: 50,
  },
  Txt377: {
    fontSize: 20,
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
    color: "rgba(223,221,228,1)",
  },

  PasswordField: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 18,
    paddingRight: 18,
    marginBottom: 51,
    borderRadius: 15,
    backgroundColor: "rgba(141,106,246,0.27)",
    width: 230,
    height: 50,
  },
  Txt599: {
    fontSize: 20,
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.83)",
  },

  Txt729: {
    fontSize: 20,
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
    color: "rgba(217,115,255,1)",
    marginBottom: 51,
  },
  Txt504: {
    fontSize: 20,
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
    color: "rgba(217,115,255,1)",
  },
});

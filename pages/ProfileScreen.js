import React, { useRef, useEffect, useState } from "react";
import { Animated, View, StyleSheet, Text } from "react-native";
import styles from "../styles/App.component.style.js";
import { app, auth, db } from "../firebaseConfig.js";
// Import Components
import Button from "../components/Button.js";

export default function ProfileScreen() {
	// Screen Variables, Refs, and Hooks
	const name = auth.currentUser.displayName;
	const userName = "@" + auth.currentUser.username;

	return (
		// Page Contents
		<View style={styles.MainView}>
			<Text style={...ScreenStyles.name}>{name}</Text>
			<Text style={...ScreenStyles.username}>{userName}</Text>
			<Text>{"biography here"}</Text>
		</View>
	);
}

// Page specific styles
const ScreenStyles = StyleSheet.create({
	name: {
		fontSize: 14,
		color: "white",
	},
	username: {
		fontStyle: "italic",
		fontSize: 10,
	},
});

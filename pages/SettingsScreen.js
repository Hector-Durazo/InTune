import React, { useRef, useEffect, useState } from "react";
import { Animated, View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import { styles } from "../styles/App.component.style.js";
import { Button } from "../components/index.js";
import { openAuth } from "../utils/Spotify.js";


export const SettingsScreen = ({ navigation }) => {

	const options = [
		"Account", "Profile",
	];

	let optionsList = options.map((option, index) => {
		return (
			<Pressable key={index} style={PageStyles.Option}>
				<Text style={PageStyles.Text}>{option}</Text>
			</Pressable>
		)
	})

	return (
		<View style={styles.MainView}>
			<ScrollView contentContainerStyle={styles.ScrollView}>
				{optionsList}
				<Button 
					style={{...styles.Button, ...styles.White}}
					textStyle={styles.TextDark}
					onPress={openAuth}
				>Link Spotify</Button>
			</ScrollView>
		</View>
	);
}

const PageStyles = StyleSheet.create({
	Option: {

	},
})
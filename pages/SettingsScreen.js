import React, { useRef, useEffect, useState } from "react";
import { Animated, View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import { styles } from "../styles/App.component.style.js";


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
			<ScrollView contentContainerStyle={styles.Scroll}>
				{optionsList}
			</ScrollView>
		</View>
	);
}

const PageStyles = StyleSheet.create({
	Option: {

	},
})
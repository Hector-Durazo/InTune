import React, { useRef, useEffect, useState } from "react";
import { Animated, View, StyleSheet, ScrollView, Text } from "react-native";
import { styles } from "../styles/App.component.style.js";
import { Search, Friend } from "../components/index";

export const SearchScreen = () => {
	// Screen Variables, Refs, and Hooks

	return(
		// Page Contents
		<View style={styles.MainView}>
			<Search 
			placeholder="Search"
			onChange={async (text)=>{
				// search friends asynchronmous method here
			}}/>
			<ScrollView contentContainerStyle={ScreenStyles.Scroll}>
				<Friend/>
				<Friend/>
				<Friend/>
				<Friend/>
			</ScrollView>
		</View>
	);
}

// Page specific styles
const ScreenStyles = StyleSheet.create({
	Scroll: {
		alignItems: "center"
	},
})
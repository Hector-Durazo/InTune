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
			placeholder="Search Friends..."
			onChange={async (text)=>{
				// search friends asynchronmous method here
			}}/>
			<ScrollView contentContainerStyle={styles.Scroll}>
				<Text style={{...styles.TextLight }}>
					{"Hello"}
				</Text>
				<Text style={{...styles.TextLight }}>
					{"World"}
				</Text>
				<Text style={{...styles.TextLight }}>
					{"Friends"}
				</Text>
				<Text style={{...styles.TextLight }}>
					{"Here"}
				</Text>
				<Friend/>
			</ScrollView>
		</View>
	);
}

// Page specific styles
const ScreenStyles = StyleSheet.create({

})
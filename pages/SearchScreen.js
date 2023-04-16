import React, { useRef, useEffect, useState } from "react";
import { Animated, View, StyleSheet, ScrollView, Text } from "react-native";
import { styles } from "../styles/App.component.style.js";
import { Search, Friend } from "../components/index";
import { queryUsers } from "../utils/UserData.js";

export const SearchScreen = ({ route, navigation }) => {
	// Screen Variables, Refs, and Hooks
	const [results, setResults] = useState([]);
	const unsubscribe = useRef(null)

	const onChange = (query) => {
		if(unsubscribe.current) unsubscribe.current()
		unsubscribe.current = queryUsers(query, setResults);
	}

	const resultList = results.map((user, ind) => {
		return <Friend key={ind} data={user} navigation={navigation}/>
	})

	return(
		// Page Contents
		<View style={styles.MainView}>
			<Search 
			placeholder="Search"
			onChange={onChange}/>
			<ScrollView contentContainerStyle={styles.ScrollView}>
				{resultList}
			</ScrollView>
		</View>
	);
}

// Page specific styles
const ScreenStyles = StyleSheet.create({

})
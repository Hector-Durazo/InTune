import React, { useRef, useEffect, useState } from "react";
import { Animated, View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import styles from "../styles/App.component.style.js";
import Button from "../components/Button";
import Search from "../components/Search";
import Track from "../components/Track";

export default function ShareScreen({ navigation }) {

	const res = useRef(null);
	const trackRef = useRef(null);
	const [tracks, setTracks] = useState([]);

	function onSubmit() {
		navigation.goBack()
	}

	let trackList = tracks.map((track, index) => {
		track.title = track.name;
		track.artist = track.artists[0].name
		track.artUrl = track.album.images[2].url
		return <Track key={index} data={track} selected={trackRef} onSubmit={onSubmit}/>
	});

	return(
		<View style={styles.MainView}>
			<Search onChange={(items)=>{
				setTracks(items);
			}}/>
			<ScrollView contentContainerStyle={ShareStyles.Scroll}>
				{trackList}
			</ScrollView>
		</View>
	);
}

const ShareStyles = StyleSheet.create({
	Scroll: {
		alignItems: "center"
	},
})
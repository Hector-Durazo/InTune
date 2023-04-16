import React, { useRef, useEffect, useState } from "react";
import { Animated, View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import { styles } from "../styles/App.component.style.js";
import { Button, Search, Track, TouchView } from "../components";
import { searchSpotify, getUserTopTracks } from "../utils/Spotify"


export function ShareScreen({ navigation, route }) {

	const trackRef = useRef(null);
	const [tracks, setTracks] = useState([]);
	const topTracksRef = useRef(null);

	//const { topTracks } = route.params
	useEffect(() => {
		const fetchTopTracks = async () => {
			const topTracks = await getUserTopTracks()
			topTracksRef.current = topTracks
			if (topTracks[0]) setTracks(topTracks)
		}
		fetchTopTracks()
	}, [setTracks, topTracksRef])

	function onSubmit() {
		navigation.goBack()
	}


	let trackList = tracks.map((track, index) => {
		track.title = track.name;
		track.artist = track.artists[0].name
		track.artUrl = track.album.images[2].url
		return <Track key={index} data={track} selected={trackRef} onSubmit={onSubmit} />
	});

	return (
		<TouchView style={styles.MainView}>
			<Search
				placeholder="Search for a Song..."
				onChange={async (text) => {
					if (!text) setTracks(topTracksRef.current)
					else {
						var items = await searchSpotify(text)
						setTracks(items);
					}
				}} />
			<ScrollView contentContainerStyle={styles.ScrollView}>
				{trackList}
			</ScrollView>
		</TouchView>
	);
}

const ShareStyles = StyleSheet.create({

})
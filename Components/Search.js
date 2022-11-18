import { useRef } from 'react';
import { View, TextInput, StyleSheet, Image } from "react-native";
import styles from "../styles/App.component.style.js";
import { authorizeSpotify } from '../spotifyConfig.js';


// Search Bar Component


export default function Search(props) {
	let {onChange} = props;

	const token = useRef(null);
	const refresh = useRef(null);

	async function searchSpotify(query) {
		// Get Spotify Authorization if needed
		if((token.current == null) || (new Date().getTime() > refresh.current.getTime())) {
			const json = await authorizeSpotify();
			token.current = json.access_token;
			refresh.current = new Date();
			refresh.current.setSeconds(refresh.current.getSeconds()+3600);
		}
		try {
			const response = await fetch('https://api.spotify.com/v1/search?q='+query+"&type=track&limit=15", {
				method: 'GET',
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token.current
				}
			})
			const json = await response.json();
			var items = [];
			if(typeof json.tracks !== "undefined") {
				items = json.tracks.items
			}
			onChange(items);

		} catch (err) {
			console.error(err)
		}
	}

	return (
		<View style={{...styles.Row, ...styles.TextField, ...compStyles.SearchContainer}}>
			<Image style={compStyles.SearchIcon} source={require("../assets/magnifyingGlass.png")}/>
			<TextInput 
			style={compStyles.SearchText}
			placeholder="Search for a song..."
			onChangeText={text => {
				searchSpotify(text)
			}}
			/>
		</View>
	)
}

const compStyles = StyleSheet.create({
	SearchContainer: {
		width: "75%",
		height: "5%",
		margin: "5%",
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "black"
	},
	SearchIcon: {
		aspectRatio: "1/1",
		width: "8%",
		marginRight: "5%",
		tintColor: "#DFDDE4"
	},
	SearchText: {
		width: "85%",
		color: "#DFDDE4",
	}
})
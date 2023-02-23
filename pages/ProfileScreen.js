import React, { useRef, useEffect, useState, useContext } from "react";
import { Animated, View, StyleSheet, Text } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { styles } from "../styles/App.component.style.js";
import { app, auth, db } from "../firebaseConfig.js";
// Import Components
import { Button, Post } from "../components/";
import { updateUserData } from "../utils/UserData.js";
import { AppState } from "../utils/AppState.js";

export const ProfileScreen = () => {
	// Screen Variables, Refs, and Hooks
	const name = auth.currentUser.displayName;
	const userName = "@" + auth.currentUser.username;

	const [{posts}, dispatch] = useContext(AppState)
	const [image, setImage] = useState(null);

	useEffect(() => {
		console.log('profile useeffect called')
		if (auth.currentUser.photoURL) {
			setImage(auth.currentUser.photoURL)
		}
	}, [setImage]);
	
	let postList = posts.map((post, index) => {
		return <Post key={index} data={post} />;
	});


	const changePicture = async () => {
		let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (permission == "none") { return; }
		let result = await ImagePicker.launchImageLibraryAsync({
			quality: 1,
			allowsEditing: true,
			base64 : true,
			aspect: [1,1],
		});
		if(result.assets){
			setImage(result.assets[0].base64);
			auth.currentUser.photoURL = result.assets[0].base64;
			updateUserData(auth.currentUser, {picture: result.assets[0].base64} )
		}
	}


	return (
		// Page Contents
		<View style={styles.MainView}>
			<Button 
			pressStyle={ScreenStyles.ProfilePic}
			imgStyle={ScreenStyles.ProfilePicImg}
			onPress={changePicture} 
			image={{uri: 'data:image/jpeg;base64,' + image}}
			/>
			<Text style={{ ...ScreenStyles.Name, ...styles.TextLight }}>
				{name}
			</Text>
			<Text style={{ ...ScreenStyles.Username, ...styles.TextLight }}>
				{userName}
			</Text>
			<Text
				style={{ ...ScreenStyles.SecondaryText, ...styles.TextLight }}
			>
				{"biography here"}
			</Text>
			<Text
				style={{ ...ScreenStyles.SecondaryText, ...styles.TextLight }}
			>
				{"Number of Friends Here"}
			</Text>
			<View style={ScreenStyles.ProfileBody}>
				<Text
					style={{ ...ScreenStyles.RecentPost, ...styles.TextLight }}
				>
					{"Recent Post:"}
				</Text>
				{postList[0]}
				<Button pressStyle={ScreenStyles.HistoryButton}>
					{"History"}
				</Button>
			</View>
		</View>
	);
}

// Page specific styles
const ScreenStyles = StyleSheet.create({
	ProfilePic: {
		aspectRatio: 1 / 1,
		width: "40%",
		borderRadius: 100,
		margin: "3%",
		marginTop: "10%",
		borderWidth: 1,
	},
	ProfilePicImg: {
		position: "relative",
		aspectRatio: 1 / 1,
		height: "150%",
		overflow: "hidden"
	},
	Name: {
		fontSize: 16,
	},
	Username: {
		fontStyle: "italic",
		fontSize: 10,
	},
	SecondaryText: {
		fontStyle: "italic",
		fontSize: 12,
	},
	RecentPost: {
		textAlign: "left",
		paddingBottom: 10,
	},
	HistoryButton: {
		alignSelf: "flex-end",
		borderRadius: 15,
	},
	ProfileBody: {
		paddingTop: 30,
	},
});

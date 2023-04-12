import React, { useRef, useEffect, useState, useContext } from "react";
import { Animated, View, StyleSheet, Text } from "react-native";
import { styles } from "../styles/App.component.style.js";
import { auth } from "../firebaseConfig.js";
// Import Components
import { Button, Post } from "../components/";
import { updateUserData, selectPicture, generateBlob, uploadFile } from "../utils/UserData.js";
import { AppState } from "../utils/AppState.js";

export const ProfileScreen = () => {
	// Screen Variables, Refs, and Hooks
	const name = auth.currentUser.displayName;
	const userName = "@" + auth.currentUser.username;

	const [{posts}, dispatch] = useContext(AppState)
	const [image, setImage] = useState(auth.currentUser.photoURL);
	
	let postList = posts.map((post, index) => {
		return <Post key={index} data={post} />;
	});

	const changePicture = async () => {
		const picture = await selectPicture()
		if(!picture) return;
		const blob = await generateBlob(picture.uri)
		const url = await uploadFile(blob, 'user/' + auth.currentUser.uid + '/pfp.jpg')
		if(!url) return;
		setImage(url);
		auth.currentUser.photoURL = url;
		updateUserData(auth.currentUser, {picture: url} )
	}

	return (
		// Page Contents
		<View style={styles.MainView}>
			<Button 
			style={ScreenStyles.ProfilePic}
			imgStyle={ScreenStyles.ProfilePicImg}
			onPress={changePicture} 
			image={{uri: image}}
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
				<Button style={ScreenStyles.HistoryButton}>
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
		overflow: "hidden",
	},
	ProfilePicImg: {
		aspectRatio: 1 / 1,
		width: "100%",
		overflow: "hidden",
		borderRadius: 100,
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

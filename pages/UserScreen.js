import React, { useRef, useEffect, useState, useContext } from "react";
import { Animated, View, StyleSheet, Text } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { colors, styles } from "../styles/App.component.style.js";
import { app, auth, db } from "../firebaseConfig.js";
// Import Components
import { Button, Post } from "../components/index.js";
import { addFriend, addRequest, getUserData, removeRequest, subscribeToUserPosts } from "../utils/UserData.js";
import { AppState } from "../utils/AppState.js";

export const UserScreen = ({ route, navigation, }) => {
	// Screen Variables, Refs, and Hooks

	const { data } = route.params

	const name = data.displayName
	const userName = "@" + data.username

	const [{ requested, requests, friends, posts }, dispatch] = useContext(AppState)
	const [status, setStatus] = useState('foe')

	let postArray = []
	if(posts[data.uid]) postArray.push(...posts[data.uid])

	let postList = postArray.map((post, index) => {
		post.picture = data.picture
		console.log(post)
		return <Post key={index} data={post} />;
	});

	useEffect(() => {
		const unsubscribeUser = getUserData(dispatch)
		const unsubscribePosts = subscribeToUserPosts(data.uid, dispatch)
		const outgoingRequest = Object.keys(requested).includes(data.uid)
		const incomingRequest = Object.keys(requests).includes(data.uid)
		const friended = Object.keys(friends).includes(data.uid)
		if (outgoingRequest) setStatus('out')
		if (incomingRequest) setStatus('in')
		if (friended) setStatus('friend')
		return () => {
			unsubscribeUser()
			unsubscribePosts()
		}
	}, [getUserData, setStatus])



	const buttonTextMap = {
		'foe': 'Add Friend',
		'out': 'Requested',
		'in': 'Accept Request',
		'friend': 'Remove Friend'
	}

	

	// Add text for already friends

	return (
		// Page Contents
		<View style={styles.MainView}>
			<Button
				style={ScreenStyles.ProfilePic}
				imgStyle={ScreenStyles.ProfilePicImg}
				image={{ uri: data.picture }}
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
			<Button
				style={{ ...ScreenStyles.Button, ...ScreenStyles.AlignCenter }}
				textStyle={ScreenStyles.ButtonText}
				onPress={() => {
					if (status == 'out') {
						removeRequest(data)
						setStatus('foe')
					} else if (status == 'in') {
						//add as friend
						addFriend(data)
						setStatus('friend')
					} else {
						addRequest(data)
						setStatus('out')
					}
				}}
			>
				{buttonTextMap[status]}
			</Button>
			<View style={ScreenStyles.ProfileBody}>
				<Text
					style={{ ...ScreenStyles.RecentPost, ...styles.TextLight }}
				>
					{"Recent Post:"}
				</Text>
				{postList[0]}
				<Button
					style={{ ...ScreenStyles.Button, ...styles.AlignEnd }}
					textStyle={ScreenStyles.ButtonText}
				>
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
	AlignCenter: {
		alignSelf: "center",
	},
	AlignEnd: {
		alignSelf: "flex-end",
	},
	Button: {
		borderRadius: 15,
		backgroundColor: colors.PurpleSb,
		width: "30%",
		aspectRatio: 1 / .4
	},
	ProfileBody: {
		paddingTop: 30,
	},
	ButtonText: {
		color: colors.WhiteGb,
		fontSize: 18
	}
});
import React, { useRef, useEffect, useState, useCallback, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { auth } from "../firebaseConfig.js";
import { colors, styles } from "../styles/App.component.style.js";
import { Button, Post } from "../components";
import { getUserData, subscribeToUserPosts } from "../utils/UserData.js";
import { AppState } from "../utils/AppState.js";
import { getUserTopTracks } from "../utils/Spotify.js";

export function MainScreen({ navigation }) {

	const [refreshing, setRefreshing] = useState(false);
	const [postArray, setPostArray] = useState([])
	const [{ posts, requests, requested, friends }, dispatch] = useContext(AppState)
	// Go to LoginScreen on signout
	auth.onAuthStateChanged((user) => {
		if (!user) {
			navigation.reset({
				index: 0,
				routes: [{ name: "Login" }]
			})
		}
	})

	// Subscribe to relevant posts
	// Dispatch posts to global state only if postsRef updates
	useEffect(() => {
		console.debug('Fetching Data')
		const unsubscribeUser = getUserData(dispatch)
		return () => {
			unsubscribeUser()
		}
	}, [refreshing])

	useEffect(() => {
		console.debug('Subscribing to Posts')
		const unsub = []
		const uids = Object.keys(friends)
		uids.push(auth.currentUser.uid)
		for (let i = 0; i < uids.length; i++) {
			unsub.push(subscribeToUserPosts(uids[i], dispatch))
		}
		return () => {
			for (let i = 0; i < unsub.length; i++) {
				unsub[i]()
			}
		}
	}, [friends])

	useEffect(() => {
		console.debug('Compiling Posts')
		const compilePosts = () => {
			const postArray = []
			if (Object.keys(posts).length == 0) return [];
			const curUserPosts = posts[auth.currentUser.uid]
			if (curUserPosts) postArray.push(...curUserPosts)
			const friendUids = Object.keys(friends)
			for (let i = 0; i < friendUids.length; i++) {
				const friendPosts = posts[friendUids[i]]
				if (friendPosts) postArray.push(...friendPosts)
			}
			postArray.sort((a, b) => b.postedOn - a.postedOn)
			return postArray
		}
		setPostArray(compilePosts())
	}, [posts])

	// Rerender when screen is pulled up
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 500);
	}, []);

	const postList = postArray.map((post, index) => {
		return <Post key={index} data={post} />
	})

	return (
		<View style={styles.MainView}>
			<ScrollView
				style={styles.ScrollView}
				contentContainerStyle={{ alignItems: "center" }}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}>
				<Text style={{ ...styles.Text, ...styles.TextLight, ...styles.Heading }}>
					Good Evening
				</Text>
				{postList}
			</ScrollView>
			<Button
				style={{ ...mainStyles.ShareButton, }}
				image={require("../assets/InTune_Logo_Icon.png")}
				imgStyle={{ ...mainStyles.ShareButImg, }}
				onPress={() => {
					navigation.navigate("Share", { topTracks: getUserTopTracks() })
				}}
			/>
		</View>
	);
}

const mainStyles = StyleSheet.create({
	ShareButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		bottom: 20,
		right: 20,
		aspectRatio: 1 / 1,
		width: "25%",
		borderRadius: 100,
		borderWidth: 1,
		borderColor: colors.GreyNi,
		backgroundColor: colors.WhiteGb,
		shadowColor: "rgba(0,0,0,0.25)",
		elevation: 4,
		shadowOffset: { width: 0, height: 4 },
	},
	ShareButImg: {
		position: "relative",
		aspectRatio: .9 / 1,
		height: "65%",
	},
})
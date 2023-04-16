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
	const [{ posts, requests, requested, friends }, dispatch] = useContext(AppState)
	const friendUids = useRef([])
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
		console.debug('Fetching Posts')
		const unsubscribeUser = getUserData(dispatch)
		friendUids.current = Object.keys(friends)
		const unsubscribePosts = subscribeToUserPosts(auth.currentUser.uid, dispatch)
		const unsubFriends = []
		for (let i = 0; i < friendUids.current.length; i++) {
			unsubFriends.push(subscribeToUserPosts(friendUids.current[i], dispatch))
		}

		return () => {
			unsubscribePosts()
			unsubscribeUser()
			for (let i = 0; i < unsubFriends.length; i++) {
				unsubFriends[i]()
			}
		}
	}, [refreshing])

	// Rerender when screen is pulled up
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 500);
	}, []);

	const compilePosts = () => {
		console.log("Compiling Posts")
		const postArray = []
		if (Object.keys(posts).length == 0) return [];
		const curUserPosts = posts[auth.currentUser.uid]
		if(curUserPosts) postArray.push(...curUserPosts)
		if (friendUids.current) {
			for (let i = 0; i < friendUids.current.length; i++) {
				const friendPosts = posts[friendUids.current[i]]
				if(friendPosts) postArray.push(...friendPosts)
			}
		}
		return postArray
	}

	const postArray = compilePosts()
	postArray.sort((a, b) => b.postedOn - a.postedOn)
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
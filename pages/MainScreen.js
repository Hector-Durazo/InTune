import React, { useRef, useEffect, useState, useCallback, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { auth } from "../firebaseConfig.js";
import { styles } from "../styles/App.component.style.js";
import Button from "../components/Button.js";
import Post from "../components/Post.js";
import { subscribeToUserPosts } from "../utils/UserData.js";
import { AppState } from "../utils/AppState.js";

export default function MainScreen({navigation}) {

	const [refreshing, setRefreshing] = useState(false);
	const [{posts}, dispatch] = useContext(AppState)

	// Go to LoginScreen on signout
	auth.onAuthStateChanged((user) => {
		if(!user) {
			navigation.reset({
				index: 0,
				routes: [{name: "Login"}]
			  })
		}
	})


	// Ref passed to Firebase listener to store post data
	const postsRef = useRef([]);

	const getPosts = useCallback(() => {
		// TODO: Subscribe to and compile friend posts !!!
		return subscribeToUserPosts(auth.currentUser.uid, dispatch)
	})

	// Subscribe to relevant posts

	// Dispatch posts to global state only if postsRef updates
	useEffect(()=>{
		console.log('useEffect Called')
		const unsubscribe = getPosts()
		return () => unsubscribe()
	}, [postsRef, refreshing])

	// Rerender when screen is pulled up
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(()=>{
			setRefreshing(false);
		}, 500);
	}, []);

	

	let postList = posts.map((post, index)  => {
		return <Post key={index} data={post}/>
	});

	return(
		<View style={styles.MainView}>
			<ScrollView
			style={mainStyles.PostList}
			contentContainerStyle={{alignItems: "center"}}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
			}
			>
				<Text style={{...styles.Text, ...styles.TextLight, ...styles.Heading}}>
					Good Evening
				</Text>
				{postList}
			</ScrollView>
			<Button 
			pressStyle={{...mainStyles.ShareButton,}} 
			image={require("../assets/InTune_Logo_Icon.png")}
			imgStyle={{...mainStyles.ShareButImg,}}
			onPress={() => {
				navigation.navigate("Share")
			}}
			/>
		</View>
	);
}

const mainStyles = StyleSheet.create({
	ShareButton: {
		position: "absolute",
		bottom: 20,
		right: 20,
		aspectRatio: 1/1,
		width: "20%",
		borderRadius: 100,
		paddingHorizontal: "55%",
	},
	ShareButImg: {
		position: "relative",
		aspectRatio: .90/1,
		height: "60%",
	},
	PostList: {
		display: "flex",
		width: "100%",
		height: "100%",
		
	}
})
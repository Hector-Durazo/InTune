import React, { useRef, useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { auth } from "../firebaseConfig.js";
import { styles } from "../styles/App.component.style.js";
import Button from "../components/Button.js";
import Post from "../components/Post.js";
import { subscribeToUserPosts } from "../utils/UserData.js";
import { useAppState } from "../utils/AppState.js";

export default function MainScreen({navigation}) {

	//const [{posts, friends}, dispatch] = useAppState(); - TO ADD. AppState not working
	const [posts, setPosts] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	/**
	 * Subscribe to all friend posts, sort posts by newest, and update posts state.
	 * UNFINISHED
	 * @returns Unsubscribe function for subscribed user
	 */
	const getPosts = () => {
		// TODO: Subscribe to and compile friend posts !!!
		return subscribeToUserPosts(auth.currentUser.uid, (data)=>{
			setPosts(data);
			//dispatch({type:'setPosts', posts:postsNewest}) - TO ADD. AppState not working
		})
	}

	// Go to LoginScreen on signout
	auth.onAuthStateChanged((user) => {
		if(!user) {
			navigation.reset({
				index: 0,
				routes: [{name: "Login"}]
			  })
		}
	})

	// Get post data
	useEffect(()=>{
		const unsubscribe = getPosts()
		return () => {
			unsubscribe()
		}
	}, [getPosts])

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
			onPress={() => navigation.navigate("Share")}
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
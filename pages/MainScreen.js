import React, { useRef, useEffect, useState } from "react";
import { Animated, View, Text, TextInput, Pressable, StyleSheet, Dimensions, ScrollView } from "react-native";
import { app, auth, db } from "../firebaseConfig.js";
import styles from "../styles/App.component.style.js";
import Button from "../components/Button.js";
import Post from "../components/Post.js";
import { getPosts } from "../utils/UserData.js";

export default function MainScreen({navigation}) {

	const winWidth = Dimensions.get('window').width;
	const [posts, setPosts] = useState([]);

	useEffect(()=>{
		getPosts(setPosts);
	}, [setPosts])

	auth.onAuthStateChanged((user) => {
		if(!user) {
			navigation.reset({
				index: 0,
				routes: [{name: "Login"}]
			  })
		}
	})

	let postList = posts.map((post, index)  => {
		return <Post key={index} data={post}/>
	});

	return(
		<View style={styles.MainView}>
			<ScrollView
			style={mainStyles.PostList}
			contentContainerStyle={{alignItems: "center"}}
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
		aspectRatio: "1/1",
		width: "20%",
		borderRadius: "100%",
		paddingHorizontal: "55%",
	},
	ShareButImg: {
		position: "relative",
		aspectRatio: ".90/1",
		height: "60%",
	},
	PostList: {
		display: "flex",
		width: "100%",
		height: "100%",
		
	}
})
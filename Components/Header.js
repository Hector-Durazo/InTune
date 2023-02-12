import { useContext, useEffect, useRef, useState } from 'react';
import { Pressable, Image, StyleSheet, View, Animated, StatusBar } from "react-native";
import { styles } from "../styles/App.component.style.js";
import Button from "./Button.js";
import { app, auth } from "../firebaseConfig.js";
import { checkNewUser } from "../utils/UserData.js";
import { AppState } from '../utils/AppState.js';

export default function Header(props) {
	const {showRef, navRef} = props
	
	const [{friends}, dispatch] = useContext(AppState);
	let picture = "";
	if (friends[0]) picture = friends[0].picture

	return(
		<View style={{...compStyles.Header}}>
			<StatusBar translucent={true}/>
			<Animated.View style={{
				...styles.Row, ...compStyles.HeaderContainer,
				transform: 
				[{
					translateY: showRef.current.interpolate({
						inputRange: [0,1],
						outputRange: [-150,0]
					})
				}]
			}}>
				<View style={styles.ProfilePicButton}/>
				<Image style={compStyles.Logo} source={require("../assets/InTune_Logo.png")}/>
				<Button 
					pressStyle={styles.ProfilePicButton}
					imgStyle={styles.ProfilePicImg}
					onPress={()=>{navRef.navigate("Profile")}}
					image={{uri: 'data:image/jpeg;base64,' + picture}}
				></Button>

			</Animated.View>
		</View>
	)
}

const compStyles = StyleSheet.create({
	Header: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "12%",
		backgroundColor: "#0F0F0F",
	},
	HeaderContainer: {
		width: "100%",
		height: "100%",
		backgroundColor: "black",
		justifyContent: "space-between",
		alignItems: "flex-end",
		paddingVertical: "1%",
		paddingHorizontal: "3%",
	},
	Logo: {
		height: "60%",
		width: "35%",
	},
})
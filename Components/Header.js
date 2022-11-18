import { useRef } from 'react';
import { Pressable, Image, StyleSheet, View, Animated } from "react-native";
import styles from "../styles/App.component.style.js";
import Button from "./Button.js";
import { app, auth } from "../firebaseConfig.js";
import { checkNewUser } from "../utils/UserData.js";

export default function Header(props) {
	const {showRef} = props

	return(
		<View style={{...compStyles.Header}}>
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
				<Button pressStyle={compStyles.Button}></Button>
				<Image style={compStyles.Logo} source={require("../assets/InTune_Logo_Icon.png")}/>
				<Button 
				pressStyle={compStyles.Button}
				onPress={()=>{
					auth.signOut()
					Animated.timing(showRef.current,{
						toValue: 0,
						duration: 500,
						useNativeDriver: true
					}).start()
				}}
				></Button>
			</Animated.View>
		</View>
	)
}

const compStyles = StyleSheet.create({
	Header: {
		width: "100%",
		height: "13%",
		backgroundColor: "#0F0F0F",
	},
	HeaderContainer: {
		width: "100%",
		height: "100%",
		backgroundColor: "black",
		justifyContent: "space-between",
		alignItems: "flex-end",
		padding: "3%",
	},
	Logo: {
		height: 36,
		width: 32,
	},
	Button: {
		width: "10%",
		height: "auto",
		borderRadius: 16
	},
})
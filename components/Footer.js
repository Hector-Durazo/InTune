import { useRef } from 'react';
import { Image, StyleSheet, View, Animated } from "react-native";
import styles from "../styles/App.component.style.js";
import Button from "../components/Button.js";
import { app, auth } from "../firebaseConfig.js";

export default function Footer(props) {
	let {children} = props

	const footerSlide = useRef(new Animated.Value(0)).current;
	
	auth.onAuthStateChanged((user) => {
		if(user) {
			Animated.timing(footerSlide,{
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}).start()
		}
	})

	return(
		<View style={{...compStyles.Footer}}>
			<Animated.View style={{
				...styles.Row, ...compStyles.FooterContainer,
				transform: 
				[{
					translateY: footerSlide.interpolate({
						inputRange: [0,1],
						outputRange: [150,0]
					})
				}]
			}}>
				<Button pressStyle={compStyles.Button}></Button>
				<Button pressStyle={compStyles.Button}></Button>
				<Button pressStyle={compStyles.Button}></Button>
			</Animated.View>
		</View>
	)
}

const compStyles = StyleSheet.create({
	Footer: {
		width: "100%",
		height: "10%",
		backgroundColor: "#0F0F0F",
	},
	FooterContainer: {
		width: "100%",
		height: "100%",
		backgroundColor: "black",
		justifyContent: "space-between",
		alignItems: "flex-start",
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
import { useRef } from "react";
import { Image, StyleSheet, View, Animated } from "react-native";
import styles from "../styles/App.component.style.js";
import Button from "./Button.js";
import { app, auth } from "../firebaseConfig.js";
import { checkNewUser } from "../utils/UserData.js";

// Footer

export default function Footer(props) {
	const { showRef, navRef } = props;

	return (
		<View style={{ ...compStyles.Footer }}>
			<Animated.View
				style={{
					...styles.Row,
					...compStyles.FooterContainer,
					transform: [
						{
							translateY: showRef.current.interpolate({
								inputRange: [0, 1],
								outputRange: [150, 0],
							}),
						},
					],
				}}
			>
				<Button pressStyle={compStyles.Button}></Button>
				<Button
					pressStyle={compStyles.Button}
					onPress={() => {
						navRef.navigate("Main");
					}}
				></Button>
				<Button pressStyle={compStyles.Button}></Button>
			</Animated.View>
		</View>
	);
}

const compStyles = StyleSheet.create({
	Footer: {
		width: "100%",
		height: "8%",
		backgroundColor: "#0F0F0F",
	},
	FooterContainer: {
		width: "100%",
		height: "100%",
		backgroundColor: "black",
		justifyContent: "space-evenly",
		alignItems: "flex-start",
		padding: "1%",
	},
	Button: {
		aspectRatio: 1 / 1,
		width: "10%",
		borderRadius: 100,
	},
});

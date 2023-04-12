import { StyleSheet, View, Animated } from "react-native";
import { styles, colors } from "../styles/App.component.style.js";
import { Button } from "./Button";

// Footer

export const Footer = (props) => {
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
				<Button style={{...styles.Button, ...compStyles.Button}} onPress={() => { navRef.navigate("Search")}}></Button>
				<Button
					style={{...styles.Button, ...compStyles.Button}}
					onPress={() => { navRef.navigate("Main")}}
				></Button>
				<Button style={{...styles.Button, ...compStyles.Button}}></Button>
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
		backgroundColor: colors.WhiteGb,
	},
});

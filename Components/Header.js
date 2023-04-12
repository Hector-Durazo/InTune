import { useContext, useEffect } from 'react';
import { Image, StyleSheet, View, Animated, StatusBar, Text } from "react-native";
import { colors, styles } from "../styles/App.component.style.js";
import { Button } from "./Button";
import { AppState } from '../utils/AppState.js';
import { auth } from '../firebaseConfig.js';

export const Header = (props) => {
	const { showRef, navRef } = props

	const [{ friends, page }, dispatch] = useContext(AppState);

	let picture = null
	if (auth.currentUser) picture = { uri: auth.currentUser.photoURL }

	useEffect(() => {
		const unsubNav = navRef.addListener('state', (e) => {
			const state = e.data.state;
			const ind = state?.index;
			if (ind !== undefined) dispatch({ type: 'setPage', page: state.routes[ind].name })
		})
		return () => unsubNav()
	}, [navRef])

	return (
		<View style={{ ...compStyles.Header }}>
			<StatusBar translucent={true} />
			<Animated.View style={{
				...styles.Row, ...compStyles.HeaderContainer,
				transform:
					[{
						translateY: showRef.current.interpolate({
							inputRange: [0, 1],
							outputRange: [-150, 0]
						})
					}]
			}}>
				<Button 
					style={{ ...styles.Button, ...compStyles.NotificationButton }}
					onPress={()=> { navRef.navigate("Notification") }}
				>
					<View style={compStyles.NotificationTextView}>
						<Text style={compStyles.NotificationText}>1</Text>
					</View>
				</Button>
				<Image style={compStyles.Logo} source={require("../assets/InTune_Logo.png")} />
				{
					{
						"picture":
							(<Button
								style={{ ...styles.Button, ...compStyles.ProfilePicButton }}
								imgStyle={styles.ProfilePicImg}
								onPress={() => { navRef.navigate("Profile") }}
								image={picture} />),

						"settings":
							(<Button
								style={{ ...styles.Button, ...compStyles.SettingsButton }}
								imgStyle={compStyles.SettingsPic}
								onPress={() => { navRef.navigate("Settings") }}
								image={require("../assets/settings.png")} />)
					}[['Profile', 'Settings', 'Login'].includes(page) ? "settings" : "picture"]
				}
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
	SettingsButton: {
		width: "15%",
		aspectRatio: 1 / 1,
		backgroundColor: "black",
	},
	SettingsPic: {
		width: "80%",
		height: "80%",
		backgroundColor: "black",
		borderRadius: 100
	},
	NotificationButton: {
		aspectRatio: 1 / 1,
		width: "15%",
		borderRadius: 100,
		backgroundColor: colors.GreyNi,
		overflow: "visible"
	},
	NotificationTextView: {
		position: "absolute",
		right: 0,
		bottom:0,
		aspectRatio: 1 / 1,
		width: "35%",
		backgroundColor: colors.PurpleSb,
		borderRadius: 100,
		justifyContent: "center"
	},
	NotificationText: {
		color: colors.WhiteGb,
		textAlign: "center",
	},
	ProfilePicButton: {
		aspectRatio: 1 / 1,
		width: "15%",
		borderRadius: 100,
		borderWidth: 1,
		borderColor: colors.GreyNi,
	},
})
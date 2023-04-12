import { useContext, useEffect } from 'react';
import { Image, StyleSheet, View, Animated, StatusBar } from "react-native";
import { styles } from "../styles/App.component.style.js";
import { Button } from "./Button";
import { AppState } from '../utils/AppState.js';

export const Header = (props) => {
	const {showRef, navRef} = props
	
	const [{friends, page}, dispatch] = useContext(AppState);
	
	let picture = "";
	if (friends[0]) picture = friends[0].picture

	useEffect(() => {
		const unsubNav = navRef.addListener('state', (e) => {
			const state = e.data.state;
			const ind = state?.index;
			if(ind !== undefined) dispatch({type: 'setPage', page: state.routes[ind].name})
		})
		return () => unsubNav()
	}, [navRef])

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
				{
					{
						"picture": 
							(<Button 
							style={{...styles.Button, ...styles.ProfilePicButton}}
							imgStyle={styles.ProfilePicImg}
							onPress={()=>{navRef.navigate("Profile")}}
							image={{uri: 'data:image/jpeg;base64,' + picture}}/>),
					
						"settings": 
							(<Button 
							style={{...styles.Button, ...compStyles.SettingsButton}}
							imgStyle={compStyles.SettingsPic}
							onPress={()=>{navRef.navigate("Settings")}}
							image={require("../assets/settings.png")}/>)
					}[['Profile', 'Settings'].includes(page) ? "settings" : "picture"]
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
		margin: "3%",
	},
	SettingsPic: {
		width: "110%",
		height: "110%",
		backgroundColor: "black",
		borderRadius: 100
	}
})
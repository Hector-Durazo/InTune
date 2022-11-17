import { useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, Dimensions } from "react-native";
import { auth } from "../firebaseConfig";
import styles from "../styles/App.component.style.js";
import Button from './Button.js';
import Track from './Track';

export default function Post(props) {
	const { data } = props;

	return (
		<View style={{
			...compStyles.PostContainer,
			backgroundColor: data.color
			}}>

			<View style={compStyles.UserRow}>
				<Button pressStyle={compStyles.UserPic}/>
				<View style={compStyles.UserDetails}>
					<Text style={compStyles.DisplayName}>{auth.currentUser.displayName}</Text>
					<Text style={compStyles.UserName}>{auth.currentUser.username}</Text>
				</View>
			</View>
			<View style={compStyles.UserDetails}>
				<View style={compStyles.CaptionContainer}>
					<Text style={compStyles.UserName}>{data.caption}</Text>
				</View>
				<Track data={ data } variant="post"/>
			</View>
			

		</View>
	);
}

const compStyles = StyleSheet.create({
	PostContainer: {
		aspectRatio: "1.8/1",
		width: "90%",
		borderRadius: "20%",
		marginBottom: "2%",
		padding: "4%"
	},
	UserRow: {
		flexDirection: "row"
	},
	UserPic: {
		aspectRatio: "1/1",
		width: "15%",
		borderRadius: "100%"
	},
	UserDetails: {
		flexDirection: "column",
		marginHorizontal: "5%",
		height: "90%",
		alignItems: "center"
	},
	DisplayName: {
		color: "#DFDDE4",
		fontSize: 20
	},
	UserName: {
		color: "#DFDDE4",
		fontSize: 15
	},
	CaptionContainer: {
		backgroundColor: "rgba(0, 0, 0, 0.15)",
		borderRadius: "50%",
		width: "85%",
		height: "30%",
		justifyContent: "center",
		alignItems: "flex-start",
		paddingLeft: "4%"
	}
})
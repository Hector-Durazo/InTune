import { useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, Dimensions } from "react-native";
import { auth } from "../firebaseConfig";
import { styles, colors } from "../styles/App.component.style.js";
import Button from './Button.js';
import Track from './Track';

export default function Post(props) {
	const { data } = props;

	var timeText = "";
	const timeSince = (new Date().getTime() - data.postedOn)/1000;
	if(timeSince < 60){
		timeText = Math.round(timeSince) + " seconds ago";
	} else if(timeSince < 3600){
		timeText = Math.round(timeSince/60) + " minutes ago";
	} else if(timeSince < 86400){
		timeText = Math.round(timeSince/3600) + " hours ago";
	} else{
		const date = new Date()
		date.setMilliseconds(data.postedOn)
		timeText = date.getDate()
	}

	return (
		<View style={{
			...compStyles.PostContainer,
			backgroundColor: data.color
			}}>

			<View style={compStyles.UserRow}>
				<Button pressStyle={compStyles.UserPic}/>
				<View style={compStyles.UserDetails}>
					<Text style={compStyles.DisplayName}>{auth.currentUser.displayName}</Text>
					<Text style={{...compStyles.UserName}}>{auth.currentUser.username}</Text>
				</View>
				<View style={compStyles.PostDetails}>
					<Text style={compStyles.TimeText}>{timeText}</Text>
					<Text style={{...compStyles.CommentText}}>1 Comment</Text>
				</View>
			</View>
			<View style={compStyles.UserDetails}>
				<View style={compStyles.CaptionContainer}>
					<Text style={compStyles.CaptionText}>{data.caption}</Text>
				</View>
				<Track data={ data } variant="post"/>
			</View>
			

		</View>
	);
}

const compStyles = StyleSheet.create({
	PostContainer: {
		aspectRatio: "1.5/1",
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
		borderRadius: "100%",
		margin: "3%",
		borderWidth: 1,
	},
	UserDetails: {
		flexDirection: "column",
		height: "90%",
		alignItems: "flex-start"
	},
	DisplayName: {
		color: colors.BlackSm,
		fontSize: 20
	},
	UserName: {
		color: colors.GreyNi,
		fontSize: 15
	},
	PostDetails: {
		flexDirection: "column",
		height: "40%",
		width: "45%",
		alignItems: "flex-end",
		marginLeft: "0%",
		marginTop: 5
	},
	TimeText: {
		fontSize: 15,
		color: colors.BlackSm,
		textAlign: "right",
	},
	CommentText: {
		fontSize: 15,
		color: colors.GreyNi,
		textAlign: "right",
	},	
	CaptionText: {
		color: colors.WhiteGb,
		fontSize: 15
	},
	CaptionContainer: {
		backgroundColor: "rgba(0, 0, 0, 0.30)",
		borderRadius: 20,
		width: "95%",
		height: "30%",
		justifyContent: "center",
		alignItems: "flex-start",
		paddingLeft: "4%",
		marginVertical: "3%",
		marginHorizontal: "2.5%"
	}
})
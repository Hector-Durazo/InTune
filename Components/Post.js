import { useContext, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, Dimensions } from "react-native";
import { auth } from "../firebaseConfig";
import { styles, colors } from "../styles/App.component.style.js";
import { AppState } from '../utils/AppState';
import { Button } from './Button';
import { Track } from './Track';

export const Post = (props) => {
	const { data } = props;
	const [{friends}, dispatch] = useContext(AppState);
	let picture = null;
	const user = friends.find(user => user.username === data.username);
	if (user && user.picture) picture = {uri: user.picture};
	

	var timeText = "";
	const timeSince = (new Date().getTime() - data.postedOn)/1000;
	if(timeSince < 60){
		timeText = Math.round(timeSince) + " seconds ago";
	} else if(timeSince < 3600){
		timeText = Math.round(timeSince/60) + " minutes ago";
	} else if(timeSince < 86400){
		timeText = Math.round(timeSince/3600) + " hours ago";
	} else if(timeSince < 86400*8){
		timeText = Math.round(timeSince/86400) + " days ago";
	}else{
		const date = new Date(data.postedOn);
		timeText = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
	}

	return (
		<View style={{
			...compStyles.PostContainer,
			backgroundColor: data.color
			}}>

			<View style={compStyles.UserRow}>
				<Button 
					style={styles.ProfilePicButton}
					imgStyle={styles.ProfilePicImg}
					image={picture}
					/>
				<View style={compStyles.UserDetails}>
					<Text style={compStyles.DisplayName}>{auth.currentUser.displayName}</Text>
					<Text style={{...compStyles.UserName}}>{auth.currentUser.username}</Text>
				</View>
				<View style={compStyles.PostDetails}>
					<Text style={compStyles.TimeText}>{timeText}</Text>
					<Text style={{...compStyles.CommentText}}>1 Comment</Text>
				</View>
			</View>
			<Track data={ data } variant="post"/>
		</View>
	);
}

const compStyles = StyleSheet.create({
	PostContainer: {
		aspectRatio: 1.5/1,
		width: "90%",
		borderRadius: 20,
		marginBottom: "2%",
		padding: "4%"
	},
	UserRow: {
		flexDirection: "row",
		height: "30%",
		marginBottom: "2%",
		paddingLeft: "2%"
	},
	UserDetails: {
		flexDirection: "column",
		height: "100%",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		marginLeft: "2%",
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
		height: "100%",
		width: "45%",
		alignItems: "flex-end",
		justifyContent: "flex-start",
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
	},

})
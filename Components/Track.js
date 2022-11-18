import { useEffect, useRef } from 'react';
import { View, Pressable, Text, StyleSheet, Image, Animated, Dimensions, TextInput, NativeModules } from "react-native";
import styles from "../styles/App.component.style.js";
import Button from './Button.js';
import { addPost } from '../utils/UserData.js';

export default function Track(props) {
	let { data, selected, onSubmit, variant="search" } = props

	const winWidth = Dimensions.get('window').width;

	const slide = useRef(new Animated.Value(0)).current
	const height = slide.interpolate({
		inputRange: [0,1],
		outputRange: [winWidth*.22, winWidth*.5]
	});

	const caption = useRef("");

	function select() {
		if(selected.current) {
			Animated.timing(selected.current, {
				toValue: 0,
				duration: 500,
				useNativeDriver: false
			}).start()
		}
		
		selected.current = slide;
		Animated.timing(slide, {
			toValue: 1,
			duration: 500,
			useNativeDriver: false
		}).start()
	}
	

	async function submit() {
		var postData = {
			postedOn: new Date().getTime(),
			caption: caption.current,
			title: data.name,
			artist: data.artists[0].name,
			artUrl: data.album.images[2].url,
			color: ""
		}

		try{
			const colorRes = await 
			fetch("https://us-central1-intune-cbe3f.cloudfunctions.net/color?url="+
			data.album.images[2].url, {
				method: 'GET',
				headers: {
					"Content-Type": "application/json"
				},
			});
			const color = await colorRes.json();
			postData.color = color.hex;
		} catch (err) {
			console.error(err);
		}
		
		addPost(postData.postedOn, postData)
		onSubmit();
	}

	const albumImg = 
		<Image
		style={{...compStyles.AlbumArt}} 
		source={{
			uri: variant == "search" ? data.album.images[2].url : data.artUrl
		}}/>

	return (
		<Animated.View style= {{
			...compStyles.TrackContainer, 
			height: variant == "search" ? height : "45%"
			}}>
			<Pressable 
			// style={{
				
			// }}
			onPress={select}
			>
				<View style={{...compStyles.Row, }}>
					{albumImg}
					<View style={{...compStyles.TextContainer}}>
						<Text style={{...compStyles.Text}} numberOfLines={1}>{data.title}</Text>
						<Text style={{...compStyles.Text}}>{data.artist}</Text>
					</View>
				</View>
				
			</Pressable>
			{ variant == "search" ?
			<Animated.View style={{...compStyles.Selected}}>
					<TextInput 
					style={compStyles.CaptionText}
					placeholder="Add a Caption..."
					placeholderTextColor={"black"}
					value={caption}
					onChangeText={text => caption.current=text}
					/>
					<Button 
					variant="accent" 
					textStyle={{fontSize:16}} 
					pressStyle={compStyles.Button}
					onPress={submit}>
						Submit
					</Button>
			</Animated.View>
			: null}
		</Animated.View>
	)
}

const compStyles = StyleSheet.create({
	TrackContainer: {
		height: "5%",
		width: "97%",
		backgroundColor: "#DFDDE4",
		borderRadius: 50,
		marginBottom: 5,
		marginHorizontal: "5%",
		paddingHorizontal: "5%",

	},
	Row: {
		flexDirection: "row",
		alignItems: "center"
	},
	AlbumArt: {
		aspectRatio: "1/1",
		height: 48,
		margin: "5%",
		borderRadius: "10%",
		borderColor: "black",
		borderWidth: 1
	},
	TextContainer: {
		display: "flex",
		flexDirection: "column",
		width: "70%",
	},
	Text: {
		flex: 0,
		width: "100%"
	},
	Selected: {
		alignItems: "center",
		justifyContent: "flex-start"
	},
	CaptionText: {
		backgroundColor: "rgba(0, 0, 0, 0.15)",
		color: "black",
		width: "80%",
		height: "35%",
		borderRadius: "25%",
		padding: "3%",
	},
	Button: {
		width: "25%",
		height: "30%",
		marginLeft: "55%"
	}
})
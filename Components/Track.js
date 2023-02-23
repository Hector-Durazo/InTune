import { useRef } from 'react';
import { View, Pressable, Text, StyleSheet, Image, Animated, TextInput } from "react-native";
import { styles, colors } from "../styles/App.component.style.js";
import Button from './Button.js';
import { addPost } from '../utils/UserData.js';
import { auth } from "../firebaseConfig";

export function Track(props) {
	let { data, selected, onSubmit, variant="search" } = props
	const slide = useRef(new Animated.Value(0)).current
	const height = slide.interpolate({
		inputRange: [0,1],
		outputRange: ['3%', '8%']
	});

	const caption = useRef("");

	function select() {
		if(variant!="search") return;
		// Slide currently selected track back to default.
		if(selected.current) {
			Animated.timing(selected.current, {
				toValue: 0,
				duration: 500,
				useNativeDriver: false
			}).start()
		}
		
		// Set new selected track
		selected.current = slide;
		Animated.timing(slide, {
			toValue: 1,
			duration: 500,
			useNativeDriver: false
		}).start()
	}
	

	async function submit() {
		var postData = {
			displayName: auth.currentUser.displayName,
			username: auth.currentUser.username,
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
			onPress={select}
			>
				<View style={{...compStyles.Row, }}>
					{albumImg}
					<View style={{...compStyles.TextContainer}}>
						<Text style={{...compStyles.Text}} numberOfLines={1}>{data.title}</Text>
						<Text style={{...compStyles.Text, color:colors.GreyNi}}>{data.artist}</Text>
					</View>
				</View>
				
			</Pressable>
			{ variant == "search" ?
			<Animated.View style={{
				...compStyles.Selected,
				height: height == "3%" ? '0%' : '75%'
				}}>
					<TextInput 
					style={compStyles.CaptionText}
					placeholder="Add a Caption..."
					placeholderTextColor={colors.GreyNi}
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
		// height: declared inline
		width: "95%",
		backgroundColor: colors.BlackSm,
		borderRadius: 25,
		marginBottom: 5,
		marginHorizontal: "2%",
		paddingHorizontal: "5%",
		borderWidth: 1,
		borderColor: colors.GreyNi,
	},
	Row: {
		flexDirection: "row",
		alignItems: "center"
	},
	AlbumArt: {
		aspectRatio: 1/1,
		height: 48,
		marginVertical: "5%",
		marginRight: "2%", 
		borderRadius: 10,
		borderColor: colors.WhiteGb,
		borderWidth: 1
	},
	TextContainer: {
		display: "flex",
		flexDirection: "column",
		width: "70%",
		alignItems:"flex-start"
	},
	Text: {
		flex: 0,
		width: "100%",
		color: colors.WhiteGb
	},
	Selected: {
		alignItems: "center",
		justifyContent: "flex-start"
	},
	CaptionText: {
		backgroundColor: "black",
		color: colors.WhiteGb,
		width: "95%",
		height: "30%",
		borderRadius: 25,
		paddingHorizontal: "5%",
	},
	Button: {
		width: "27%",
		height: "30%",
		marginLeft: "67%",
		marginTop: "3%"
	}
})
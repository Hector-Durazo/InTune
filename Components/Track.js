import { useRef } from 'react';
import { View, Pressable, Text, StyleSheet, Image, Animated, TextInput } from "react-native";
import { styles, colors } from "../styles/App.component.style.js";
import { Button } from './Button.js';
import { addPost } from '../utils/UserData.js';
import { auth } from "../firebaseConfig";
import { getVibrant } from '../utils/Spotify.js';

export const Track = (props) => {
	let { data, selected, onSubmit, variant = "search" } = props
	const slide = useRef(new Animated.Value(0)).current
	const height = slide.interpolate({
		inputRange: [0, 1],
		outputRange: ['15%', '33%']
	});

	const caption = useRef("");

	function select() {
		if (variant != "search") return;
		// Slide currently selected track back to default.
		if (selected.current) {
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
		postData.color = getVibrant(postData.artUrl)

		addPost(postData.postedOn, postData)
		onSubmit();
	}

	return (
		<Animated.View style={{
			...compStyles.TrackContainer,
			height: variant == "search" ? height : "70%"
		}}>
			<Pressable onPress={select} >
				<View style={{ ...compStyles.Row, }}>
					<Image
						style={{ ...compStyles.AlbumArt }}
						source={{
							uri: variant == "search" ? data.album.images[2].url : data.artUrl
						}}
					/>
					<View style={{ ...compStyles.TextContainer }}>
						<Text style={{ ...compStyles.Text }} numberOfLines={1}>{data.title}</Text>
						<Text style={{ ...compStyles.Text, color: colors.GreyNi }}>{data.artist}</Text>
					</View>
				</View>

				{
					{
						"search": (
							< Animated.View style={{
								...compStyles.Selected,
								height: height == "15%" ? '0%' : '67%'
							}}>
								<TextInput
									style={compStyles.CaptionTextInput}
									placeholder="Add a Caption..."
									placeholderTextColor={colors.GreyNi}
									value={caption}
									onChangeText={text => caption.current = text}
								/>
								<Button
									variant="accent"
									textStyle={{ fontSize: 16 }}
									style={compStyles.Button}
									onPress={submit}>
									Submit
								</Button>
							</Animated.View>),

						"post": (
							<View style={compStyles.CaptionView}>
								<Text style={compStyles.CaptionText}>
									{data.caption}
								</Text>
							</View>
						)

					}[variant]
				}

			</Pressable>

		</Animated.View >
	)
}

const compStyles = StyleSheet.create({
	TrackContainer: {
		// height: declared inline
		width: "95%",
		display: "flex",
		flexDirection: "column",
		backgroundColor: colors.WhiteGb,
		borderRadius: 25,
		marginBottom: 5,
		marginHorizontal: "2%",
		paddingHorizontal: "5%",
		borderWidth: 0,
		borderColor: colors.GreyNi,
		elevation: 3,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 1,
	},
	Row: {
		flexDirection: "row",
		alignItems: "center"
	},
	AlbumArt: {
		aspectRatio: 1 / 1,
		height: 65,
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
		alignItems: "flex-start"
	},
	Text: {
		flex: 0,
		width: "100%",
		color: colors.BlackSm
	},
	Selected: {
		alignItems: "center",
		justifyContent: "flex-start"
	},
	Button: {
		width: "27%",
		height: "30%",
		marginLeft: "70%",
		marginTop: "2%",
		backgroundColor: colors.PurpleSb,
	},
	ButtonText: {
		fontSize: 16,
		color: colors.WhiteGb
	},
	CaptionView: {
		display: "flex",
		justifyContent: "center",
		backgroundColor: "background: rgba(0, 0, 0, 0.18)",
		height: "27%",
		borderRadius: 100
	},
	CaptionText: {
		color: colors.BlackSm,
		width: "95%",
		borderRadius: 25,
		paddingHorizontal: "5%",
	},
	CaptionTextInput: {
		backgroundColor: "background: rgba(0, 0, 0, 0.18)",
		width: "95%",
		height: "30%",
		borderRadius: 25,
		paddingHorizontal: "5%",
	}
})
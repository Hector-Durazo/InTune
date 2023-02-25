import { useRef } from 'react';
import { View, TextInput, StyleSheet, Image } from "react-native";
import { styles } from "../styles/App.component.style.js";

// Search Bar Component

export const Search = (props) => {
	let {onChange, placeholder} = props;

	const token = useRef(null);
	const refresh = useRef(null);

	return (
		<View style={{...styles.Row, ...styles.TextField, ...compStyles.SearchContainer}}>
			<Image style={compStyles.SearchIcon} source={require("../assets/magnifyingGlass.png")}/>
			<TextInput 
			style={compStyles.SearchText}
			placeholder={placeholder}
			onChangeText={text => {
				onChange(text)
			}}
			/>
		</View>
	)
}

const compStyles = StyleSheet.create({
	SearchContainer: {
		width: "75%",
		height: "5%",
		margin: "5%",
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "black"
	},
	SearchIcon: {
		aspectRatio: 1/1,
		width: "8%",
		marginRight: "5%",
		tintColor: "#DFDDE4"
	},
	SearchText: {
		width: "85%",
		color: "#DFDDE4",
	}
})
import { Pressable, Image, StyleSheet, View } from "react-native"
import styles from "../styles/App.component.style.js"
import Button from "../components/Button.js"

export default function Header(props) {
	let {profile} = props

	return(
		<View styles={styles.Row}>
			<Button></Button>
			<Image style={headerStyle.Logo} source={require("../assets/InTune_Logo_Icon.png")}/>
			<Button></Button>
		</View>
	)
}

const headerStyle = StyleSheet.create({
	Logo: {
		height: "50%",
		width: "auto"
	}
})
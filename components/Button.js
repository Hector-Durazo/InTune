import { Pressable, Text, StyleSheet } from "react-native"

// Button Component
// Has variants:
//		regular - black on white
//		accent	- white on purple
// Usage:
// 		<Button variant="accent">Button Text</Button>

export default function Button(props) {
	let {children, onPress, variant="regular"} = props;
	let buttonStyles = {};
	switch(variant) {
		case "regular":
			buttonStyles = {
				backgroundColor: "#DFDDE4",
				color: "black",
			}
			break;
		case "accent":
			buttonStyles = {
				backgroundColor: "#8D6AF6",
				color: "#DFDDE4",
			}
			break;
	}
	return (
		<Pressable onPress={onPress} style={({pressed})=>[
			{
				...styles.Button, ...buttonStyles,
				transform: [{scale: pressed ? 0.9 : 1.0}]
			}]}>
            <Text style={{...styles.Text, ...buttonStyles}}>{children}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	Text: {
		textAlign: 'center',
		fontSize: 20,
		fontFamily: "Inter_400Regular",
		fontWeight: "400",
		padding: 0
	},
	Button: {
		marginVertical: "1%",
		width: "70%",
		paddingVertical: "3%",
		borderRadius: 15,
	}
})
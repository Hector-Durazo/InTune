import { Pressable, Text, StyleSheet, Image } from "react-native"
import { styles, colors } from "../styles/App.component.style";

// Button Component
// Has variants:
//		regular - black on white
//		accent	- white on purple
// Usage:
// 		<Button variant="accent">Button Text</Button>

export const Button = (props) => {
	let {
		children, onPress, style = {}, 
		image, imgStyle, textStyle
	} = props;


	if (typeof children === 'string') children = (<Text style={textStyle}>{children}</Text>);
	if (image) children = (<Image source={image} style={imgStyle} />);

	return (
		<Pressable onPress={onPress}
			style={({pressed}) => [{
					...compStyles.Button, ...style,
					transform: [{ scale: pressed ? 0.9 : 1.0 }]
			}]}>
			{children}
		</Pressable>
	)
}

const compStyles = StyleSheet.create({
	Button: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
	}
})
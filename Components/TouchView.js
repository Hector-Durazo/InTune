import { TouchableWithoutFeedback, Keyboard, View } from "react-native";

export const TouchView = (props) => {
	const { children, style } = props
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={style}>
				{children}
			</View>
		</TouchableWithoutFeedback>
	)
}
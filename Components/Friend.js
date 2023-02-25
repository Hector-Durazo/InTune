import { View, Pressable, Text, StyleSheet, Image, Animated, TextInput } from "react-native";
import { styles, colors } from "../styles/App.component.style.js";

export const Friend = (props) => {
    // don't know what props yet

    // TODO: add friend image, add friend name/username
    return (
        <Animated.View style={{...compStyles.Container}}>
            <Pressable>
                <View style={{...compStyles.Row}}>
                    <Text style={{...compStyles.Text}}>
                        {"Hello World"}
                    </Text>
                </View>
            </Pressable>
        </Animated.View>
    )
}

const compStyles = StyleSheet.create({
    // taken from track.js
    // TODO: update css
    Container: {
        width: "95%",
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
    Text: {
		flex: 0,
		width: "100%",
		color: colors.BlackSm
	},
})
import { View, Pressable, Text, StyleSheet, Image, Animated, TextInput } from "react-native";
import { styles, colors } from "../styles/App.component.style.js";
import { Button } from './Button';

export const Friend = (props) => {
    
    const { data, navigation } = props

    const onPress = (event) => {
        navigation.navigate('User', { data }) // TODO: push is probably preferred to save screen state
    }

    return (
        <Animated.View style={{...compStyles.Container}}>
            <Pressable style={{...compStyles.Row}} onPress={onPress}>
                <Image style = {compStyles.ProfilePicButton} source={{uri: 'data:image/jpeg;base64,' + data.picture}}/>
                <View style={compStyles.Column}>
                    <Text style={{...compStyles.Name}}>
                        {data.displayName}
                    </Text>
                    <Text style={{...compStyles.Username}}>
                        {data.username}
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
        height: "12%",
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
		alignItems: "center",
	},
    Column: {
        display: "flex",
		flexDirection: "column",
        width: "70%",
		alignItems: "flex-start"
	},
    Name: {
        alignSelf: "flex-start",
		color: colors.BlackSm,
        fontSize: 15,
        
	},
    Username: {
        alignSelf: "flex-start",
		color: colors.BlackSm,

        fontSize: 10,
	},
    ProfilePicButton: {
        height: 50,
        borderRadius: 100,
        borderWidth: 1,
        marginRight: "2%",
    }
})
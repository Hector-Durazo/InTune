import { useContext, useRef } from 'react';
import { View, Pressable, Text, StyleSheet, Image, Animated, TextInput } from "react-native";
import { styles, colors } from "../styles/App.component.style.js";
import { AppState } from '../utils/AppState';
import { Button } from './Button.js';

export const Notification = (props) => {
    const { data, navigation } = props
    let picture = { uri: data.picture }

    const notifText = {
        "friend_request": `${data.username} sent you a friend request`,
        "post": `${data.username} posted a new song`,
    }

    const buttonText = {
        "friend_request": `Accept`,
        "post": `See Post`,
    }

    const onPress = (event) => {
        // does an action to the notification
    }

    return (
        <Pressable style={compStyles.Row}>
            <Button
                style={styles.ProfilePicButton}
                imgStyle={styles.ProfilePicImg}
                image={picture}
                onPress={() => {
                    navigation.navigate("User", { data: data })
                }}
            />
            <Text numberOfLines={2} style={compStyles.NotifText}>
                {notifText[data.type]}
            </Text>
            <Button 
                onPress={onPress} 
                style={compStyles.QuickButton}
                textStyle={{color:colors.WhiteGb}}>
                {buttonText[data.type]}
            </Button>
        </Pressable>
    )
}

const compStyles = StyleSheet.create({
    Row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "95%",
        height: "120%",
        paddingHorizontal: "2%",
        backgroundColor: colors.WhiteGb,
        borderRadius: 25,
    },
    NotifText: {
        marginHorizontal: "3%",
        marginRight: "6%",
        width: "50%",
        fontSize: 16
    },
    QuickButton: {
        justifyContent: "center",
        backgroundColor: colors.PurpleSb,
        width: "20%",
        height: "65%", 
        borderRadius: 20
    }
})
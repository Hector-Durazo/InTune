import { useContext, useRef, useState } from 'react';
import { View, Pressable, Text, StyleSheet, Image, Animated, TextInput } from "react-native";
import { styles, colors } from "../styles/App.component.style.js";
import { AppState } from '../utils/AppState';
import { Button } from './Button.js';
import { addFriend } from '../utils/UserData'

export const Notification = (props) => {
    const { data, navigation } = props
    const [ show, setShow ] = useState("flex")
    let picture = { uri: data.picture }

    const notifText = {
        "friend_request": `${data.username} sent you a friend request`,
        "post": `${data.username} posted a new song`,
    }

    const buttonText = {
        "friend_request": `Accept`,
        "post": `See Post`,
    }

    return (
        <Pressable style={{
            ...compStyles.Row,
            display: {show}
        }}>
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
                onPress={() => {
                    addFriend(data)
                    setShow("none")
                }} 
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
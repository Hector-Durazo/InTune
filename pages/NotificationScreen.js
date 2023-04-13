import React, { useRef, useEffect, useState, useContext } from "react";
import { Animated, View, StyleSheet, ScrollView, Text } from "react-native";
import { styles, colors } from "../styles/App.component.style.js";
import { Notification } from "../components/Notification.js";
import { AppState } from '../utils/AppState.js';


export const NotificationScreen = ({navigation, route}) => {
	// Screen Variables, Refs, and Hooks

	const [{ requests }, dispatch] = useContext(AppState);

	const compileNotifications = () => {
		const notifications = Object.values(requests)
		const uids = Object.keys(requests)
		for (let i = 0; i < notifications.length; i++) {
			notifications[i].uid = uids[i]
			notifications[i].type = 'friend_request'
		}
		console.log(notifications)
		return notifications
	}

	const notifications = compileNotifications()
	const notifList = notifications.map((notif, index) => (
		<Notification key={index} data={notif} navigation={navigation}/>
	));

	return (
		// Page Contents
		<View style={styles.MainView}>
			<Text style={{ ...styles.Text, ...styles.TextLight, ...styles.Heading }}>
				Notifications
			</Text>
			<ScrollView
				style={styles.ScrollView}
				contentContainerStyle={{ alignItems: "center" }}>
				{notifList}
			</ScrollView>
		</View>
	);
}

// Page specific styles
const ScreenStyles = StyleSheet.create({

})
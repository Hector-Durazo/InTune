import { useRef } from 'react';
import {
	View, Text, TextInput, StyleSheet,
	Animated, Dimensions, TouchableWithoutFeedback,
	Keyboard
} from "react-native";
import { FirebaseRecaptcha, FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { app, auth, db } from "../firebaseConfig.js";
import { spotifyCredentials, authorizeSpotify } from '../spotifyConfig.js';
import { checkNewUser, updateUserData } from "../utils/UserData.js";
import { styles } from "../styles/App.component.style.js";
import { Button } from "./Button";

export const PhoneInput = (props) => {
	let { loginFade, user, onConfirm } = props;

	const verifier = useRef(null);
	const phoneNo = useRef(null);
	const ext = useRef("+1");

	const inputSlide = useRef(new Animated.Value(0)).current;
	const winWidth = Dimensions.get('window').width;

	const verifId = useRef(null);
	const verifCode = useRef(null);

	const dispName = useRef("");
	const username = useRef("");

	function slideInput(pos) {
		Animated.timing(inputSlide, {
			toValue: pos,
			duration: 500,
			useNativeDriver: true
		}).start()
	}

	async function sendCode() {
		try {
			let phoneNumber = "" + ext.current + phoneNo.current;
			console.log(phoneNumber)

			auth.settings.appVerificationDisabledForTesting = false;
			// FOR DEV TESTING - REMOVE ON PRODUCTION
			if (phoneNumber == "+1null" || phoneNumber == "+1") {
				phoneNumber = "+10123456789"
			}

			const provider = new PhoneAuthProvider(auth);
			verifId.current = await provider.verifyPhoneNumber(phoneNumber, verifier.current);

			//If successfully sent code
			slideInput(1)

		} catch (err) {
			console.log(err)
		}
	}

	async function confirmCode() {
		try {
			if (verifCode.current == null) {
				verifCode.current = "123456"
			}

			const credential = PhoneAuthProvider.credential(verifId.current, verifCode.current);
			user.current = await signInWithCredential(auth, credential);
			// If existing user, log in
			await checkNewUser(user.current.user).then((isNew) => {
				if (!isNew) onConfirm();
			})
			// Continue Creating Account
			slideInput(2);

		} catch (err) {
			console.log(err)
		}
	}

	function linkSpotify() {
		if ((dispName.current == "") || (username.current == "")) return;
		updateUserData(user.current.user, {
			displayName: dispName.current,
			username: username.current,
		})
		onConfirm();
	}

	return (
		<Animated.View style={{
			...styles.Row,
			width: "400%",
			opacity: loginFade,
			transform: [{
				translateX: inputSlide.interpolate({
					inputRange: [0, 1, 2, 3],
					outputRange: [winWidth * 3 / 2, winWidth * 1 / 2, -winWidth * 1 / 2, -winWidth * 3 / 2]
				})
			}]
		}}>
			<View style={{ ...styles.MainView, width: "25%" }}>
				<Text style={{
					...styles.Text, ...styles.TextLight, ...compStyles.Text,
					fontSize: 14
				}}>
					Enter Phone Number
				</Text>
				<View style={{ ...styles.Row, ...styles.TextField, ...compStyles.InputContainer }}>
					<TextInput
						style={{ ...compStyles.ExtField }}
						keyboardType="numeric"
						value={ext}
						defaultValue="+1"
						onChangeText={text => ext.current = text}
					/>
					<TextInput
						style={{ ...compStyles.PhoneField }}
						keyboardType="numeric"
						placeholder="(000) 000-0000"
						onChangeText={text => phoneNo.current = text}
					/>
				</View>
				<Button
					style={{ ...styles.Button, ...compStyles.Button, ...styles.Purple }}
					textStyle={{ ...styles.Text, ...styles.TextLight }}
					onPress={sendCode}
				>Continue
				</Button>
			</View>
			<View style={{ ...styles.MainView, width: "25%" }}>
				<Text style={{
					...styles.Text, ...styles.TextLight, ...compStyles.Text,
					fontSize: 14
				}}>
					We sent you a code!
				</Text>
				<TextInput
					placeholder="Confirmation Code"
					keyboardType="numeric"
					style={{ ...styles.TextField, ...compStyles.ConfField }}
					value={verifCode}
					onChangeText={value => verifCode.current = value}
				/>
				<Button
					style={{ ...styles.Button, ...compStyles.Button, ...styles.Purple }}
					textStyle={{ ...styles.Text, ...styles.TextLight }}
					onPress={confirmCode}>
					Confirm
				</Button>
				<Button
					style={{ ...styles.Button, ...compStyles.Button, ...styles.White }}
					textStyle={{ ...styles.Text, ...styles.TextDark }} 
					onPress={() => slideInput(0)}>
					Cancel
				</Button>
			</View>
			<View style={{ ...styles.MainView, width: "25%" }}>
				<Text style={{
					...styles.Text, ...styles.Heading,
					...compStyles.Text, color: "#8D6AF6",
				}}>
					Welcome!
				</Text>
				<Text style={{
					...styles.Text, ...styles.TextLight, ...compStyles.Text,
					fontSize: 14
				}}>
					Display Name
				</Text>
				<TextInput
					placeholder="John Doe"
					style={{ ...styles.TextField, ...compStyles.ConfField, height: "12%" }}
					value={dispName}
					onChangeText={value => dispName.current = value}
				/>
				<Text style={{
					...styles.Text, ...styles.TextLight, ...compStyles.Text,
					fontSize: 14
				}}>
					Username
				</Text>
				<TextInput
					placeholder="jdoe1"
					style={{ ...styles.TextField, ...compStyles.ConfField, height: "12%" }}
					value={username}
					onChangeText={value => username.current = value}
				/>
				<Button
					style={{ ...styles.Button, ...compStyles.Button }}
					onPress={linkSpotify}>
					Link Spotify
				</Button>
			</View>

			<FirebaseRecaptchaVerifierModal
				firebaseConfig={app.options}
				attemptInvisibleVerification={true}
				ref={verifier}
			/>
		</Animated.View>
	)
}

const compStyles = StyleSheet.create({
	Recaptcha: {
		width: 300,
		maxHeight: 400,
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	InputContainer: {
		padding: 0,
		width: "70%",
		height: "18%",
		marginBottom: "2%",
	},
	PhoneField: {
		width: "75%",
		height: "100%",
		color: "#DFDDE4",
		fontSize: 18,
	},
	ExtField: {
		width: "15%",
		height: "100%",
		backgroundColor: "#8D6AF6",
		color: "#DFDDE4",
		marginRight: "5%",
		borderRadius: 15,
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
		fontSize: 18,
		textAlign: 'center',
	},
	ConfField: {
		width: "70%",
		height: "18%",
		fontSize: 24,
		marginBottom: "2%",
		textAlign: "center",
	},
	Button: {
		width: "70%",
		height: "12%",
		marginVertical: "1%",
		marginBottom: "5%",
	},
	Text: {
		width: "68%",
		textAlign: "left",
		marginBottom: "3%",
	},
})


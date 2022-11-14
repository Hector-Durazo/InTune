import { useRef } from 'react';
import { View, TextInput, StyleSheet, Animated, Dimensions } from "react-native";
import { FirebaseRecaptcha, FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { app, auth } from "../firebaseConfig.js";
import styles from "../styles/App.component.style.js";
import Button from "./Button.js";

// PhoneInput Component
// Usage:
// 		

export default function PhoneInput(props) {
	let {loginFade, user, onConfirm} = props;

	

	const verifier = useRef(null);
	const phoneNo = useRef(null);
	const ext = useRef("+1");

	const inputSlide = useRef(new Animated.Value(0)).current;
	const winWidth = Dimensions.get('window').width;

	const verifId = useRef(null);
	const verifCode = useRef(null);

	var slidePos = 1
	function slideInput() {
		Animated.timing(inputSlide,{
			toValue: slidePos,
			duration: 500,
			useNativeDriver: true
		}).start()
		slidePos == 0 ? slidePos = 1 : slidePos = 0;
	}

	async function sendCode() {
		try{
			const provider = new PhoneAuthProvider(auth);
			const phoneNumber = ""+ext.current+phoneNo.current;
			console.log(phoneNumber)
			verifId.current = await provider.verifyPhoneNumber(phoneNumber, verifier.current);

			//If successfully sent code
			slideInput()

		} catch(err) {
			console.log(err)
		}
	}

	async function confirmCode() {
		try {
			const credential = PhoneAuthProvider.credential(verifId.current, verifCode.current);
			user.current = await signInWithCredential(auth, credential);
			onConfirm();
		} catch(err) {
			console.log(err)
		}
	}
	
	return (
		<Animated.View style={{
			...styles.Row,
			width: "200%",
			opacity: loginFade,
			transform: [{
			  translateX: inputSlide.interpolate({
				inputRange: [0,1],
				outputRange: [winWidth/2, -winWidth/2]
			  })
			}]
			}}>
			<View style={{...styles.MainView, width:"50%"}}>
				<View style={{...styles.Row, ...styles.TextField, ...compStyles.InputContainer}}>
					<TextInput
					style={{...compStyles.ExtField}}
					keyboardType="numeric"
					value={ext}
					defaultValue="+1"
					onChangeText={text => ext.current=text}
					/>
					<TextInput 
					style={{...compStyles.PhoneField}}
					keyboardType="numeric"
					placeholder="(000) 000-0000"
					onChangeText={text => phoneNo.current=text}
					/>
				</View>
				<Button 
				variant="accent" 
				pressStyle={compStyles.Button}
				onPress={sendCode}
				//onPress={slideInput}
				>Continue
				</Button>
			</View>
			<View style={{...styles.MainView, width:"50%"}}>
				<TextInput 
				placeholder="Confirmation Code" 
				keyboardType="numeric"
				style={{...styles.TextField, ...compStyles.ConfField}}
				value={verifCode}
				onChangeText={value => verifCode.current = value}
				/>
				<Button 
				variant="accent" 
				pressStyle={compStyles.Button}
				onPress={confirmCode}>
				Confirm
				</Button>
				<Button
				pressStyle={compStyles.Button}
				onPress={slideInput}>
				Cancel
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
		height: "30%",
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
		height: "30%",
		fontSize: 18,
		marginBottom: "2%",
	},
	Button: {
		width: "60%",
		marginVertical: "1%"
	},
})


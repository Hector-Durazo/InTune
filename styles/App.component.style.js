import { StyleSheet } from 'react-native';

// Global style sheet

export default styles = StyleSheet.create({
	// Container for screen elements
	MainView: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		shadowColor: "rgba(0,0,0,0.25)",
		elevation: 0,
		shadowOffset: { width: 0, height: 4 },
		width: "100%",
		height: "100%",
		backgroundColor: "#0F0F0F",
	},
	// Container for a row of elements
	Row: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	Logo: {
	width: 315,
	height: 129,
	marginTop: 100,
	marginBottom: 20
	},
	TextField: {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	padding: 10,
	marginBottom: 20,
	borderRadius: 15,
	color: "#DFDDE4",
	backgroundColor: "rgba(141,106,246,0.27)",
	width: 230,
	height: 50,
	},
	Text: {
	textAlign: 'center',
	fontSize: 20,
	fontFamily: "Inter_400Regular",
	fontWeight: "400",
	padding: 10
	},
});
import { StyleSheet } from 'react-native';

// Global style sheet

export const colors = {
	BlackSm : "#0F0F0F",
	WhiteGb : "#DFDDE4",
	PurpleSb :  "#8D6AF6",
	GreyNi : "#3D3D3D",
}

export const styles = StyleSheet.create({

// -----------------View Styles---------------------	
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
	ScrollView: {
		display: "flex",
		width: "100%",
		height: "100%",
	},
	Button: {
		display: "flex",
		width: "70%",
		borderRadius: 25,
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden"
	},

	White: {
		backgroundColor: colors.WhiteGb,
		color: colors.BlackSm,
	},
	Purple: {
		backgroundColor: colors.PurpleSb,
		color: colors.WhiteGb,
	},

	Logo: {
		width: "80%",
		height: "20%",
		marginBottom: "5%"
	},
	PhoneContainer: {
		padding: "2%",
		marginBottom: 20,
		borderRadius: 15,
		color: colors.WhiteGb,
		backgroundColor: "rgba(141,106,246,0.27)",
		width: "80%",
		height: "26%",
	},
	PhoneTextContainer: {
		borderRadius: 15,
		backgroundColor: "rgba(141,106,246,0.27)",
	},
	TextField: {
		padding: "2%",
		borderRadius: 15,
		color: colors.WhiteGb,
		backgroundColor: "rgba(141,106,246,0.27)",
		fontSize: 18,
	},
	Text: {
		textAlign: 'center',
		fontSize: 20,
		fontFamily: "Inter_400Regular",
		fontWeight: "400",
	},
	TextLight: {
		color: colors.WhiteGb,
	},
	TextDark: {
		color: colors.BlackSm,
	},
	Heading: {
		fontSize: 28,
		margin: "2%",
	},
	ProfilePicImg: {
		position: "relative",
		aspectRatio: 1 / 1,
		height: "100%",
		overflow: "hidden",
		borderRadius: 100,
	},
	ProfilePicButton: {
		aspectRatio: 1 / 1,
		width: "20%",
		borderRadius: 100,
		borderWidth: 1,
	},
});


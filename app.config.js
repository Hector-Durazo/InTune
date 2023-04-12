export default {
	// "android": {
	// 	"softwareKeyboardLayoutMode": "pan"
	// },
	"expo": {
		"scheme": "inTune"
	},
	"plugins": [
		[
			"expo-build-properties",
			{
				"ios": {
					"useFrameworks": "static"
				}
			},
		]
	]
}
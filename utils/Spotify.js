import { Buffer } from "buffer";
import { spotifyCredentials } from "../spotifyConfig";
import { auth } from "../firebaseConfig";
import { createURL, openURL } from 'expo-linking'
import AsyncStorage from '@react-native-async-storage/async-storage'

const localKeys = [
	'@spotifyAuthType',
	'@spotifyAccess',
	'@spotifyRefresh',
	'@spotifyTime',
	'@spotifySecret'
]

/*	*	*	*	*	*	*	*	*	*	*
*
*	Spotify API Auth Calls
*
*	*	*	*	*	*	*	*	*	*	*/

export const authorizeSpotify = async () => {
	console.log('Fetching Spotify Client Authorization')
	try {
		const res = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				Authorization: "Basic " + (Buffer.from(spotifyCredentials.clientId + ":" +
					spotifyCredentials.clientSecret).toString('base64')),
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				'grant_type': 'client_credentials'
			}).toString(),
			json: true
		});
		const json = await res.json();
		const time = new Date()
		time.setSeconds(time.getSeconds() +
			json.expires_in).getTime().toString();

		await AsyncStorage.setItem('@spotifyAccess', json.access_token)
		await AsyncStorage.setItem('@spotifyAuthType', 'client')
		await AsyncStorage.setItem('@spotifyTime', time)
	} catch (err) {
		console.error(err)
	}
}

const refreshSpotify = async () => {
	const access = await AsyncStorage.getItem('@spotifyAccess')
	const refresh = await AsyncStorage.getItem('@spotifyRefresh')
	const type = await AsyncStorage.getItem('@spotifyAuthType')
	const time = await AsyncStorage.getItem('@spotifyTime')
	if (!((access == null) ||	// Check if refresh needed
		(new Date().getTime() > time))) return access;

	console.log('Refreshing Spotify Authorization')
	switch (type) {
		case "user":
			return await refreshUser(refresh)
		default:
			return await authorizeSpotify()
	}
}

export const openAuth = async () => {
	const pkce = await getPkcePair()
	await AsyncStorage.setItem('@spotifySecret', pkce.secret)
	const scopes = [
		"ugc-image-upload",
		"app-remote-control",
		"streaming",
		"playlist-modify-public",
		"user-top-read",
		"user-read-recently-played",
	]
	const scope = scopes.join(" ")
	auth.redirectUri = createURL()
	auth.state = generateRandomString(16)

	const args = new URLSearchParams({
		response_type: 'code',
		client_id: spotifyCredentials.clientId,
		scope: scope,
		redirect_uri: auth.redirectUri,
		state: auth.state,
		code_challenge_method: 'S256',
		code_challenge: pkce.hash
	})
	const url = 'https://accounts.spotify.com/authorize?' + args
	openURL(url)
}

export const authorizeSpotifyUser = async (code) => {
	console.log("Fetching Spotify User Authentication")
	try {
		const secret = await AsyncStorage.getItem('@spotifySecret')
		const res = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				grant_type: 'authorization_code',
				code: code,
				redirect_uri: auth.redirectUri,
				client_id: spotifyCredentials.clientId,
				code_verifier: secret
			}).toString(),
			json: true
		});
		const json = await res.json();

		if (json.error) throw new Error(json.error + ": " + json.error_description)

		const time = new Date()
		time.setSeconds(time.getSeconds() +
			json.expires_in)
		await AsyncStorage.setItem('@spotifyAccess', json.access_token)
		await AsyncStorage.setItem('@spotifyRefresh', json.refresh_token)
		await AsyncStorage.setItem('@spotifyAuthType', 'user')
		await AsyncStorage.setItem('@spotifyTime', time.getTime().toString())
	} catch (err) {
		console.error(err)
	}
}

const refreshUser = async (refresh) => {
	console.log("Refreshing Spotify Token")
	try {
		const res = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: refresh,
				client_id: spotifyCredentials.clientId,
			}).toString(),
			json: true
		});
		const json = await res.json();

		if (json.error) throw new Error(json.error + ": " + json.error_description)

		const time = new Date()
		time.setSeconds(time.getSeconds() +
			json.expires_in)
		console.log(json)
		await AsyncStorage.setItem('@spotifyAccess', json.access_token)
		await AsyncStorage.setItem('@spotifyRefresh', json.refresh_token)
		await AsyncStorage.setItem('@spotifyAuthType', 'user')
		await AsyncStorage.setItem('@spotifyTime', time.getTime().toString())
		return json.access_token
	} catch (err) {
		await AsyncStorage.multiRemove(['@spotifyRefresh', '@spotifyAccess'])
		console.error(err)
	}
}

/*	*	*	*	*	*	*	*	*	*	*
*
*	Spotify API Data Calls
*
*	*	*	*	*	*	*	*	*	*	*/

export const searchSpotify = async (query) => {
	let access = await refreshSpotify()
	try {
		const response = await fetch('https://api.spotify.com/v1/search?q=' +
			query + "&type=track&limit=15", {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + access
			}
		})
		const json = await response.json();
		var items = [];
		if (typeof json.tracks !== "undefined") {
			items = json.tracks.items
		}
		return items

	} catch (err) {
		console.error(err)
	}
}

export const getUserTopTracks = async () => {
	let access = await refreshSpotify()
	const res = await SpotifyGetApi({
		endpoint: 'me/top/tracks',
		params: {
			time_range: 'short_term',
			limit: '10',
			offset: '0',
		}
	}, access)
	
	return res.items
}


/*	*	*	*	*	*	*	*	*	*	*
*
*	Utility Functions and InTuneAPI Calls
*
*	*	*	*	*	*	*	*	*	*	*/

const generateRandomString = (length) => {
	let text = "";
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

const getPkcePair = async () => {
	const hostName = 'https://us-central1-intune-cbe3f.cloudfunctions.net/'
	const endpoint = 'sha256Gen'
	try {
		const res = await
			fetch(hostName + endpoint,
				{
					method: 'GET',
					headers: {
						"Content-Type": "application/json"
					},
				});
		const pkce = await res.json();
		return pkce
	} catch (err) {
		console.error(err);
	}
}

export const getVibrant = async (url) => {
	try {
		const colorRes = await
			fetch("https://us-central1-intune-cbe3f.cloudfunctions.net/color?url=" +
				url, {
				method: 'GET',
				headers: {
					"Content-Type": "application/json"
				},
			});
		const color = await colorRes.json();
		return color.hex
	} catch (err) {
		console.error(err);
	}
}

const SpotifyGetApi = async (query = {
	endpoint: "",
	params: {},
}, access) => {
	let url = `https://api.spotify.com/v1/${query.endpoint}`
	if (query.params[0]) url += '?' + new URLSearchParams(query.params).toString()
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + access
			}
		})
		const json = await response.json();
		if (json.error) throw new Error(json.error + ": " + json.error_description)
		return json
	} catch (err) {
		console.error(err)
	}
}
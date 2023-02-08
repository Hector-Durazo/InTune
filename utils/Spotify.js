import { Buffer } from "buffer";
import { spotifyCredentials } from "../spotifyConfig";
import { auth } from "../firebaseConfig";

export const authorizeSpotify = async () => {
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
		auth.spotifyToken = json.access_token;
		auth.spotifyRefresh = new Date();
		auth.spotifyRefresh.setSeconds(auth.spotifyRefresh.getSeconds()+3600);
	} catch (err) {
		console.error(err)
	}
}

export async function searchSpotify(query) {
	// Get Spotify Authorization if needed
	if((auth.spotifyToken == null) || (new Date().getTime() > auth.spotifyRefresh.getTime())) {
		await authorizeSpotify();
	}
	try {
		const response = await fetch('https://api.spotify.com/v1/search?q='+query+"&type=track&limit=15", {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + auth.spotifyToken
			}
		})
		const json = await response.json();
		var items = [];
		if(typeof json.tracks !== "undefined") {
			items = json.tracks.items
		}
		return items

	} catch (err) {
		console.error(err)
	}
}
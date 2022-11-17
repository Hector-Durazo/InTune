import { Buffer } from "buffer";

export const spotifyCredentials = {
	clientId: '512f913c9f7c473fa8c437edb10e8521',
	clientSecret: 'a3bd19e4f0384f6a8d0b2718ca745cd2',

}

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
		return json;
	} catch (err) {
		console.error(err)
	}
}
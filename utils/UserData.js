import {
	onValue, ref as dbRef, set, update, get, query,
	orderByChild, startAt, endAt, limitToFirst,
	onChildAdded
} from "firebase/database"
import { ref as stRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker'
import { auth, db, storage } from "../firebaseConfig"

export async function checkNewUser(user) {
	const userRef = dbRef(db, 'users/' + user.uid);
	var isNew = true;
	await get(userRef).then((res) => {
		if (res.exists()) {
			isNew = false
			const data = res.val()
			auth.currentUser.displayName = res.val().displayName
			auth.currentUser.username = res.val().username
		};
	})
	return isNew;
}

export function getUserData(dispatch) {
	const userRef = dbRef(db, 'users/' + auth.currentUser.uid);
	return onValue(userRef, (snapshot) => {
		console.log('Calling getUserData')
		if (!snapshot.exists()) return
		const data = snapshot.val()
		auth.currentUser.displayName = data.displayName
		auth.currentUser.username = data.username
		auth.currentUser.photoURL = data.picture
		dispatch({ type: 'setFriends', friends: [data] }) // TODO: get friends
		dispatch({ type: 'setRequests', requests: [data.requests] })
		dispatch({ type: 'setRequested', requests: [data.requested] })
	});
}

// Pass user from auth and data object
export function updateUserData(user, data) {
	const userRef = dbRef(db, 'users/' + user.uid);
	update(userRef, data);
}

export function addPost(id, data) {
	const userRef = dbRef(db, 'users/' + auth.currentUser.uid + '/posts/' + id)
	update(userRef, data)
}

/**
 * 
 * @param {string} uid User UID to subscribe to
 * @param {function} callback Function that is passed newest posts from user
 * @returns 
 */
export function subscribeToUserPosts(uid, dispatch) {
	const userRef = dbRef(db, 'users/' + uid + '/posts');
	return onValue(userRef, (snapshot) => {
		let data = snapshot.val()
		if (!data) data = []
		const postsNewest = Object.values(data).reverse()
		dispatch({ type: 'setPosts', posts: postsNewest })
	})
}

export function queryUsers(search) {
	const queryRef = query(dbRef(db, 'users'), orderByChild('username'), startAt(search), limitToFirst(5))
	const results = []
	onChildAdded(queryRef, (snapshot) => {
		const data = snapshot.val()
		data.uid = snapshot.key
		results.push(data)
	}, (error) => { console.log(error) })
	return results;
}

export const addRequest = (user) => {
	const curTime = new Date().getTime()
	const curUid = auth.currentUser.uid
	const requestsRef = dbRef(db, 'users/' + user.uid + '/requests/' + curUid)
	const requestedRef = dbRef(db, 'users/' + curUid + '/requested/' + user.uid)

	const requestsData = {
		displayName: auth.currentUser.displayName,
		username: auth.currentUser.username,
		time: curTime
	}

	const requestedData = {
		displayName: user.displayName,
		username: user.username,
		time: curTime
	}

	update(requestsRef, requestsData)
	update(requestedRef, requestedData)
}

// Upload file to cloud storage
export const uploadFile = async (blob, dir) => {
	const fileRef = stRef(storage, dir)
	const result = await uploadBytes(fileRef, blob)
	blob.close()
	return await getDownloadURL(fileRef)
}

export const selectPicture = async () => {
	const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
	if (permission == "none") return null;
	const result = await ImagePicker.launchImageLibraryAsync({
		quality: 1,
		allowsEditing: true,
		base64: false,
		aspect: [1, 1],
	});
	return result.assets[0]
}

export const generateBlob = async (uri) => {
	const blob = await new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		xhr.onload = () => resolve(xhr.response)
		xhr.onerror = (error) => {
			console.log(error)
			reject(new TypeError("Network request failed"))
		}
		xhr.responseType = "blob"
		xhr.open("GET", uri, true)
		xhr.send(null)
	})
	return blob;
}
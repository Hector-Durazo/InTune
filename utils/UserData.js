import {
	onValue, ref as dbRef, set, update, get, query,
	orderByChild, startAt, endAt, limitToFirst,
	onChildAdded, remove
} from "firebase/database"
import { ref as stRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker'
import { auth, db, storage } from "../firebaseConfig"
import AsyncStorage from "@react-native-async-storage/async-storage";

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
		if (!snapshot.exists()) return
		let data = snapshot.val()
		auth.currentUser.displayName = data.displayName
		auth.currentUser.username = data.username
		auth.currentUser.photoURL = data.picture
		if(!data.friends) data.friends = {}
		if(!data.requests) data.requests = {}
		if(!data.requested) data.requested = {}
		dispatch({ type: 'setFriends', friends: data.friends })
		dispatch({ type: 'setRequests', requests: data.requests })
		dispatch({ type: 'setRequested', requested: data.requested })
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
export const subscribeToUserPosts = (uid, dispatch) => {
	const userRef = dbRef(db, 'users/' + uid);
	return onValue(userRef, (snapshot) => {
		let data = snapshot.val()
		// If user has no posts, initialize to empty object
		if(!data.posts) data.posts = {}
		const postsNewest = Object.values(data.posts).reverse()
		for(let i = 0; i < postsNewest.length; i++) postsNewest[i].picture = data.picture;
		dispatch({ type: 'addPosts', uid: uid, posts: postsNewest })
	})
}

export const queryUsers = (search, setResults) => {
	const queryRef = query(dbRef(db, 'users'), orderByChild('username'), startAt(search), limitToFirst(5))
	const results = []
	const unsubscribe = onChildAdded(queryRef, (snapshot) => {
		const data = snapshot.val()
		console.log(data)
		data.uid = snapshot.key
		if(!data.posts) data.posts = []
		if(!data.picture) data.picture = null
		results.push(data)
		setResults(results)
	}, (error) => { console.log(error) })
	return unsubscribe;
}

export const addRequest = (user) => {
	console.log('Friend Request Sent')
	const curTime = new Date().getTime()
	const curUid = auth.currentUser.uid
	const requestsRef = dbRef(db, 'users/' + user.uid + '/requests/' + curUid)
	const requestedRef = dbRef(db, 'users/' + curUid + '/requested/' + user.uid)

	const requestsData = {
		displayName: auth.currentUser.displayName,
		username: auth.currentUser.username,
		picture: auth.currentUser.photoURL,
		time: curTime
	}

	const requestedData = {
		displayName: user.displayName,
		username: user.username,
		picture: user.picture,
		time: curTime
	}

	update(requestsRef, requestsData)
	update(requestedRef, requestedData)
}

export const addFriend = async (user) => {
	console.log('Accepted Friend Request')
	const curTime = new Date().getTime()
	const curUid = auth.currentUser.uid
	const friendRef = dbRef(db, 'users/' + user.uid + '/friends/' + curUid)
	const userRef = dbRef(db, 'users/' + curUid + '/friends/' + user.uid)
	const requestsRef = dbRef(db, 'users/' + curUid + '/requests/' + user.uid)
	const requestedRef = dbRef(db, 'users/' + user.uid + '/requested/' + curUid)

	const userData = {
		displayName: auth.currentUser.displayName,
		username: auth.currentUser.username,
		picture: auth.currentUser.photoURL,
		time: curTime
	}

	const friendData = {
		displayName: user.displayName,
		username: user.username,
		picture: user.picture,
		time: curTime
	}

	update(friendRef, userData)
	update(userRef, friendData)
	remove(requestsRef)
	remove(requestedRef)
}

export const removeRequest = (user) => {
	console.log('Friend Request Removed')
	const curUid = auth.currentUser.uid
	const requestsRef = dbRef(db, 'users/' + user.uid + '/requests/' + curUid)
	const requestedRef = dbRef(db, 'users/' + curUid + '/requested/' + user.uid)

	remove(requestsRef)
	remove(requestedRef)
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

export const getLocalKeys = async () => {
	//let keys = await AsyncStorage.getAllKeys()
	const keys = [
		'@spotifyAuthType',
		'@spotifyAccess',
		'@spotifyRefresh',
		'@spotifyTime',
		'@spotifySecret'
	]
	let authInd = keys.findIndex(key => key.includes('firebase:authUser'))
	let res = await AsyncStorage.multiGet(keys)
	res.forEach((val, ind) => {
		console.log(`${val[0]}: ${val[1]}`)
	})
	console.log('\n')
	//if(authInd != -1) signInOAuth(res[authInd][1])
}
import { onValue, ref, set, update, get } from "firebase/database";
import { auth, db } from "../firebaseConfig";

export async function checkNewUser(user) {
	const userRef = ref(db, 'users/' + user.uid);
	var isNew = true;
	await get(userRef).then( (res) => {
		if(res.exists()) {
			isNew = false
			const data = res.val()
			auth.currentUser.displayName = res.val().displayName
			auth.currentUser.username = res.val().username
		};
	})
	return isNew;
}

export async function getUserData(dispatch) {
	const userRef = ref(db, 'users/' + auth.currentUser.uid);
	await get(userRef).then( (res) => {
		if(res.exists()) {
			const data = res.val()
			auth.currentUser.displayName = data.displayName
			auth.currentUser.username = data.username
			auth.currentUser.photoURL = data.picture
			dispatch({type: 'setFriends', friends: [data]})
		};
	});
}

// Pass user from auth and data object
export function updateUserData(user, data) {
	const userRef = ref(db, 'users/' + user.uid);
	update(userRef, data);
}

export function addPost(id, data) {
	const userRef = ref(db, 'users/' + auth.currentUser.uid + '/posts/' + id)
	update(userRef, data)
}

/**
 * 
 * @param {string} uid User UID to subscribe to
 * @param {function} callback Function that is passed newest posts from user
 * @returns 
 */
export function subscribeToUserPosts(uid, dispatch) {
	const userRef = ref(db, 'users/' + uid + '/posts');
	return onValue(userRef, (snapshot) => {
		let data = snapshot.val()
		if(!data) data = []
		const postsNewest = Object.values(data).reverse()
		dispatch({type: 'setPosts', posts: postsNewest})
	})
}

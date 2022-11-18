import { onValue, ref, set, update, get } from "firebase/database";
import { app, auth, db } from "../firebaseConfig";

export async function checkNewUser(user) {
	const userRef = ref(db, 'users/' + user.uid);
	var isNew = true;
	await get(userRef).then( (res) => {
		if(res.exists()) {
			isNew = false
			const data = res.val()
			console.log(data)
			auth.currentUser.displayName = res.val().displayName
			auth.currentUser.username = res.val().username
		};
	})
	return isNew;
}

export async function getUserNames() {
	const userRef = ref(db, 'users/' + auth.currentUser.uid);
	await get(userRef).then( (res) => {
		if(res.exists()) {
			const data = res.val()
			console.log(data)
			auth.currentUser.displayName = data.displayName
			auth.currentUser.username = data.username
		};
	});
}

export function updateUserData(user, data) {
	const userRef = ref(db, 'users/' + user.uid);
	update(userRef, data);
}

export function addPost(id, data) {
	const userRef = ref(db, 'users/' + auth.currentUser.uid + '/posts/' + id)
	update(userRef, data)
}

export function getPosts(setPosts) {
	const userRef = ref(db, 'users/' + auth.currentUser.uid + '/posts');
	onValue(userRef, (snapshot) => {
		const data = snapshot.val();
		if(data == null) return;
		setPosts(Object.values(data));
	})
}
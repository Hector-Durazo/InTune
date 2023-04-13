import { createContext, useContext, useReducer } from "react";

export const AppState = createContext([{}, function(){}]);


const initialState = {
	posts: {},
	friends: [],
	page: "Login",
	requests: [],
	requested: []
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'setPosts': {
			return {
				...state,
				posts: action.posts
			}
		}
		case 'addPosts': {
			const uid = action.uid
			let posts = JSON.parse(JSON.stringify(state.posts))
			posts[uid] = action.posts
			return {
				...state,
				posts: posts
			}
		}
		case 'setFriends': {
			return {
				...state,
				friends: action.friends
			}
		}
		case 'setPage': {
			return {
				...state,
				page: action.page
			}
		}
		case 'setRequests': {
			return {
				...state,
				requests: action.requests
			}
		}
		case 'setRequested': {
			return {
				...state,
				requested: action.requested
			}
		}
		default: {
			throw Error('Unknown Action: ' + action.type)
		}
	}
}

export const AppStateProvider = ({children}) => {
	return(
		<AppState.Provider value={useReducer(reducer, initialState)}>
			{children}
		</AppState.Provider>
	)
}
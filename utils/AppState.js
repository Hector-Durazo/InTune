import { createContext, useContext, useReducer } from "react";

export const AppState = createContext([{}, function(){}]);


const initialState = {
	posts: [],
	friends: [],
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'setPosts': {
			return {
				...state,
				posts: action.posts
			}
		}
		case 'setFriends': {
			return {
				...state,
				friends: action.friends
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
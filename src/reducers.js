import { ADD_TODO } from '../actions/actions';

const initialState = {
	songs: []
}

export function songsApp(state=initialState, action) {
	switch(action.type) {
		case ADD_TODO:
			return {
				...state,
				songs: [...state.songs, action.song]
			})
		default:	
			return state;
	}
}


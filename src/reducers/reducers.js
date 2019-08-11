import {
	ADD_SONG,
	EDIT_SONG,
	REMOVE_SONG
} from '../actions/actions'

const initialState = {
	songs: []
}

export default function songsApp(state=initialState, action) {
	switch (action.type) {
		case ADD_SONG:
			return {
				...state,
				songs: [...state.songs, action.song]
			}
		default:
			return state
	}
}


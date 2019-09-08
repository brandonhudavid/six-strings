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
    case REMOVE_SONG:
      var stateClone = {...state}
      var i
      for (i=0; i<stateClone.songs.length; i++) {
        if (stateClone.songs[i].id == action.id) {
          stateClone.songs.splice(i, 1)
          break
        }
      }
      return stateClone
		default:
			return state
	}
}


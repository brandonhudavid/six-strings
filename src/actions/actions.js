// action types
export const ADD_SONG = 'ADD_SONG';
export const EDIT_SONG = 'EDIT_SONG';
export const REMOVE_SONG = 'REMOVE_SONG';

// action creators
export function addSong(song) {
	return {
		type: ADD_SONG,
		song: song
	}
}


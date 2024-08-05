import { combineReducers } from 'redux';
import favoriteReducer from './favoriteReducer';
import movieReducer from './movieReducer';

export default combineReducers({
    favorite: favoriteReducer,
    movie: movieReducer
});

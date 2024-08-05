import axios from 'axios';

export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

export const fetchMovies = (language) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_MOVIES_REQUEST });
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4b10b55b7e723bb70a0718b89b5111ca&language=${language}`);
      dispatch({ type: FETCH_MOVIES_SUCCESS, payload: response.data.results });
    } catch (error) {
      dispatch({ type: FETCH_MOVIES_FAILURE, error });
    }
  };
};

import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../Redux/actions/favoriteAction';
import { fetchMovies } from '../Redux/actions/movieActions';
import { LanguageContext } from '../context/LanguageContext';

const Movies = () => {
  const dispatch = useDispatch();
  const { language } = useContext(LanguageContext);
  const { movies, loading, error } = useSelector(state => state.movie);
  const favorites = useSelector(state => state.favorite.favorites);

  useEffect(() => {
    dispatch(fetchMovies(language));
  }, [dispatch, language]);

  const handleFavoriteToggle = (movie) => {
    if (favorites.some(fav => fav.id === movie.id)) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="row">
      {movies.map(movie => (
        <div className="col-md-4 mb-4" key={movie.id}>
          <div className="card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <button onClick={() => handleFavoriteToggle(movie)} className="btn btn-outline-primary">
                {favorites.some(fav => fav.id === movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <Link to={`/movie/${movie.id}`} className="btn btn-primary ml-2">View Details</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movies;



import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromFavorites } from '../Redux/actions/favoriteAction';

const Favorites = () => {
  const favorites = useSelector(state => state.favorite.favorites);
  const dispatch = useDispatch();

  return (
    <div className="row">
      {favorites.map(movie => (
        <div className="col-md-4 mb-4" key={movie.id}>
          <div className="card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <button onClick={() => dispatch(removeFromFavorites(movie.id))} className="btn btn-outline-danger">
                Remove from Favorites
              </button>
              <Link to={`/movie/${movie.id}`} className="btn btn-primary ml-2">View Details</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;

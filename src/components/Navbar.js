import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LanguageContext } from '../context/LanguageContext';


const Navbar = () => {
  const favoriteCount = useSelector(state => state.favorite.favorites.length);
  const { language, changeLanguage } = useContext(LanguageContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <Link className="navbar-brand" to="/">Movies App</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/movies">Movies</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/favorites">
              Favorites 
              <span className="badge badge-pill badge-primary">{favoriteCount}</span>
              <i className="fas fa-star"></i>
            </Link>
          </li>
        </ul>
        <form className="form-inline ms-auto my-2 my-lg-0">
          <select value={language} onChange={(e) => changeLanguage(e.target.value)} className="form-control">
            <option value="en">en</option>
            <option value="ar">ar</option>
          </select>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;


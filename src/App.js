import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Favorites from './components/Favorites';

function App() {
  return (
    <Router>
      <Navbar />
        <div className='container'>
        <Switch>
          <Route path="/movies" component={Movies} />
          <Route path="/movie/:id" component={MovieDetails} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" exact component={Movies} />
          <Route path="/favorites"component={Favorites}/>
        </Switch>
        </div>
    </Router>
  );
}

export default App;





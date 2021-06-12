import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';
import Alert from './components/Alert'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {
  /* States */
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [faves, setFaves] = useState([]);
  const [faveToggle, setFaveToggle] = useState(false);

  /* API CALL */
  const getMovieRequest = async() =>{
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=c14a1c38`; //define API URL [first using search term url, will revise to general api later]
    const response = await fetch(url); //fetch(url) data and define response
		const responseJson = await response.json(); //convert to JSON

    console.log(responseJson);

		if (responseJson.Search) { //only if !setSearchValue('')
			setMovies(responseJson.Search); //set state to searchValue
  }}

  /* RETRIEVE API  */
  useEffect(()=>{
    getMovieRequest(); //API call upon render
  },[searchValue]);

  /* LOCAL STORAGE */
  //Retrieve local
  useEffect(()=>{
    const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorires')); //do we parse because API call is async? // ref key to call it's storage
    setFaves(movieFavorites);
  },[]);

  //Save to local 
  const saveToLocalStorage = (items) =>{
    localStorage.setItem('react-movie-app-favorires', JSON.stringify(items)); //('key', 2nd arg should be string too)
  };

  /* FAVES */
  //Add
  const addFavoriteMovie = (movie) => {

    const updateFavoritesList = [...faves, movie];
    setFaves(updateFavoritesList); 
    setFaveToggle(true)
    setTimeout(()=>setFaveToggle(false), 3000);

    saveToLocalStorage(updateFavoritesList); //save to local
  };
  //remove
  const removeFavoriteMovie = (movie) =>{
    const removingMovie = faves.filter((fave)=> fave.imdbID !== movie.imdbID);
    setFaves(removingMovie);
    setFaveToggle(true)
    setTimeout(()=>setFaveToggle(false), 3000);

    saveToLocalStorage(removingMovie); //save to local
  };

  /* JSX */
  return (
    /* alert */
    <div id="notification" className="container-fluid">
      {
        faveToggle ? <div className="row text-center">
          <Alert/>
        </div> 
        :<div></div>
      }
      {/* hero */}
      <div className="row">
        <Header/>
      </div>
      <div className="row d-flex align-items-center mt-4 mb-2">
        <MovieListHeading heading='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>      
      <div className="container movie-app">
        {/* movie list */}
        <div className="row py-4">
          
          {
          movies.length === 0 ? <div className="row text-center">
            <p>Search results will appear here</p>
          </div> 
          :<MovieList 
          movies={movies} 
          favoriteComponent={AddFavorites}
          handleFavorites={addFavoriteMovie} 
          />
         }
  
        </div>        
      </div>

      <div className="row my-2 pt-5">
        <MovieListHeading heading='Favorites'/>
      </div>
      {/* favorites list */}
      <div className="container movie-app">
        <div className="row mb-5 py-4">
          {
            faves.length === 0 ? <div className="row text-center">
              <p>No movies have been added to your favorites list</p>
            </div> 
            :<MovieList 
            movies={faves} 
            favoriteComponent={RemoveFavorites}
            handleFavorites={removeFavoriteMovie} 
            />
          }   
        </div>
      </div>
    </div>

  );
}

export default App;


//  TBD *npm 
//display default list of movies
//set movie posters to div.bg
//prevent faving the same movie more than once
//Animate alert
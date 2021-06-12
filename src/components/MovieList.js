import React from 'react'

const MovieList = (props) => {
    const FavoriteComponent = props.favoriteComponent;

    return(
        <>
			{props.movies.map((movie, index) => (
				<div 
                    className='image-container d-flex justify-content-start'
                    key={index}    
                >
					<img src={movie.Poster} alt={movie.Title}></img>
					<div 
                        className='overlay d-flex align-items-center justify-content-center' 
                        onClick={()=>props.handleFavorites(movie)}
                    >
						<FavoriteComponent />
					</div>
				</div>
			))}
        </> // <span> or <div> renders .movie-list >.row CSS useless
    )
}

export default MovieList;
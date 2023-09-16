import React, {useState, useEffect} from 'react'
import './style/main.css'
import axios from 'axios';
import MovieSmallCard from '../MovieSmallCard';


function  Favorites() {

    window.localStorage.setItem("asideMenuSection", "favorites")
    window.dispatchEvent(new Event("storageChangesAsideMenuSection"));

    const [likedMoviesArray, setLikedMoviesArray] = useState([])

    const fetchingUserData = async () => {
        try {
          const response = await axios.get('https://frantic-slug-lab-coat.cyclic.app/auth/profile', {
            headers: {
                'Authorization': `${window.localStorage.getItem('token')}`
            }});
            console.log(response.data.user); // Handle success
            setLikedMoviesArray(response.data.user.likedMovies)

        } catch (error) {
          console.error(error); // Handle error
        }
      }

      useEffect(() => {
        fetchingUserData()
      }, [])

    return (
        <div style={{marginTop: '80px'}}>
            <h1>Recent Movies:</h1>
            <div className='userActivitiesRecordedDivContainerMovieCardShow'>
                {likedMoviesArray.map(item =>
                    <MovieSmallCard
                    key={item.movieId}
                    title={item.movieTitle}
                    // mediaType={props.mediaType}
                    movieId={item.movieId}
                    // releaseDate={item.release_date || item.first_air_date}
                    // rating={item.vote_average}
                    image={`https://image.tmdb.org/t/p/w185/${item.posterPath}`}
                    // userId={props.userId}
                    // userBookmarkedMovies={props.userBookmarkedMovies}
                    watchedAt={item.watchedAt}
                     />
                    )}
            </div>
        </div>
    )
}

export default Favorites

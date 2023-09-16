import React, {useEffect, useState} from 'react'
import './style/main.css'
import axios from 'axios';
import MovieSmallCard from '../MovieSmallCard'

function TopRated() {

    window.localStorage.setItem("asideMenuSection", "topRated")
    window.dispatchEvent(new Event("storageChangesAsideMenuSection"));

    const [getTopRatedMovies, setGetTopRatedMovies] = useState([])
    const [getTopRatedMoviesLoading, setGetTopRatedMoviesLoading] = useState(true)
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/${localStorage.getItem("navMediaType") === 'movie' ? 'movie' : 'tv'}/top_rated?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1`)
        .then(res => {
        setGetTopRatedMovies( res.data.results )
        setGetTopRatedMoviesLoading(false)
        })
    }, [] )


    return (
        <div style={{marginTop: '80px'}}>
        <h1>Top Rated Movies:</h1>
        <div className='userActivitiesRecordedDivContainerMovieCardShow'>
        {getTopRatedMovies.map( item => <MovieSmallCard title={item.title || item.original_title || item.name} movieId={item.id} releaseDate={item.release_date || item.first_air_date} rating={item.vote_average} image={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} /> )}
        </div>
    </div>
    )
}

export default TopRated

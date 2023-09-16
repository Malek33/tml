/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import './style/MovieCards.css'
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import axios from 'axios';

import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

function MovieSmallCard(props) {

    const [movieIsBookmarked, setMovieIsBookmarked] = useState(false)
    const [movieIsBookmarkedArray, setMovieIsBookmarkedArray] = useState([])

    const fetchingUserData = async () => {
        try {
        const response = await axios.get('https://frantic-slug-lab-coat.cyclic.app/auth/profile', {
            headers: {
                'Authorization': `${window.localStorage.getItem('token')}`
            }});
            setMovieIsBookmarked(!response.data.user.bookmarkedMovies.some(movie => movie.movieId == props.movieId));
            return response.data.user.bookmarkedMovies;
        } catch (error) {
        console.error(error); // Handle error
        }
    }

    const handleBookmark = async () => {
        console.log(props.userId)
        const data = {
            userId: props.userId._id,
            movie: {
            movieTitle: props.title,
            posterPath: props.image,
            movieId: props.movieId,
            }
        }

        const bookmarkedArray = await fetchingUserData()
        setMovieIsBookmarkedArray(bookmarkedArray)

        if(movieIsBookmarked){
            try {
                const response = await axios.delete(`http://localhost:5000/auth//${data.userId}/bookmarked-movie/${data.movie.movieId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        }});
                        console.log(response.data); // Handle success
                        setMovieIsBookmarked(!movieIsBookmarked)
                        setMovieIsBookmarkedArray(movieIsBookmarkedArray.filter(movie => movie.movieId !== props.movieId))
                    } catch (error) {
                        console.error(error); // Handle error
                    }
        }else{
            try {
                const response = await axios.post('http://localhost:5000/auth/bookmarked-movie', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }});
                    console.log(response.data); // Handle success
                    setMovieIsBookmarked(!movieIsBookmarked)
                    setMovieIsBookmarkedArray(movieIsBookmarkedArray, data.movie)
            } catch (error) {
            console.error(error); // Handle error
            }
        };
    };

    useEffect(() => {
        const slm = async () => {
            // Check if props.userBookmarkedMovies is available before processing it
            if (props.userBookmarkedMovies) {
                setMovieIsBookmarked(
                    props.userBookmarkedMovies.some(movie => movie.movieId == props.movieId)
                );
                setMovieIsBookmarkedArray(props.userBookmarkedMovies);
            }
        };
        slm();
    }, [props.userBookmarkedMovies, props.movieId]); // Add props.userBookmarkedMovies and props.movieId as dependencies


    return (
        <div className='movie-small-card-space-around-so-it-can-expand'>
            <div className='movie-small-card-cover-image' style={{ backgroundImage: `url(${props.image})` }}>
                <div className='movie-small-card-cover-image-shadow-effect'></div>
                {
                props.RemoveStars === 'yes' ? null :
                <div className='movie-small-card-rating-star-icon-with-value-container'>
                    <p className='movie-small-card-rating-star-icon'><StarIcon style={{ fontSize: '15px', marginLeft: '-0.3vw' }} /></p>
                    <p className='movie-small-card-rating-desc'>{props.rating}</p>
                </div>
                }
                { props.movieTypeIsAvailable ?
                <div className='movie-small-card-media-type-container'>
                    <p>{props.mediaType}</p>
                </div> : null
                }
                <div className='movie-small-card-name-date-rating-btns-container'>
                    {
                        props.isTvSeriesSection ?
                        <Link to={`/movieDetails/${props.mediaType}/${props.movieId}/season/${props.seasonNum}`} style={{ color: 'white', textDecoration: 'none' }}>
                        <div className='movie-small-card-name-date-rating'>
                            <h2 title={props.title} className='movie-small-card-movie-name'>{props.title}</h2>
                            <h3 className='movie-small-card-movie-release-date'>{props.releaseDate}</h3>
                            {/* <div className='movie-small-card-movie-rating'>
                                <div alt='imdb-logo' className='imdb-logo-card' style={{ backgroundImage: `url(${imdbLogo})` }}></div>
                                <p className='movie-small-card-movie-rating-txt'>{props.rating} rating</p>
                            </div> */}
                        </div>
                    </Link> :
                    props.episodeNumber !== undefined ?
                    <Link to={`/movieDetails/${props.mediaType}/${props.movieId}/season/${props.seasonNum}/episode/${props.episodeNumber}`} style={{ color: 'white', textDecoration: 'none' }}>
                    <div className='movie-small-card-name-date-rating'>
                    {props.episodeNumber !== undefined ? <h2 title={`Episode ${props.episodeNumber}`} className='movie-small-card-movie-name'>{`Episode ${props.episodeNumber}`}</h2> : null}
                        <h2 title={props.title} className='movie-small-card-movie-name'>{props.title}</h2>
                        <h3 className='movie-small-card-movie-release-date'>{props.releaseDate}</h3>
                    </div>
                    </Link> :
                    <Link to={`/movieDetails/${props.mediaType}/${props.movieId}`} style={{ color: 'white', textDecoration: 'none' }}>
                    <div className='movie-small-card-name-date-rating'>
                    {props.episodeNumber !== undefined ? <h2 title={`Episode ${props.episodeNumber}`} className='movie-small-card-movie-name'>{`Episode ${props.episodeNumber}`}</h2> : null}
                        <h2 title={props.title} className='movie-small-card-movie-name'>{props.title}</h2>
                        <h3 className='movie-small-card-movie-release-date'>{props.releaseDate}</h3>
                        {/* <div className='movie-small-card-movie-rating'>
                            <div alt='imdb-logo' className='imdb-logo-card' style={{ backgroundImage: `url(${imdbLogo})` }}></div>
                            <p className='movie-small-card-movie-rating-txt'>{props.rating} rating</p>
                        </div> */}
                    </div>
                </Link>
                    }
                </div>
                    {props.userId ? <div className='movie-small-card-btns'>
                        {/* <a className='movie-small-card-btn-watch-now'>Watch now</a> */}
                        <a onClick={handleBookmark} style={ movieIsBookmarked ? {backgroundColor: 'red'} : {}} className='movie-small-card-btn-add'>{movieIsBookmarked ? <BookmarkAddedIcon style={{ fontSize: '20px', color: 'white' }}/> : <BookmarkAddIcon style={{ fontSize: '20px' }}/>}</a>
                    </div> : null}
            </div>
        </div>
    )
}

export default MovieSmallCard

/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import './style/MovieCards.css'
import AddIcon from '@mui/icons-material/Add';
import imdbLogo from '../img/imdb-logo.svg'
import { Link } from 'react-router-dom';
import axios from 'axios';

import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

function MovieBigCard(props) {

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
        <div className='movie-card-space-around-so-it-can-expand'>
            <div className='movie-card-cover-image' style={{ backgroundImage: `url(${props.image})` }}>
            <Link to={`/movieDetails/${props.mediaType}/${props.movieId}`} style={{ color: 'white', textDecoration: 'none' }}>
                {/* <img className='movie-card-cover-image' src={ArmyOfTheDeadImage} alt='images'/> */}
                <div className='movie-card-cover-image-shadow-effect'></div>
                <div className='movie-card-name-date-rating-btns-container'>
                        <div className='movie-card-name-date-rating'>
                            <h2 title={props.title} className='movie-card-movie-name'>{props.title}</h2>
                            <h3 className='movie-card-movie-release-date'>{props.releaseDate}</h3>
                            <div className='movie-card-movie-rating'>
                                <div alt='imdb-logo' className='imdb-logo-card' style={{ backgroundImage: `url(${imdbLogo})` }}></div>
                                <p className='movie-card-movie-rating-txt'>{props.rating} rating</p>
                            </div>
                        </div>
                </div>
            </Link>
            {props.userId ? <div className='movie-card-btns'>
                {/* <a style={{ color: 'white', textDecoration: 'none' }} href={`/movieDetails/${props.mediaType}/${props.movieId}#stream-movie-section`} className='movie-card-btn-watch-now'>Watch now</a> */}
                <a onClick={handleBookmark} style={ movieIsBookmarked ? {backgroundColor: 'red'} : {}} className='movie-card-btn-add'>{movieIsBookmarked ? <BookmarkAddedIcon style={{ fontSize: '20px', color: 'white' }}/> : <BookmarkAddIcon style={{ fontSize: '20px' }}/>}</a>
            </div> : null}
            </div>
        </div>
    )
}

export default MovieBigCard

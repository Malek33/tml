/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import './style/MovieCards.css'
import AddIcon from '@mui/icons-material/Add';
import imdbLogo from '../img/imdb-logo.svg'
import { Link } from 'react-router-dom';

function MovieBigCard(props) {


    const [userId, setUserId] = useState(window.localStorage.getItem("UserId"))
    const [docId, setDocId] = useState("")
    // const [loading, setLoading] = useState("")

    const handleBookmark = async () => {
        console.log('bookmarked');
    };

    return (
        <div className='movie-card-space-around-so-it-can-expand'>
            <div className='movie-card-cover-image' style={{ backgroundImage: `url(${props.image})` }}>
                {/* <img className='movie-card-cover-image' src={ArmyOfTheDeadImage} alt='images'/> */}
                <div className='movie-card-cover-image-shadow-effect'></div>
                <div className='movie-card-name-date-rating-btns-container'>
                    <Link to={`/movieDetails/${props.mediaType}/${props.movieId}`} style={{ color: 'white', textDecoration: 'none' }}>
                        <div className='movie-card-name-date-rating'>
                            <h2 title={props.title} className='movie-card-movie-name'>{props.title}</h2>
                            <h3 className='movie-card-movie-release-date'>{props.releaseDate}</h3>
                            <div className='movie-card-movie-rating'>
                                <div alt='imdb-logo' className='imdb-logo-card' style={{ backgroundImage: `url(${imdbLogo})` }}></div>
                                <p className='movie-card-movie-rating-txt'>{props.rating} rating</p>
                            </div>
                        </div>
                    </Link>
                    <div className='movie-card-btns'>
                        <a style={{ color: 'white', textDecoration: 'none' }} href={`/movieDetails/${props.mediaType}/${props.movieId}#stream-movie-section`} className='movie-card-btn-watch-now'>Watch now</a>
                        <a onClick={handleBookmark} className='movie-card-btn-add'><AddIcon style={{ fontSize: '20px' }}/></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieBigCard

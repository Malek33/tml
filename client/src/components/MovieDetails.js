/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/MovieDetails.css";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorder from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import LinearScaleIcon from "@mui/icons-material/LinearScale";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination, Navigation } from "swiper";
import SwiperCore, { Autoplay } from "swiper";
import { Link, useParams } from "react-router-dom";

import userImageIcon from "../img/user.png";
import MovieSmallCard from "./MovieSmallCard";

import poster404 from '../img/poster404.png'

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

function MovieDetails() {
  SwiperCore.use([Autoplay]);

  const { mediaType, id, seasonNum, episodeNumber } = useParams();

  const [movieData, setMovieData] = useState([]);
  const [imagesBackdrops, setImagesBackdrops] = useState([]);
  const [imagesPoster, setImagesPoster] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieActors, setMovieActors] = useState([]);
  const [movieDuration, setMovieDuration] = useState([]);

  // const [movieBackend, setMovieBackend] = useState({});

  const [similarMovies, setSimilarMovies] = useState([]);
  const [traillerWindowIsOpen, setTraillerWindowIsOpen] = useState(false);
  const [castsWindowIsOpen, setCastsWindowIsOpen] = useState(false);

  const [tvShowSeasons, setTvShowSeasons] = useState([]);
  const [tvEpisodes, setTvEpisodes] = useState([]);
  const [tvEpisode, setTvEpisode] = useState([]);

  const [movieIsLiked, setMovieIsLiked] = useState(false);
  // const [likedMoviesArray, setLikedMoviesArray] = useState([]);


  const [user, setUser] = useState({});

  const [dataLoading, setDataLoading] = useState(true);

  const toggleMediaTraillerPopup = () => {
    setTraillerWindowIsOpen(!traillerWindowIsOpen);
  };

  const toggleCastsPopup = () => {
    setCastsWindowIsOpen(!castsWindowIsOpen);
  };

  let mediaStream =
    mediaType === "movie"
      ? `https://autoembed.to/movie/tmdb/${id}?server=3`
      : `https://autoembed.to/tv/tmdb/${id}-${seasonNum}-${episodeNumber}?server=3`;

  let mediaTrailer =
    mediaType === "movie"
      ? `https://autoembed.to/trailer/movie/${id}`
      : `https://autoembed.to/trailer/tv/${id}`;

  const handleFavoriteButton = async () => {

    const data = {
      userId: user._id,
      movie: {
        movieTitle: movieData.original_title || movieData.title,
        posterPath: movieData.poster_path,
        movieId: movieData.id,
      }
    }

    console.log(movieIsLiked);
    const test = true

    if(movieIsLiked){
      setMovieIsLiked(false)
      try {
        const response = await axios.delete(`http://localhost:5000/auth//${data.userId}/movie-liked/${data.movie.movieId}`, {
          headers: {
              'Content-Type': 'application/json',
          }});
        console.log(response.data); // Handle success
      } catch (error) {
        console.error(error); // Handle error
      }
    }else{
      setMovieIsLiked(true)
      try {
        const response = await axios.post('http://localhost:5000/auth/liked-movie', data, {
          headers: {
              'Content-Type': 'application/json'
          }});
        console.log(response.data); // Handle success
      } catch (error) {
        console.error(error); // Handle error
      }
    };
    }


  useEffect(() => {
    if(id !== undefined && seasonNum !== undefined){
    let data = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNum}?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US`;
    axios
      .get(data)
      .then((res) => {
        console.log(res.data);
        setTvEpisodes(res.data.episodes);
        setDataLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });}
  }, [seasonNum]);

  // https://api.themoviedb.org/3/tv/119051/season/1/episode/2?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US
  useEffect(() => {
    if(id !== undefined && seasonNum !== undefined && episodeNumber !== undefined){
    let data = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNum}/episode/${episodeNumber}?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US`;
    axios
      .get(data)
      .then((res) => {
        console.log("episodeData:", res.data);
        setTvEpisode(res.data);
        setMovieData(res.data);
        setImagesBackdrops(res.data.images.backdrops);
        setImagesPoster(res.data.still_path);
        setMovieGenres(res.data.genres);
        setMovieActors(res.data.credits.cast);
        setMovieDuration(toHoursAndMinutes(res.data.air_date));
        console.log('res.data tv: ', res.data);
        setDataLoading(false)
        // episodeNumber !== null ? setDataLoading(true) : console.log();
      })
      .catch((err) => {
        console.log(err);
      });}
  }, [episodeNumber]);

  const fetchingUserId = async () => {
    try {
      const response = await axios.get('https://frantic-slug-lab-coat.cyclic.app/auth/profile', {
        headers: {
            'Authorization': `${window.localStorage.getItem('token')}`
        }});
        setUser(response.data.user)
        setMovieIsLiked(!response.data.user.likedMovies.some(movie => movie.movieId == movieData.id));
        // console.log('profile liked:', response.data.user.likedMovies.some(movie => movie.movieId == movieData.id));
        // setLikedMoviesArray(response.data.user.likedMovies)
        console.log(response.data.user); // Handle success
        return response.data.user._id;
    } catch (error) {
      console.error(error); // Handle error
    }
  }

  const saveMovieToUserHistory = async (userId, res) => {
    try {
      const movie = {
        userId: userId,
        movie: {
          movieTitle: res.data.original_title || res.data.title,
          posterPath: res.data.poster_path,
          movieId: res.data.id,
        }
      }
      console.log(movie.userId);
      const response = await axios.post('https://frantic-slug-lab-coat.cyclic.app/auth/recent-movie', movie, {
        headers: {
            'Content-Type': 'application/json'
        }
      });
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const createMovieObject = async () => {
      const userId = await fetchingUserId()
      console.log(userId);
      if(id !== undefined && mediaType !== undefined){
        let data = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=b5d2609c326586f7f753f77b085a0b31&append_to_response=images,credits`;
        axios
          .get(data)
          .then((res) => {
            console.log(res.data);
            setMovieData(res.data);
            setImagesBackdrops(res.data.images.backdrops);
            setImagesPoster(res.data.poster_path);
            setMovieGenres(res.data.genres);
            setMovieActors(res.data.credits.cast);
            setMovieDuration(toHoursAndMinutes(res.data.runtime));
            setDataLoading(false)
            saveMovieToUserHistory(userId, res)
            mediaType === "tv"
              ? setTvShowSeasons(res.data.seasons)
              : setTvShowSeasons(undefined);
          })
          .catch((err) => {
            console.log(err);
          });}
    }
    createMovieObject()
  }, [id]);
  // console.log(imagesBackdrops);

  useEffect(() => {
    if(id !== undefined && mediaType !== undefined){
    let data = `https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1`;
    axios
      .get(data)
      .then((res) => {
        console.log("similar", res.data);
        setSimilarMovies(res.data.results);
        setDataLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });}
  }, [id]);

  useEffect(() => {
    document.title = `TBM | Movie Section`;
  }, []);


  const [hideAsideMenu, setHideAsideMenu] = useState(
    window.localStorage.getItem("AsideMenuVisibility") || "show"
  );
  // update wenever licalstorage chnages https://stackoverflow.com/questions/56660153/how-to-listen-to-localstorage-value-changes-in-react
  window.addEventListener("storage", () => {
    setHideAsideMenu(window.localStorage.getItem("AsideMenuVisibility"));
  });

  const Popup = (props) => {
    return (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>
            x
          </span>
          {props.content}
        </div>
      </div>
    );
  };

  const swiperBreakpoints = {
    0: {
      slidesPerView: 2,
    },
    400: {
      slidesPerView: 2,
    },
    639: {
      slidesPerView: 3,
    },
    865: {
      slidesPerView: 4,
    },
    1000: {
      slidesPerView: 5,
    },
    1500: {
      slidesPerView: 7,
    },
    1700: {
      slidesPerView: 8,
    },
    2000: {
      slidesPerView: 5,
    },
    2500: {
      slidesPerView: 6,
    },
    3000: {
      slidesPerView: 7,
    },
  };

  // alert('hash:', window.location.hash)

  const swiperBreakpointsMinus200 = {
    0: {
      slidesPerView: 1,
    },
    400: {
      slidesPerView: 1,
    },
    639: {
      slidesPerView: 2,
    },
    865: {
      slidesPerView: 3,
    },
    1000: {
      slidesPerView: 4,
    },
    1500: {
      slidesPerView: 6,
    },
    1700: {
      slidesPerView: 7,
    },
    2000: {
      slidesPerView: 4,
    },
    2500: {
      slidesPerView: 5,
    },
    3000: {
      slidesPerView: 6,
    },
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Add event listener to update window width when the screen size changes
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const BigSkeletonLoader = () => {
    return(
      <div >
          <div className="trending-section-skeleton-loader-title"></div>
          <div className={ hideAsideMenu === 'show' ? 'trending-section-big-card-skeleton-loader-container-200px' : 'trending-section-big-card-skeleton-loader-container-50px' }>

            <div className={ ` movie-details-backdrop-image-skeleton-loader ${hideAsideMenu === 'show' ? 'trending-section-big-card-skeleton-loader-container-200px' : 'trending-section-big-card-skeleton-loader-container-50px'}` }>
              <div className={ ` movie-details-backdrop-image-btns-rating-container-skeleton-loader ${hideAsideMenu === 'show' ? 'trending-section-big-card-skeleton-loader-container-200px' : 'trending-section-big-card-skeleton-loader-container-50px'}` }>
                <div className="movie-details-backdrop-image-rating-container-skeleton-loader">
                  <div className="movie-details-backdrop-image-rating-circle-skeleton-loader"></div>
                  <div className="movie-details-backdrop-image-rating-rectangle-skeleton-loader"></div>
                </div>
                <div className="movie-details-backdrop-image-btns-container-skeleton-loader"></div>
              </div>
            </div>
         </div>
      </div>
    )
  }

  return (
    dataLoading ?
      <BigSkeletonLoader />
    :
    <div
      className={`MovieDetails-div-for-css ${
        hideAsideMenu === "show"
          ? "movie-details-minus-200px-width"
          : "movie-details-minus-50px-width"
      } `}
    >
      <Swiper
        className={`mySwiper-movie-details-backdrop-images ${
          hideAsideMenu === "show"
            ? "movie-details-minus-200px-width"
            : "movie-details-minus-50px-width"
        } `}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        allowTouchMove={false}
        // pagination={{
        // dynamicBullets: true,
        // }}
        // modules={[Pagination]}
      >
        {imagesBackdrops.map((item) => (
          <SwiperSlide>
            <div
              className={`movie-details-big-backdrop-image ${
                hideAsideMenu === "show"
                  ? "movie-details-minus-200px-width"
                  : "movie-details-minus-50px-width"
              } `}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${item.file_path})`,
              }}
            >
              <div
                className={`movie-details-big-backdrop-shadow ${
                  hideAsideMenu === "show"
                    ? "movie-details-minus-200px-width"
                    : "movie-details-minus-50px-width"
                } `}
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={`movie-details-votes-trailer-btn ${
          hideAsideMenu === "show"
            ? "movie-details-minus-200px-width"
            : "movie-details-minus-50px-width"
        } `}
      >
        <div className={`movie-details-circularProgressbar-and-text-btn-div`}>
          <div className="movie-details-circularProgressbar-and-text-div">
            <div className="movie-details-circularProgressbar-div">
              <CircularProgressbar
                className="movie-details-circularProgressbar"
                backgroundPadding={5}
                background={true}
                value={movieData.vote_average}
                maxValue={10}
                text={movieData.vote_average}
                styles={buildStyles({
                  strokeLinecap: "butt",
                  textSize: "22px",
                  pathColor: "red",
                  textColor: "red",
                  trailColor: "black",
                  backgroundColor: "black",
                })}
              />
            </div>
            <div className="movie-details-text-div">
              <h3>{movieData.vote_count} VOTES</h3>
              <p>
                {movieData.vote_average > 6 ? "Our Users Are Recommending it" : ""}
              </p>
            </div>
          </div>
          <div className={"movie-details-play-trailer-btn-div"} onClick={toggleMediaTraillerPopup}>
            <PlayArrowIcon style={{ fontSize: "24px" }} className="movie-details-play-trailer-btn-icon-div" />
            <a className="movie-details-play-trailer-btn-text-div" href > TRAILER </a>
          </div>
        </div>
      </div>

      <div className="movie-details-full-section">
        <div className="movie-details-left-section">
            <div className="movie-details-watch-poster-title-ex-container">
              <img className="movie-details-images-poster" src={`https://image.tmdb.org/t/p/w185${imagesPoster}`} alt="img" />
              <div className="movie-details-title-btns-ex">
                <h1 className="movie-details-title-movie-poster"> {movieData.title || movieData.original_name || movieData.name} </h1>
                <div className="movie-details-movie-types">
                  {movieGenres.map((item) => (
                    <div className="movie-details-movie-genres">{item.name}</div>
                  ))}
                </div>
                <div className="movie-details-btns">
                  <a className="movie-details-btn-watch" href="#stream-movie-section">
                    <PlayArrowIcon style={{ fontSize: "24px", cursor: 'pointer' }} />
                    <label className="movie-details-btn-watch-watch-label">WATCH</label>
                  </a>
                  <div className="snd-movie-details-btns">
                      <div className="movie-details-favorite-btn" style={movieIsLiked ? {color: 'red'} : {}} onClick={handleFavoriteButton}><FavoriteBorder /></div>
                      <div className="movie-details-share-btn"><ShareIcon /></div>
                      <div className="movie-details-options-btn"><LinearScaleIcon /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="movie-details-released-storyline-cast-div-container" >
                <div className="movie-details-released-container">
                  <h3 className="movie-details-movie-description-titles" style={{ textTransform: 'uppercase' }}>{movieData.status}</h3>
                  <h3>{movieData.release_date}</h3>
                  <h3>{movieDuration.hours}H {movieDuration.minutes}MIN</h3>
                </div>
                <div className="movie-details-storyline-container">
                  <h3 className="movie-details-movie-description-titles" >STORYLINE</h3>
                  <p>{movieData.overview}</p>
                </div>
                <div className="movie-details-cast-container">
                  <h3 className="movie-details-movie-description-titles">CASTS</h3>
                  <div className="movie-details-actorCards-container-pro">
                      { movieActors.slice(0, 4).map( item =>
                          <div className='movie-details-actorCards-container'>
                              <img className='movie-details-actorCards-pic' src={`https://image.tmdb.org/t/p/w45${item.profile_path}`} alt='img'></img>
                              <div className='movie-details-actorCards-names'>
                                  <p>{item.name}</p>
                                  <p>{item.character}</p>
                              </div>
                          </div>
                        ) }
                      <p style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={toggleCastsPopup}>show all</p>
                  </div>
                </div>
            </div>
            <div className="movie-details-right-section-movie-seasons-episodes-cards-container">
            {
                seasonNum === undefined ?
                    mediaType === 'tv' ?
                    tvShowSeasons.filter( item => item.air_date != null ? item : null  ).map( item => <MovieSmallCard title={item.name} RemoveStars={'yes'}
                         mediaType={'tv'} movieId={id} releaseDate={item.air_date} isTvSeriesSection={true} seasonNum={item.season_number}
                         image={`https://image.tmdb.org/t/p/w185${item.poster_path}`} /> )
                    : null
                :
                tvEpisodes.map( item => <MovieSmallCard title={item.name} rating={item.vote_average} isTvSeriesSection={false}
                mediaType={'tv'} movieId={id} releaseDate={item.air_date} episodeNumber={item.episode_number} seasonNum={seasonNum}
                image={`https://image.tmdb.org/t/p/w185${item.still_path}`} /> )
            }
            </div>
            {
                mediaType === 'movie' ?
                <div id='stream-movie-section' className='watch-section-mediastream-container'>
                  <br/>
                  <div className='watch-section'>
                      <iframe
                          className={`watch-section-mediastream`}
                          src={mediaStream}
                          frameBorder="0"
                          allowFullScreen
                          title={movieData.title}
                          // onLoad={()=> setTimeout( console.clear() , 1)}
                      />
                  </div>
              </div>
            : null
            }

            {
                episodeNumber !== undefined ?
                <div id='stream-movie-section' className='watch-section-container'>
                  <br/>
                  <div className='watch-section'>
                      <iframe
                          width="1000vw"
                          height="600vh"
                          src={mediaStream}
                          frameBorder="0"
                          allowFullScreen
                          title={movieData.title}
                          onLoad={()=> setTimeout( console.log(mediaStream) , 1)}
                      />
                  </div>
              </div>
            : null
            }
          </div>
          <div className="movie-details-right-section">
            <hr />
            <div>
              <h2 className="movie-details-h2-title-more-like-this">More Like This:</h2>
              {windowWidth >= 900 ?
              <div className="movie-details-similar-movies-container">
                {similarMovies.slice(0, 9).map( item => (
                    <div className="movie-details-similar-movie-image-title-votes-container">
                        <img className='movie-details-similar-movie-images-poster' src={ item.poster_path === null ? poster404 : `https://image.tmdb.org/t/p/w185${item.poster_path}`} alt='img' />
                        <div className='movie-details-similar-movie-title-votes-container'>
                            <a className='movie-details-similar-movie-title' href>{item.title || item.name || item.original_name}</a>
                            {/* <a href>{item.vote_average}</a> */}
                            <div className="movie-details-similar-movies-circularProgressbar-release-date-container">
                              {item.vote_average !== 0 ?
                              <div className="movie-details-circularProgressbar-similar-movies-rating">
                                <CircularProgressbar
                                  // className="movie-details-circularProgressbar-similar-movies-rating"
                                  backgroundPadding={5}
                                  background={true}
                                  value={item.vote_average}
                                  maxValue={10}
                                  text={item.vote_average}
                                  styles={buildStyles({
                                    strokeLinecap: "butt",
                                    textSize: "20px",
                                    pathColor: "red",
                                    textColor: "red",
                                    trailColor: "black",
                                    backgroundColor: "black",
                                  })}
                                />
                              </div> : null
                            }
                              <div className="movie-details-similar-movies-release-date">
                                {/* <p>{item.release_date.substr(5, 2) == 1 ? 'JAN' :
                                      item.release_date.substr(5, 2) == 2 ? 'FEB' :
                                        item.release_date.substr(5, 2) == 3 ? 'MAR' :
                                          item.release_date.substr(5, 2) == 4 ? 'AVR' :
                                            item.release_date.substr(5, 2) == 5 ? 'MAI' :
                                              item.release_date.substr(5, 2) == 6 ? 'JUN' :
                                                item.release_date.substr(5, 2) == 7 ? 'JUL' :
                                                 item.release_date.substr(5, 2) == 8 ? 'AOU' :
                                                  item.release_date.substr(5, 2) == 9 ? 'SEP' :
                                                    item.release_date.substr(5, 2) == 10 ? 'OCT' :
                                                      item.release_date.substr(5, 2) == 11 ? 'NOV' :
                                                        item.release_date.substr(5, 2) == 12 ? 'DEC' : ''}</p>
                                <p>{item.release_date.substr(0, 4)}</p> */}
                              </div>
                            </div>
                        </div>
                    </div>
                ))}
              </div>
              :
              <div style={{ position: "relative" }} className={`${ hideAsideMenu === "hide" ? 'movies-groupers-container' : 'movies-groupers-container-200px'}`}>
                    <div className='moviesGroupper-movies-caraousel-container'>
                        <div className="swiper-button image-swiper-button-next top-rated-movies-next-arrow-for-swiper">
                            <KeyboardArrowRightIcon style={{ fontSize: '25px' }} />
                        </div>
                        <div className="swiper-button image-swiper-button-prev top-rated-movies-prev-arrow-for-swiper">
                            <KeyboardArrowLeftIcon style={{ fontSize: '25px' }} />
                        </div>
                        <Swiper
                            className={`mySwiper ${ hideAsideMenu === "hide" ? 'movie-pagination-minus-50px-width' : 'movie-pagination-minus-200px-width'}`}
                            loop={true}
                            slidesPerView={4}
                            spaceBetween={3}
                            modules={[Pagination, Navigation]}
                            autoplay={{
                              delay: 2600,
                              disableOnInteraction: false,
                            }}
                            breakpoints={swiperBreakpoints}
                            navigation={{
                              nextEl: ".trending-movies-next-arrow-for-swiper",
                              prevEl: ".trending-movies-prev-arrow-for-swiper",
                              disabledClass: "swiper-button-disabled",
                            }}
                            >
                            {similarMovies.slice(0, 18).map( item => <SwiperSlide key={item.id}><MovieSmallCard title={item.title || item.original_title || item.name} movieId={item.id} releaseDate={item.release_date || item.first_air_date} rating={item.vote_average} image={`https://image.tmdb.org/t/p/w185${item.poster_path}`} /></SwiperSlide> )}
                        </Swiper>
                    </div>
                </div>
              }
            </div>
          </div>
      </div>


      {/* <div className="movie-details-content">
        <div className="left-section">
          <div className="movie-details-watch-poster-title-ex-container">
            <img className="movie-details-images-poster" src={`https://image.tmdb.org/t/p/original${imagesPoster}`} alt="img" />
            <div className="movie-details-title-btns-ex">
              <h1> {movieData.title || movieData.original_name || movieData.name} </h1>
              <div className="movie-details-movie-types">
                {movieGenres.map((item) => (
                  <div className="movie-details-movie-genres">{item.name}</div>
                ))}
              </div>
              <div className="movie-details-btns">
                <a className="movie-details-btn-watch" href="#stream-movie-section">
                  <PlayArrowIcon style={{ fontSize: "24px", cursor: 'pointer' }} />
                  <label className="movie-details-btn-watch-watch-label">WATCH</label>
                </a>
                <div className="snd-movie-details-btns">
                    <div className="movie-details-favorite-btn"><FavoriteBorder /></div>
                    <div className="movie-details-share-btn"><ShareIcon /></div>
                    <div className="movie-details-options-btn"><LinearScaleIcon /></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={ hideAsideMenu === "show" ? "show-aside-menu-movie-details-storyline-cast-container" : "movie-details-storyline-cast-container" } >
                    <div>
                        <h3>{movieData.status}</h3>
                        <h3>{movieData.release_date}</h3>
                        <h3>{movieDuration.hours}H {movieDuration.minutes}MIN</h3>
                    </div>
                    <table>
                        <tr>
                            <th>STORYLINE</th>
                            <th>CAST</th>
                        </tr>
                        <tr>
                            <td>{movieData.overview}</td>
                            <td>
                                { movieActors.slice(0, 4).map( item =>
                                    <div className='movie-details-actorCards-container'>
                                        <img className='movie-details-actorCards-pic' src={`https://image.tmdb.org/t/p/original${item.profile_path}`} alt='img'></img>
                                        <div className='movie-details-actorCards-names'>
                                            <p>{item.name}</p>
                                            <p>{item.character}</p>
                                        </div>
                                    </div>
                                 ) }
                                <p style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={toggleCastsPopup}>show all</p>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className='right-section'>
                    <hr/>
                    <div>
                        <h2>More Like This:</h2>
                        {similarMovies.slice(0, 9).map( item => (
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1.5vh' }}>
                                <img className='movie-details-similar-movie-images-poster' src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt='img' />
                                <div className='movie-details-similar-movie-title-votes-container'>
                                    <a className='movie-details-similar-movie-title' href>{item.title || item.name || item.original_name}</a>
                                    <br/>
                                    <a href>{item.vote_average}</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
      </div> */}

       <div style={{ display: 'flex', flexWrap: 'wrap', width: '73vw', justifyContent: 'center' }}>



            </div>



      {/* popup windows */}
      {traillerWindowIsOpen && (
        <Popup
          content={
            <>
              <br />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <iframe
                  style={{
                    borderRadius: "1vw",
                  }}
                  width="900vw"
                  height="500vh"
                  src={mediaTrailer}
                  frameBorder="0"
                  allowFullScreen
                  title={movieData.title}
                  // onLoad={() => setTimeout(console.clear(), 1)}
                />
              </div>
              <br />
            </>
          }
          handleClose={toggleMediaTraillerPopup}
        />
      )}


      {/* toggleCastsPopup */}
      {castsWindowIsOpen && (
        <Popup
          content={
            <>
              <br />
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "1vw",
                }}
              >
                {movieActors.map((item) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      className="movie-details-actorCards-pic"
                      src={
                        item.profile_path === undefined ||
                        item.profile_path === null
                          ? `${userImageIcon}`
                          : `https://image.tmdb.org/t/p/w45${item.profile_path}`
                      }
                      alt="img"
                    ></img>
                    <div className="movie-details-actorCards-names">
                      <p>{item.name}</p>
                      <p>{item.character}</p>
                    </div>
                  </div>
                ))}
              </div>
              <br />
            </>
          }
          handleClose={toggleCastsPopup}
        />
      )}
    </div>
  );
}

export default MovieDetails;

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import '../style/MoviesGroupper.css'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MovieSmallCard from '../MovieSmallCard'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import axios from 'axios';
import { Link } from 'react-router-dom';


function LatestMovies(props) {

    const [getPopularMovies, setGetPopularMovies] = useState([])
    const [getPopularMoviesLoading, setGetPopularMoviesLoading] = useState(true)
    useEffect(() => {
      axios.get(`https://api.themoviedb.org/3/${props.mediaType || 'movie'}/popular?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1`)
      .then(res => {
        setGetPopularMovies( res.data.results )
        setGetPopularMoviesLoading(false)
      })
    }, [] )

    const[ hideAsideMenu, setHideAsideMenu ] = useState(window.localStorage.getItem("AsideMenuVisibility") || "show")
  window.addEventListener('storage', () => {
      setHideAsideMenu(window.localStorage.getItem("AsideMenuVisibility"))
  })

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

      const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Add event listener to update window width when the screen size changes
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let numDivs;
  if (windowWidth <= 400) {
    numDivs = 1;
  } else if (windowWidth <= 700) {
    numDivs = 2;
  } else if (windowWidth <= 767) {
    numDivs = 3;
  } else if (windowWidth <= 960) {
    numDivs = 4;
  } else if (windowWidth <= 1020) {
    numDivs = 5;
  } else if (windowWidth <= 1200) {
    numDivs = 6;
  } else if (windowWidth <= 1423) {
    numDivs = 7;
  } else {
    numDivs = 8;
  }

  const divsArray = Array.from({ length: numDivs }, (_, index) => (
    <div key={index} className="trending-section-small-card-skeleton-loader">
      {/* Your div content goes here */}
      <div className="trending-section-small-card-skeleton-loader-elements-container">
        <div className="trending-section-small-card-skeleton-loader-left-section-container">
          <div className="trending-section-small-card-skeleton-loader-left-section-container-big-title"></div>
          <div className="trending-section-small-card-skeleton-loader-left-section-container-data"></div>
          <div className="trending-section-small-card-skeleton-loader-left-section-container-data"></div>
        </div>
      </div>
    </div>
  ));

  const BigSkeletonLoader = () => {
    return(
      <div style={{ display: 'flex', flexDirection: "column", gap: '10px' }}>
          <div className="trending-section-skeleton-loader-title"></div>
              <div className={ hideAsideMenu === 'show' ? 'trending-section-big-card-skeleton-loader-container-200px' : 'trending-section-big-card-skeleton-loader-container-50px' }>
            {divsArray}
          </div>
      </div>
    )
  }

    return (
        <div>
          {getPopularMoviesLoading ? <div><BigSkeletonLoader /></div> :
            <div id='latest' className={`${ hideAsideMenu === "hide" ? 'movies-groupers-container' : 'movies-groupers-container-200px'}`}>
                <div className='movie-groupper-genre-title-with-see-all-btn' >
                    <Link className='home-explore-big-titles' to={`/explore/${props.mediaType}/latest`}><h1 style={{ display: 'flex', alignItems: 'center' }} className='h1-movie-groupper'>Latest {props.mediaType ==='tv' ? 'TV Show' : 'Movie'}s</h1></Link>
                    <div className='movie-groupper-see-all-btn-with-icon'>
                        <a>See all</a>
                        <KeyboardArrowRightIcon style={{ fontSize: '20px'}} />
                    </div>
                </div>
                <div style={{ position: "relative" }}>
                    <div className='moviesGroupper-movies-caraousel-container'>
                        <div className="swiper-button image-swiper-button-next latest-movies-next-arrow-for-swiper">
                            <KeyboardArrowRightIcon style={{ fontSize: '25px' }} />
                        </div>
                        <div className="swiper-button image-swiper-button-prev latest-movies-prev-arrow-for-swiper">
                            <KeyboardArrowLeftIcon style={{ fontSize: '25px' }} />
                        </div>
                        <Swiper
                            className={`mySwiper ${ hideAsideMenu === "hide" ? 'movie-pagination-minus-50px-width' : 'movie-pagination-minus-200px-width'}`}
                            loop={true}
                            slidesPerView={4}
                            spaceBetween={3}
                            pagination={{
                              clickable: true,
                            }}
                            modules={[Pagination, Navigation]}
                            autoplay={{
                              delay: 2400,
                              disableOnInteraction: false,
                            }}
                            breakpoints={swiperBreakpoints}
                            // centerInsufficientSlides={true}
                            // centeredSlidesBounds={true}
                            // centeredSlides={true}
                            navigation={{
                              nextEl: ".trending-movies-next-arrow-for-swiper",
                              prevEl: ".trending-movies-prev-arrow-for-swiper",
                              disabledClass: "swiper-button-disabled",
                            }}
                            >
                            {getPopularMovies.slice(0, 18).map( item => <SwiperSlide key={item.id}><MovieSmallCard title={item.title || item.original_title || item.name} mediaType={props.mediaType} movieId={item.id} releaseDate={item.release_date || item.first_air_date} rating={item.vote_average} image={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} /></SwiperSlide> )}
                        </Swiper>
                    </div>
                </div>
            </div>
}
            <br/>
        </div>
    )
}

export default LatestMovies

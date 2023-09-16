/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "../style/MoviesGroupper.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MovieBigCard from "../MovieBigCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import axios from "axios";
import SwiperCore, { Autoplay } from "swiper";
import { Link } from "react-router-dom";

SwiperCore.use([Autoplay]);
function TrendingMoviesSection(props) {
  // Trending Movies
  const [getTrendMovie, setGetTrendMovie] = useState([]);
  const [getTrendMovieLoading, setGetTrendMovieLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/${
          props.mediaType || "movie"
        }/day?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1`
      )
      .then((res) => {
        setGetTrendMovie(res.data.results);
        console.log(res.data);
        setGetTrendMovieLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const[ hideAsideMenu, setHideAsideMenu ] = useState(window.localStorage.getItem("AsideMenuVisibility") || "show")
  window.addEventListener('storage', () => {
      setHideAsideMenu(window.localStorage.getItem("AsideMenuVisibility"))
  })

  const swiperBreakpoints = {
    0: {
      slidesPerView: 1,
    },
    400: {
      slidesPerView: 1,
    },
    639: {
      slidesPerView: 1,
    },
    865: {
      slidesPerView: 1,
    },
    1000: {
      slidesPerView: 2,
    },
    1500: {
      slidesPerView: 3,
    },
    1700: {
      slidesPerView: 4,
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

  const swiperBreakpointsMinus200 = {
    0: {
      slidesPerView: 1,
    },
    400: {
      slidesPerView: 1,
    },
    639: {
      slidesPerView: 1,
    },
    865: {
      slidesPerView: 1,
    },
    1000: {
      slidesPerView: 2,
    },
    1500: {
      slidesPerView: 3,
    },
    1700: {
      slidesPerView: 3,
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

  let numDivs;
  if (windowWidth <= 767) {
    numDivs = 2;
  } else if (windowWidth <= 1023) {
    numDivs = 3;
  } else {
    numDivs = 4;
  }

  const divsArray = Array.from({ length: numDivs }, (_, index) => (
    <div key={index} className="trending-section-big-card-skeleton-loader">
      {/* Your div content goes here */}
      <div className="trending-section-big-card-skeleton-loader-elements-container">
        <div className="trending-section-big-card-skeleton-loader-left-section-container">
          <div className="trending-section-big-card-skeleton-loader-left-section-container-big-title"></div>
          <div className="trending-section-big-card-skeleton-loader-left-section-container-data"></div>
          <div className="trending-section-big-card-skeleton-loader-left-section-container-data"></div>
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
    {getTrendMovieLoading ? <div><br/><BigSkeletonLoader /><br/></div> :
    <div id="trending" className={`${ hideAsideMenu === "hide" ? 'movies-groupers-container' : 'movies-groupers-container-200px'}`}>
      <div className="movie-groupper-genre-title-with-see-all-btn">
        <Link
          className="home-explore-big-titles"
          to={`/explore/${props.mediaType}/trend`}
        >
          <h1
            style={{ display: "flex", alignItems: "center" }}
            className="h1-movie-groupper"
          >
            Trending {props.mediaType === "tv" ? "TV Show" : "Movie"}s
          </h1>
        </Link>
        <div className="movie-groupper-see-all-btn-with-icon">
          <a>See all</a>
          <KeyboardArrowRightIcon style={{ fontSize: "20px" }} />
        </div>
      </div>
      <div className={`moviesGroupper-movies-caraousel-mother-container ${ hideAsideMenu === "hide" ? 'movie-details-minus-50px-width' : 'movie-details-minus-200px-width'}`}>
        <div className="moviesGroupper-movies-caraousel-container">
          <div className="swiper-button image-swiper-button-next trending-movies-next-arrow-for-swiper">
            <KeyboardArrowRightIcon style={{ fontSize: "25px" }} />
          </div>
          <div className="swiper-button image-swiper-button-prev trending-movies-prev-arrow-for-swiper">
            <KeyboardArrowLeftIcon style={{ fontSize: "25px" }} />
          </div>
          <Swiper
            className={`mySwiper ${ hideAsideMenu === "hide" ? 'movie-pagination-minus-50px-width' : 'movie-pagination-minus-200px-width'}`}
            loop={true}
            slidesPerView={4}
            spaceBetween={3}
            modules={[Pagination, Navigation]}
            autoplay={{
              delay: 30000,
              disableOnInteraction: false,
            }}
            breakpoints={hideAsideMenu === 'hide' ? swiperBreakpoints : swiperBreakpointsMinus200}
            // centerInsufficientSlides={true}
            // centeredSlidesBounds={true}
            // centeredSlides={true}
            navigation={{
              nextEl: ".trending-movies-next-arrow-for-swiper",
              prevEl: ".trending-movies-prev-arrow-for-swiper",
              disabledClass: "swiper-button-disabled",
            }}
          >
            {getTrendMovie.slice(0, 18).map((item) => (
              <SwiperSlide key={item.id}>
                <MovieBigCard
                  title={item.title || item.original_title || item.name}
                  mediaType={props.mediaType}
                  movieId={item.id}
                  releaseDate={item.release_date || item.first_air_date}
                  rating={item.vote_average}
                  image={`https://image.tmdb.org/t/p/w780/${item.backdrop_path}`}
                  userId={props.userId}
                  userBookmarkedMovies={props.userBookmarkedMovies}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* <div style={{ display: 'flex', gap: '2vw', marginBottom: '4vh' }}>
                    <MovieBigCard title="Army of the dead" releaseDate="2021" rating="7.9"
                    image="https://assets.dicebreaker.com/zombicide-army-of-the-dead-board-game-movie-art.png/BROK/thumbnail/1600x900/format/jpg/quality/80/zombicide-army-of-the-dead-board-game-movie-art.png" />
                    <MovieBigCard title="Gunpowder milkshake" releaseDate="2021" rating="7.5"
                    image="https://www.michigansportszone.com/wp-content/uploads/2021/07/GUNPOWDER-MILKSHAKE-NETFLIX-REVIEW.jpg" />
                    <MovieBigCard title="AVATAR: THE WAY OF WATER" releaseDate="2022" rating="8.0"
                    image="https://cdn.theplaylist.net/wp-content/uploads/2022/05/14164920/Avatar-2-The-Way-Of-Water.jpg" />
                </div> */}
      <br />
    </div>
}
    </div>
  );
}

export default TrendingMoviesSection;

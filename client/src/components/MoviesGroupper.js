import React, {useEffect, useState} from 'react'
import "swiper/css";
import "swiper/css/pagination";
import './style/MoviesGroupper.css'
import TrendingMoviesSection from './movie types components/TrendingMoviesSection';
import TopRatedMoviesSection from './movie types components/TopRatedMoviesSection';
import PopularMoviesSection from './movie types components/PopularMoviesSection';
import LatestMovies from './movie types components/LatestMovies';


function MoviesGroupper() {

    useEffect(() => {
        document.title = `The Box Movies`;
      }, []);

    window.localStorage.setItem("navMediaType", "movie")
    window.dispatchEvent(new Event("storageNavMediaType"));

    window.localStorage.setItem("asideMenuSection", "home")
    window.dispatchEvent(new Event("storageChangesAsideMenuSection"));

    const[ hideAsideMenu, setHideAsideMenu ] = useState(window.localStorage.getItem("AsideMenuVisibility") || "show")
    window.addEventListener('storage', () => {
        setHideAsideMenu(window.localStorage.getItem("AsideMenuVisibility"))
    })

    return (
        <div className={ hideAsideMenu === 'show' ? 'Movies-groupper-big-container-200px' : 'Movies-groupper-big-container-50px'}>
            <TrendingMoviesSection mediaType={'movie'} />
            <PopularMoviesSection mediaType={'movie'} />
            <TopRatedMoviesSection mediaType={'movie'} />
            <LatestMovies mediaType={'movie'} />
        </div>
    )
}

export default MoviesGroupper

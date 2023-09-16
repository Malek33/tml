import React, {useEffect, useState} from 'react'
import "swiper/css";
import "swiper/css/pagination";
import './style/MoviesGroupper.css'
import TrendingMoviesSection from './movie types components/TrendingMoviesSection';
import TopRatedMoviesSection from './movie types components/TopRatedMoviesSection';
import PopularMoviesSection from './movie types components/PopularMoviesSection';
import LatestMovies from './movie types components/LatestMovies';
import axios from 'axios';





function MoviesGroupper() {
    const [userId, setUserId] = useState({})
    const [userBookmarkedMovies, setUserBookmarkedMovies] = useState([])
    // const userId = await fetchingUserId()

    const fetchingUserId = async () => {
        try {
          const response = await axios.get('https://frantic-slug-lab-coat.cyclic.app/auth/profile', {
            headers: {
                'Authorization': `${window.localStorage.getItem('token')}`
            }});
            setUserBookmarkedMovies(response.data.user.bookmarkedMovies)
            // console.log(response.data.user);
            return response.data.user;
        } catch (error) {
          console.error(error); // Handle error
        }
      }

    useEffect(() => {
      const createMovieObject = async () => {
        const userId = await fetchingUserId()
        setUserId(userId)
        // console.log(userId);
      }
      createMovieObject()
    }, []);

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
            <TrendingMoviesSection mediaType={'movie'} userId={userId} userBookmarkedMovies={userBookmarkedMovies}/>
            <PopularMoviesSection mediaType={'movie'} userId={userId} userBookmarkedMovies={userBookmarkedMovies}/>
            <TopRatedMoviesSection mediaType={'movie'} userId={userId} userBookmarkedMovies={userBookmarkedMovies}/>
            <LatestMovies mediaType={'movie'} userId={userId} userBookmarkedMovies={userBookmarkedMovies}/>
        </div>
    )
}

export default MoviesGroupper

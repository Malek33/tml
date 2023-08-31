/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { account } from "../appwrite/appwriteConfig";
import { useNavigate, Link } from "react-router-dom";
import './style/profile.css'
import PlaceIcon from '@mui/icons-material/Place';

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination, Navigation } from "swiper";
import SwiperCore, { Autoplay } from "swiper";
import MovieSmallCard from "../MovieSmallCard";




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
    slidesPerView: 6,
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




function Profile() {


  const [hideAsideMenu, setHideAsideMenu] = useState(
    window.localStorage.getItem("AsideMenuVisibility") || "show"
  );
  // update wenever licalstorage chnages https://stackoverflow.com/questions/56660153/how-to-listen-to-localstorage-value-changes-in-react
  window.addEventListener("storage", () => {
    setHideAsideMenu(window.localStorage.getItem("AsideMenuVisibility"));
  });

  // const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [recentMovies, setRecentMovies] = useState([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [likedMovies, setLikedMovies] = useState([]);
  const [userImage, setUserImage] = useState('');

  const fetchingUserData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/profile', {
        headers: {
            'Authorization': `${window.localStorage.getItem('token')}`
        }});
        console.log(response.data.user); // Handle success
        setUserDetails(response.data.user)
        setRecentMovies(response.data.user.recentMovies)
        setLikedMovies(response.data.user.likedMovies)
        setBookmarkedMovies(response.data.user.bookmarkedMovies)
        setUserIsLogged(true)
        // localStorage.setItem('token', response.data.token);

    } catch (error) {
      console.error(error); // Handle error
    }
  }

  useEffect(() => {
    fetchingUserData()
  }, [])

  return (
    <>
      {userIsLogged ? (
        <>
          <div>
            <div>
              <div className={`profile-user-banner ${ hideAsideMenu === "show" ? "movie-details-minus-200px-width" : "movie-details-minus-50px-width"} `} style={{ backgroundImage: `url(${userDetails.profileBackdrop})` }}> </div>
            </div>
            <div className="profile-user-under-banner-section-container">
              <div className="profile-user-personal-details-mother-container">
                <div className="profile-user-personal-details-container">
                  <img className="profile-user-picture-image" src={userDetails.profilePicture} alt="pdp" />
                  <div className="profile-user-personal-details-container-all-data">
                    <label>{`${userDetails.fName} ${userDetails.lName}`}</label>
                    <label>{userDetails.pronoun}</label>
                    <label className="profile-user-personal-details-location">
                      <PlaceIcon/>
                      <p>{userDetails.location}</p>
                    </label>
                    <label>{userDetails.bio}</label>
                  </div>
                  <div className="profile-user-personal-details-container-analytics">
                    <div>
                      <label>122</label>
                      <label>favorites</label>
                    </div>
                    <div>
                      <label>67</label>
                      <label>likes</label>
                    </div>
                    <div>
                      <label>37K</label>
                      <label>bookmarks</label>
                    </div>
                  </div>
                  <div className="profile-user-personal-details-container-btns">
                    <label className="profile-user-personal-details-container-1st-btn">Edit Profile</label>
                    <label className="profile-user-personal-details-container-2nd-btn">Add Friends</label>
                  </div>
                </div>
              </div>
              <div>

                <div>
                  <h1>Recently watched</h1>
                  <Swiper
                    className={`mySwiper ${ hideAsideMenu === "show" ? 'profile-user-slider-minus-200px-width' : 'profile-user-slider-minus-50px-width'}`}
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
                    {recentMovies.map( item => <SwiperSlide key={item.movieId}><MovieSmallCard title={item.movieTitle} movieId={item.id} image={`https://image.tmdb.org/t/p/w185${item.posterPath}`} /></SwiperSlide> )}
                </Swiper>
                </div>

                <div>
                  <h1>Recently watched</h1>
                  <Swiper
                    className={`mySwiper ${ hideAsideMenu === "show" ? 'profile-user-slider-minus-200px-width' : 'profile-user-slider-minus-50px-width'}`}
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
                    {recentMovies.map( item => <SwiperSlide key={item.movieId}><MovieSmallCard title={item.movieTitle} movieId={item.id} image={`https://image.tmdb.org/t/p/w185${item.posterPath}`} /></SwiperSlide> )}
                </Swiper>
                </div>

                <div>
                  <h1>Recently watched</h1>
                  <Swiper
                    className={`mySwiper ${ hideAsideMenu === "show" ? 'profile-user-slider-minus-200px-width' : 'profile-user-slider-minus-50px-width'}`}
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
                    {recentMovies.map( item => <SwiperSlide key={item.movieId}><MovieSmallCard title={item.movieTitle} movieId={item.id} image={`https://image.tmdb.org/t/p/w185${item.posterPath}`} /></SwiperSlide> )}
                </Swiper>
                </div>

              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="mt-4">
          Please Login To see Profile{" "}
          <Link to="/">
            <span className="">Login</span>
          </Link>
        </p>
      )}
    </>
  );
}

export default Profile;

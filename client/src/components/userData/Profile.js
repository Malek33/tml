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

// import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


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
      const response = await axios.get('https://frantic-slug-lab-coat.cyclic.app/auth/profile', {
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
    850: {
      slidesPerView: 4,
    },
    901: {
      slidesPerView: 2,
    },
    1060: {
      slidesPerView: 3,
    },
    1300: {
      slidesPerView: 4,
    },
    1500: {
      slidesPerView: 5,
    },
    1700: {
      slidesPerView: 6,
    },
    2000: {
      slidesPerView: 7,
    },
    2500: {
      slidesPerView: 7,
    },
    3000: {
      slidesPerView: 7,
    },
  };

  const handleChangeAccountProfileData = () => {
    <Popup trigger={<button>Trigger</button>} position="top left">
    {close => (
      <div>
        Content here
        <a href className="close" onClick={close}>
          &times;
        </a>
      </div>
    )}
  </Popup>

  }

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
                  <Popup
    trigger={<label className="profile-user-personal-details-container-1st-btn">
    Edit Profile</label>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Modal Title </div>
        <div className="content">
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
          Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
          delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
          <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
          commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
          explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
        </div>
        <div className="actions">
          <Popup
            trigger={<button className="button"> Trigger </button>}
            position="top center"
            nested
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
  </Popup>
                    <label className="profile-user-personal-details-container-2nd-btn">Add Friends</label>
                  </div>
                </div>
              </div>
              <div>

                <div>
                  <h1>Recently watched :</h1>
                  <Swiper
                    className={`mySwiper ${ hideAsideMenu === "show" ? 'profile-user-slider-minus-200px-width' : 'profile-user-slider-minus-50px-width'}`}
                    loop={true}
                    // slidesPerView={4}
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
                  <h1>Favorite Movies :</h1>
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
                    {likedMovies.map( item => <SwiperSlide key={item.movieId}><MovieSmallCard title={item.movieTitle} movieId={item.id} image={`https://image.tmdb.org/t/p/w185${item.posterPath}`} /></SwiperSlide> )}
                </Swiper>
                </div>

                <div>
                  <h1>Bookmarked Movies :</h1>
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
                    {bookmarkedMovies.map( item => <SwiperSlide key={item.movieId}><MovieSmallCard title={item.movieTitle} movieId={item.id} image={`https://image.tmdb.org/t/p/w185${item.posterPath}`} /></SwiperSlide> )}
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

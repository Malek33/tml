/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import './style/Navbar.css'

import { useSnapshot } from "valtio";
import state from '../store/index.js';
// import MalekPic from '../img/spider-malek.png'

// import SensorsOutlinedIcon from '@mui/icons-material/SensorsOutlined';
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import { useNavigate, Link } from "react-router-dom";

import miniTBMLogo from '../img/TBM.png'
import poster404 from '../img/poster404.png'

import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
    const navigate = useNavigate();
    const snap = useSnapshot(state);
    console.log(snap.darkMode);

  const [userDetails, setUserDetails] = useState({});
  const [userIsHere, setUserIsHere] = useState(false);

  const [navBarUserDetailsArrowDown, setNavBarUserDetailsArrowDown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setNavBarUserDetailsArrowDown(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleButtonClick = (event) => {
    event.stopPropagation(); // Prevent the click event from propagating
    setNavBarUserDetailsArrowDown(!navBarUserDetailsArrowDown);
  };

  const handleLogout = async () => {
        window.localStorage.removeItem('token')
        navigate('/login')
        window.location.reload()
    }

    const userDataShow = async () => {
        try {
            const response = await axios.get('http://localhost:5000/auth/profile', {
              headers: {
                  'Authorization': `${window.localStorage.getItem('token')}`
              }});
              console.log(response.data.user); // Handle success
              setUserDetails(response.data.user);
              setUserIsHere(true)
            //   return response.data.user._id;
          } catch (error) {
            console.error(error); // Handle error
          }
    }

    useEffect(() => {
        userDataShow()
    }, [])

    const[ hideAsideMenu, setHideAsideMenu ] = useState(window.localStorage.getItem("AsideMenuVisibility") || "show")
    // update wenever licalstorage chnages https://stackoverflow.com/questions/56660153/how-to-listen-to-localstorage-value-changes-in-react
    window.addEventListener('storage', () => {
        setHideAsideMenu(window.localStorage.getItem("AsideMenuVisibility"))
    })

    const [selectedMediaTypeNavbar, setSelectedMediaTypeNavbar] = useState(window.localStorage.getItem("navMediaType") || "movie")
    window.addEventListener('storageNavMediaType', () => {
        setSelectedMediaTypeNavbar(window.localStorage.getItem("navMediaType"))
    })

    const [keyword, setKeyword] = useState("");
    const [searchApiLoaded, setSearchApiLoaded] = useState(false);
    const [searchResults, setSearchResults] = useState({});
    // const [showParamsWindow, setShowParamsWindow] = useState(false);
    const [hideEmailNavBar] = useState(false);
    const [movieFilter, setMovieFilter] = useState(false);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/search/multi?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&query=${keyword}&page=1&include_adult=false`)
        .then(res => {
          setSearchResults(res.data.results)
          console.log('search:', res.data)
          setSearchApiLoaded(true)
        })
      }, [keyword])

    const [showSearchResults, setShowSearchResults] = useState(false);


    return (
        <div className='nav-bar-containerr'>
            <div className={ `nav-bar ${hideAsideMenu === "show" ? 'nav-container' : 'nav-container-and-aside-menu-active'} ${snap.darkMode ? 'dark-nav-bar' : 'white-nav-bar'}`} >
                <div className='movie-types-tags-nav-bar' style={{display: 'flex'}}>
                    {hideAsideMenu === "hide" ? <img className='tbm-mini-logo-nav' alt='logo' src={miniTBMLogo}></img> : null}
                    <ul className='ul-navbar'>
                        <li><Link to="/movie" className={ selectedMediaTypeNavbar === 'movie' ? 'navbar-a-active' : 'navbar-a' }>Movies</Link></li>
                        <li><Link to="/tv" className={ selectedMediaTypeNavbar === 'tv' ? 'navbar-a-active' : 'navbar-a' }>TV Shows</Link></li>
                    </ul>
                </div>
                    <div className={`searchbar-container ${hideAsideMenu === "show" ? 'searchbar-container-hide' : ''}`}>
                        <div className='fix-input-searchbar'>
                            <Link to={keyword !== "" ? `/search/${keyword}` : '/'} onClick={() => setTimeout(function(){window.location.reload();}, 100)} className='Searchbar-icon'><SearchOutlinedIcon style={{ fontSize: '28px' }}  /></Link>
                            <form onSubmit={() => keyword !== "" ? navigate(`/search/${keyword}`) : null}>
                                <input className='searchbar-input' onInput={ event => {setKeyword(event.target.value)}}
                                onFocus={ () => showSearchResults ? setShowSearchResults(false) : setShowSearchResults(true) }
                                onBlur={ () =>  setTimeout(() => {setShowSearchResults(false)}, 200) }
                                placeholder='Search for Movies/TV Shows' />
                            </form>
                            <div className='Searchbar-filter-icon'
                            tabIndex={0}
                            onFocus={() => setMovieFilter(true)}
                            onBlur={() => setMovieFilter(false)}
                            onClick={() => !movieFilter}
                            // onClick={ () => movieFilter ? setMovieFilter(false) : setMovieFilter(true) }
                            ><TuneIcon style={{ fontSize: '20px' }} /></div>
                            <div className={`Searchbar-filter-container ${movieFilter ? 'Searchbar-filter-container-show' : 'Searchbar-filter-container-hide'}`}></div>
                        </div>
                        <div style={ showSearchResults && keyword !== "" ? {display: 'block'} : {display: 'none'} } className='search-content-container'>
                            <Link to={`/search/${keyword}`} style={{ color: 'white', textDecoration: 'none' }}><p className='click-to-search-for'>click here to search for "{<p>{keyword}</p>}"</p></Link>
                            { searchApiLoaded ?
                            searchResults.slice(0, 10).map( item =>
                                <Link to={`/movieDetails/${item.media_type}/${item.id}`} style={{ color: '#a3a3a3', textDecoration: 'none' }}>
                                    <div className='navbar-inner-search-results'>
                                        <img className='navbar-search-results-details-image' src={item.poster_path === undefined || item.poster_path === null ? `${poster404}` : `https://image.tmdb.org/t/p/original${item.poster_path}`} alt={item.title} title={item.overview || item.name} />
                                        <div>
                                            <div title={item.original_name || item.title || item.name}>{item.original_name || item.title || item.name}</div>
                                            <div>{item.media_type}</div>
                                            <div>{item.release_date || item.first_air_date}</div>
                                        </div>
                                    </div>
                                </Link> )
                            : <p></p> }
                        </div>
                    </div>
                <div className='icons-loginbtn-navbar' style={{ display: 'flex', alignItems: 'center', gap: '15px', position: 'relative'}}>
                    {/* <a className='icon-btn-beside-userpic-navbar'><SensorsOutlinedIcon style={{ fontSize: '25px' }} /></a> */}
                    {/* <a className='icon-btn-beside-userpic-navbar'><NotificationsNoneOutlinedIcon style={{ fontSize: '25px' }} /></a> */}
                    {/* <a onClick={ () => setShowParamsWindow(!showParamsWindow) } className='icon-btn-beside-userpic-navbar'><AppsOutlinedIcon style={{ fontSize: '25px' }} /></a>
                        {
                            showParamsWindow ?
                                <div className='navBarParamsWindow-container'>
                                    <p onClick={ handleLogout }>disconnect</p>
                                    <p onClick={ () => setHideEmailNavBar(!hideEmailNavBar) }>hide email</p>
                                </div>
                            : null
                        } */}
                        {userIsHere ?
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div className='navbar-usersection-name-image-mail-container'>
                                    <Link className='navbar-usersection-name-image-mail' to={'/profile'}>
                                        <img className='image-profile-pic-navbar' src={userDetails.profilePicture} alt='profile pic' />
                                        <div className='navbar-usersection-name-mail' style={{ marginRight: '0.5vw' }}>
                                            <label className='navbar-username'>{`${userDetails.fName} ${userDetails.lName}`}</label>
                                            <label className={ `navbar-user-data-email ${hideEmailNavBar ? 'navbar-usermail-hide' : 'navbar-usermail'}` }>{userDetails.email}</label>
                                        </div>
                                    </Link>
                                    <KeyboardArrowDownOutlinedIcon onClick={handleButtonClick} className='nav-bar-user-details-arrow-down' style={{ fontSize: '20px' }} />
                                    <div ref={dropdownRef} className={ navBarUserDetailsArrowDown ? 'nav-bar-user-details-arrow-down-page-show' : 'nav-bar-user-details-arrow-down-page-hide' }>
                                        <ul>
                                            <li className={'normal-li-navbar'} onClick={() => state.darkMode = !state.darkMode}><SettingsIcon className='nav-bar-user-details-arrow-down-page-show-icon'/>Settings & privacy</li>
                                            <li className={'normal-li-navbar'}><DarkModeIcon className='nav-bar-user-details-arrow-down-page-show-icon'/>Display & accessibility</li>
                                            <li className={'normal-li-navbar'}><SupportAgentIcon className='nav-bar-user-details-arrow-down-page-show-icon'/>Help & support</li>
                                            <li className={'logout-li-navbar'} onClick={handleLogout}><LogoutIcon style={{ backgroundColor: 'red', color: 'white' }} className='nav-bar-user-details-arrow-down-page-show-icon'/>Log Out</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        :
                        <Link style={{ textDecoration: 'none', color: 'white', marginRight: '40px' }} to="/login">
                            <span className="navbar-login-btn">Login</span>
                        </Link>
                        }
                </div>
            </div>
            {/* <hr className='hr-navBar'/> */}
            <div className='fixing-nav-bar-hiding-content-issue'></div>
        </div>
    )
}

export default Navbar

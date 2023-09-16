/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import './style/AsideMenu.css'

import MenuIcon from '@mui/icons-material/Menu';
import websiteLargeLogo from '../img/the box movies.png'
import websiteMiniLogo from '../img/TBM.png'


import HomeIconOutlined from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';

import ExploreOutlined from '@mui/icons-material/ExploreOutlined';
import ExploreIcon from '@mui/icons-material/Explore';

import GroupsOutlined from '@mui/icons-material/GroupsOutlined';
import GroupsIcon from '@mui/icons-material/Groups';

import AlarmIcon from '@mui/icons-material/AccessAlarmTwoTone';
import AlarmOutlined from '@mui/icons-material/Alarm';

import AccessTimeIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import AccessTimeOutlined from '@mui/icons-material/AccessTime';

import FavoriteBorder from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorder';

import BookmarkBorderIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlined from '@mui/icons-material/BookmarkBorder';

import StarBorderIcon from '@mui/icons-material/Star';
import StarBorderOutlined from '@mui/icons-material/StarBorder';


import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';

import InfoOutlined from '@mui/icons-material/InfoOutlined';
import InfoIcon from '@mui/icons-material/Info';

import { Link, useNavigate } from 'react-router-dom';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import axios from 'axios';
import poster404 from '../img/poster404.png'



function AsideMenu(props) {
    const navigate = useNavigate();
    const[ hideAsideMenu, setHideAsideMenu ] = useState(window.localStorage.getItem("AsideMenuVisibility") || "hide")
    //update wenever licalstorage chnages https://stackoverflow.com/questions/56660153/how-to-listen-to-localstorage-value-changes-in-react
    window.localStorage.setItem("AsideMenuVisibility", hideAsideMenu)
    window.dispatchEvent(new Event("storage"));

    const[ token, setToken ] = useState(window.localStorage.getItem("token"))
    // setToken(window.localStorage.getItem("asideMenuSection"))

    const[ asideMenuSection, setAsideMenuSection ] = useState(window.localStorage.getItem("asideMenuSection") || "home")
    window.addEventListener('storageChangesAsideMenuSection', () => {
        setAsideMenuSection(window.localStorage.getItem("asideMenuSection"))
    })

    const [showSearchResults, setShowSearchResults] = useState(false);
    const [test, setTest] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [searchApiLoaded, setSearchApiLoaded] = useState(false);
    const [searchResults, setSearchResults] = useState({});

  const searchSubmitHandler = () => {
    navigate(`/search/${keyword}`);
}

useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/search/multi?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&query=${keyword}&page=1&include_adult=false`)
    .then(res => {
      setSearchResults(res.data.results)
      console.log('search:', res.data)
      setSearchApiLoaded(true)
    })
  }, [keyword])

  const asideMenuElements = [
    {
        title: "Home",
        DefIcon: <HomeIcon className='asideBarSingleSectionButtonImageHover'/>,
        OutIcon: <HomeIconOutlined/>,
        path: "/",
        localStorageName: "home"
    },
    {
        title: "Discovery",
        DefIcon: <ExploreIcon className='asideBarSingleSectionButtonImageHover'/>,
        OutIcon: <ExploreOutlined/>,
        path: "/discover",
        localStorageName: "discover"
    },
    {
        title: "Community",
        DefIcon: <GroupsIcon className='asideBarSingleSectionButtonImageHover'/>,
        OutIcon: <GroupsOutlined/>,
        path: "/community",
        localStorageName: "community"
    },
    {
        title: "Coming Soon",
        DefIcon: <AlarmIcon className='asideBarSingleSectionButtonImageHover'/>,
        OutIcon: <AlarmOutlined/>,
        path: "/upcoming",
        localStorageName: "upcoming"
    },

    {
        title: "Recent",
        DefIcon: <AccessTimeIcon className='asideBarSingleSectionButtonImageHover'/>,
        OutIcon: <AccessTimeOutlined/>,
        path: token ? "/recent" : "/login",
        localStorageName: "recent"
    },
    {
        title: "Favorites",
        DefIcon: <FavoriteBorder className='asideBarSingleSectionButtonImageHover'/>,
        OutIcon: <FavoriteBorderOutlinedIcon/>,
        path: token ? "/favorites" : "/login",
        localStorageName: "favorites"
    },
    {
        title: "Bookmarked",
        DefIcon: <BookmarkBorderIcon className='asideBarSingleSectionButtonImageHover'/>,
        OutIcon: <BookmarkBorderOutlined/>,
        path: token ? "/bookmarked" : "/login",
        localStorageName: "bookmarked"
    },
    {
        title: "Top Rated",
        DefIcon: <StarBorderIcon className='asideBarSingleSectionButtonImageHover'/>,
        OutIcon: <StarBorderOutlined/>,
        path: "/top-rated",
        localStorageName: "topRated"
    },

    {
        title: "Settings",
        DefIcon: <SettingsIcon className='asideBarSingleSectionButtonImageHover'/>,
        OutIcon: <SettingsOutlined/>,
        path: "/settings",
        localStorageName: "settings"
    },
    {
        title: "Help",
        DefIcon: <InfoIcon className='asideBarSingleSectionButtonImageHover'/>,
        OutIcon: <InfoOutlined/>,
        path: "/help",
        localStorageName: "help"
    },
  ]


    return (<div>
                {/* <div className='' onClick={() => setHideAsideMenu(hideAsideMenu === "show" ? "hide" : "show")}><MenuIcon/></div> */}
                <div style={{display: 'flex', position: 'relative', flexDirection: 'column'}} className={ hideAsideMenu === 'show' ? 'Aside-menu-parent-container' : 'Aside-menu-parent-container-hide' }>
                    <div className={`asideMenuContainer ${hideAsideMenu === "show" ? 'asideMenu-expand' : 'asideMenu-collapse'}`}>
                        <div className={`menuIconLogoConfig ${hideAsideMenu === "show" ? 'menuIconLogoConfigWidthFixing' : ''}`} >
                            <div className='menu-btn' onClick={() => setHideAsideMenu(hideAsideMenu === "show" ? "hide" : "show")}>
                                <MenuIcon/>
                            </div>
                            <div id={hideAsideMenu === "show" ? 'big-logo-site' : 'small-logo-site'}></div>
                        </div>
                        <div className={`asideMenu ${hideAsideMenu === "show" ? 'asideMenu-expand' : 'asideMenu-collapse'}`}>
                            <div className='fixingAsideMenu'>

                                {asideMenuElements.map((item, index) => ( index !== 4 && index !== 8 ?
                                <div key={item.title} className='fixing-mobile-alignment'>
                                    <Link to={`${item.path}`} id={item.localStorageName} className={`asideBarSingleSectionButton
                                        ${ hideAsideMenu !== "show" ? 'asideBarSingleSectionLogoOnly' : 'asideBarSingleSectionLogoAndText' }
                                        ${ asideMenuSection === item.localStorageName ? 'activeSection' : '' }`}>
                                            { asideMenuSection === item.localStorageName ? item.DefIcon : item.OutIcon}
                                            <label>{item.title}</label>
                                            {hideAsideMenu === "show" && asideMenuSection === item.localStorageName ? <div className='redBarInSectionForAsideMenu'></div> : null}
                                    </Link>
                                    </div> :
                                    <div key={item.title} className='mobile-tesssssstttttinng-fr-mobile'>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '-12px' }}><hr className={ `hrAsideMenu ${hideAsideMenu === "show" ? 'hrExpand' : 'hrCollapse'}` }/></div>
                                        <div className='fixing-mobile-alignment'>
                                        <Link to={`${item.path}`} id={item.localStorageName} className={`asideBarSingleSectionButton
                                            ${ hideAsideMenu !== "show" ? 'asideBarSingleSectionLogoOnly' : 'asideBarSingleSectionLogoAndText' }
                                            ${ asideMenuSection === item.localStorageName ? 'activeSection' : '' }`}>
                                            { asideMenuSection === item.localStorageName ? item.DefIcon : item.OutIcon}
                                            <label>{item.title}</label>
                                            {hideAsideMenu === "show" && asideMenuSection === item.localStorageName ? <div className='redBarInSectionForAsideMenu'></div> : null}
                                        </Link>
                                        </div>
                                    </div>
                                ))}
                                <div className='fixing-not-finishing-scrolling-asideMenuBar'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
}

export default AsideMenu

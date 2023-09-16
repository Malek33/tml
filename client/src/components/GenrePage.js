/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MovieSmallCard from './MovieSmallCard';
import './style/GenrePage.css'

function GenrePage() {

  const [hideAsideMenu, setHideAsideMenu] = useState(
    window.localStorage.getItem("AsideMenuVisibility") || "show"
  );
  // update wenever licalstorage chnages https://stackoverflow.com/questions/56660153/how-to-listen-to-localstorage-value-changes-in-react
  window.addEventListener("storage", () => {
    setHideAsideMenu(window.localStorage.getItem("AsideMenuVisibility"));
  });

    useEffect(() => {
        document.title = `TBM | Genres`;
      }, []);

    const { id } = useParams()

    const [searchApiLoaded, setSearchApiLoaded] = useState(false);
    const [searchResults, setSearchResults] = useState({});
    const [pages, setPages] = useState(1);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b5d2609c326586f7f753f77b085a0b31&with_genres=${id}`)
        .then(res => {
          setSearchResults(res.data.results)
          setPages(res.data.total_pages)
          console.log('genresPage:', res.data)
          setSearchApiLoaded(true)
        })
      }, [id])



    return (
        //api_key=b5d2609c326586f7f753f77b085a0b31
        <div className='GenrePageSection'>
            <h1>Search Results:</h1>
            <div className={`MediaSearch-page-content-container ${ hideAsideMenu === "show" ? "movie-details-minus-200px-width" : "movie-details-minus-50px-width"} `}>
              { searchApiLoaded ?
              <div className='MediaSearch-page-content'>
              {searchResults.map( item =>
                  <MovieSmallCard title={item.title || item.original_title}
                    mediaType={item.media_type} movieTypeIsAvailable={false}
                    movieId={item.id} releaseDate={item.release_date} rating={item.vote_average}
                      image={`https://image.tmdb.org/t/p/original${item.poster_path}`} /> )}
              </div>
                      : null }
            </div>
        </div>
    )
}

export default GenrePage

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './style/MediaSearch.css'
import MovieSmallCard from './MovieSmallCard';
import { useParams } from 'react-router-dom';

import poster404 from '../img/poster404.png'

function ExploreMovies() {

    useEffect(() => {
        document.title = `TBM | Results of "${mediaType}"`;
      }, []);

    const { mediaType, section } = useParams()

    const [searchApiLoaded, setSearchApiLoaded] = useState(false);
    const [searchResults, setSearchResults] = useState({});
    const [pages, setPages] = useState(1);

    useEffect(() => {
        axios.get( section === "latest" ? `https://api.themoviedb.org/3/${mediaType || 'movie'}/popular?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1`
        : section === "popularity" ? `https://api.themoviedb.org/3/${mediaType || 'movie'}/popular?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1`
        : section === "top-rated" ? `https://api.themoviedb.org/3/${mediaType || 'movie'}/top_rated?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1`
        : `https://api.themoviedb.org/3/trending/${mediaType || 'movie'}/day?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1` )
        .then(res => {
          setSearchResults(res.data.results)
          setPages(res.data.total_pages)
          console.log('searchPage:', res.data)
          setSearchApiLoaded(true)
        })
      }, [])

    return (
        <div className='MediaSearch-page'>
            <h1>{
              section === "latest" ? `Latest ${mediaType === 'tv' ? 'TV Shows' : 'Movies'}`
              : section === "popularity" ? `Popular ${mediaType === 'tv' ? 'TV Shows' : 'Movies'}`
              : section === "top-rated" ? `Top Rated ${mediaType === 'tv' ? 'TV Shows' : 'Movies'}`
              : `Trending ${mediaType === 'tv' ? 'TV Shows' : 'Movies'}`
              }:</h1>
            { searchApiLoaded ?
            <div className='MediaSearch-page-content'>
             {searchResults.map( item =>
                 <MovieSmallCard title={item.title || item.original_title || item.name}
                  mediaType={item.media_type} movieTypeIsAvailable={false}
                   movieId={item.id} releaseDate={item.release_date} rating={item.vote_average}
                    image={ item.poster_path === undefined || item.poster_path === null ? `${poster404}` : `https://image.tmdb.org/t/p/original${item.poster_path}`} /> )}
            </div>: null }
        </div>
    )
}

export default ExploreMovies



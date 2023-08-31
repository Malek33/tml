/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './style/MediaSearch.css'
import MovieSmallCard from './MovieSmallCard';
import { useParams } from 'react-router-dom';

import poster404 from '../img/poster404.png'
import LoadingCubes from './tools-components/loading-cubes/LoadingCubes';

function MediaSearch() {

    useEffect(() => {
        document.title = `TBM | Results of "${keyword}"`;
      }, []);

    const { keyword } = useParams()

    const [searchApiLoaded, setSearchApiLoaded] = useState(false);
    const [searchResults, setSearchResults] = useState({});
    const [pages, setPages] = useState(1);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/search/multi?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&query=${keyword}&page=1&include_adult=false`)
        .then(res => {
          setSearchResults(res.data.results)
          setPages(res.data.total_pages)
          console.log('searchPage:', res.data)
          setSearchApiLoaded(true)
        })
      }, [])

    return (
        <div className='MediaSearch-page'>
            {
              searchApiLoaded === false ?
              <LoadingCubes/>
              :
              <div>
                <h1>Search Results:</h1>
            { searchApiLoaded ?
            <div className='MediaSearch-page-content'>
             {searchResults.filter(item => item.media_type !== 'person' ? item : null).map( item =>
                 <MovieSmallCard title={item.title || item.original_title || item.name}
                  mediaType={item.media_type} movieTypeIsAvailable={true}
                   movieId={item.id} releaseDate={item.release_date} rating={item.vote_average}
                    image={ item.poster_path === undefined || item.poster_path === null ? `${poster404}` : `https://image.tmdb.org/t/p/original${item.poster_path}`} /> )}
            </div>
                     : null }
              </div>
            }
        </div>
    )
}

export default MediaSearch

import { useState, useEffect } from 'react'
import { nacelleClient } from 'services'
import Link from 'next/link';
import Image from 'next/image';

import algoliasearch from 'algoliasearch'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALOGLIA_APPLICATION_ID, process.env.NEXT_PUBLIC_ALOGLIA_WRITE_API_KEY)
const index = searchClient.initIndex('shopify_products')

const SearchMenu = ({ query }) => {

    useEffect(() => {
        index.search(query).then(({ hits }) => {
            console.log(hits, searchResults);
            setSearchResults(hits)
        });
    }, [searchResults])
  
    const [searchState, setSearchState] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const onSearchStateChange = (searchState) => searchState

    const setNextSearchState = (nextSearchState) => {
        setSearchState(nextSearchState);
        onSearchStateChange(nextSearchState);
    };

    return (
      <div className="search">
        <div className={`search-menu`}>
            {/* <InstantSearch
                indexName="shopify_products"
                searchClient={searchClient}
                
                onSearchStateChange={setNextSearchState}
            >
                <SearchBox searchAsYouType={true} defaultRefinement="iphone" />
                <Hits />
            </InstantSearch> */}
            <div className="search-menu__products">
                {searchResults.length > 1 ? (
                    <div></div>
                ) : ""}
            </div>

        </div>
        <div className={`search-menu__overlay`}></div>
      </div>
    );
  };
  
  export default SearchMenu;
import React, { useState, useEffect } from "react";
import { createApi, toJson } from "unsplash-js";

import "./App.scss";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import Sentence from "./components/Sentence";
import Photos from "./components/Photos";

const unsplash = createApi({
  accessKey: "8ba7daec662eb3e3f18f31a571b61faece5beb250fe546925e79e21ca827672f"
});

const cache = JSON.parse(localStorage.getItem("cache")) || {};
localStorage.clear();

const App = () => {
  const [query, setQuery] = useState("funny");
  const [photosData, setPhotosData] = useState({});
  const [page, setPage] = useState(1);

  const fetchPhotos = () => {
    if (cache[query] && cache[query][page]) {
      setPhotosData(cache[query][page]);
      // console.log(cache);
    } else {
      try {
        unsplash.search
          .getPhotos({
            query: query,
            page: 1,
            per_page: 10
          })
          .then((result) => {
            const results = result.response;
            setPhotosData(results);

            cache[query] = cache[query] ? cache[query] : {};
            cache[query][page] = results;
            localStorage.setItem("cache", JSON.stringify(cache));
          });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const onSearchPhoto = (searchTerms) => {
    setQuery(searchTerms);
  };

  useEffect(() => {
    fetchPhotos();
  }, [query, page]);

  const photosArray = photosData.results || [];
  return (
    <div className="app">
      <div className="app-header">
        <div className="search-form">
          <Header />
          <SearchForm onSearchPhoto={onSearchPhoto} />
        </div>
      </div>
      <Sentence />
      <p>
        Currently showing <b>{photosData.total}</b> results for: {""}
        <b className="query">{query}</b>
      </p>
      <div className="app-gallery">
        <Photos photos={photosArray} />
        <button className="button">Load more</button>
      </div>
    </div>
  );
};

export default App;

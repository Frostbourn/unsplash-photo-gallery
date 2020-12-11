import React, { useState, useEffect, Suspense, lazy } from "react";
import { createApi } from "unsplash-js";

import "./App.scss";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import Sentence from "./components/Sentence";
const Photos = lazy(() => import("./components/Photos"));
import Spinner from "./components/Spinner";

const unsplash = createApi({
  accessKey: "8ba7daec662eb3e3f18f31a571b61faece5beb250fe546925e79e21ca827672f"
});

const cache = JSON.parse(localStorage.getItem("cache")) || {};
localStorage.clear();

const App = () => {
  const [query, setQuery] = useState("funny");
  const [photosData, setPhotosData] = useState({});
  const [page, setPage] = useState(1);

  const onSearchPhoto = (searchTerms) => {
    setQuery(searchTerms);
  };

  useEffect(() => {
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
              per_page: 16
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
    fetchPhotos();
  }, [query, page]);

  const photosArray = photosData.results || [];
  return (
    <div className="app">
      <div className="app-header">
        <div
          className="header-bg"
          style={{
            backgroundImage: photosArray.length
              ? `url(${photosArray[0].urls.regular})`
              : "url(https://images.unsplash.com/photo-1604030560689-97ccf543b3a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&dpr=1&auto=format%2Ccompress&fit=crop&w=2599&h=594)"
          }}
        ></div>
        <div className="search-form">
          <Header />
          <SearchForm onSearchPhoto={onSearchPhoto} />
        </div>
      </div>
      <Sentence stats={photosData.total} query={query} />
      <Suspense fallback={<Spinner />}>
        <div className="app-gallery">
          <Photos photos={photosArray.slice(1, 16)} />
          {/* <button className="button">Load more</button> */}
        </div>
      </Suspense>
    </div>
  );
};

export default App;

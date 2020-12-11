import React, { useState, useEffect, Suspense, lazy } from "react";
import { createApi } from "unsplash-js";

import "./App.scss";
import Spinner from "./components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import Sentence from "./components/Sentence";
const Photos = lazy(() => import("./components/Photos"));

const unsplash = createApi({
  accessKey: "8ba7daec662eb3e3f18f31a571b61faece5beb250fe546925e79e21ca827672f"
});

const cache = JSON.parse(localStorage.getItem("cache")) || {};
localStorage.clear();

const App = () => {
  const [query, setQuery] = useState("funny");
  const [photosData, setPhotosData] = useState([]);
  const [loaded, setIsLoaded] = React.useState(false);
  const [page, setPage] = useState(1);

  const onSearchPhoto = (searchTerms) => {
    setQuery(searchTerms);
  };

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
            per_page: 13
          })
          .then((result) => {
            const results = result.response.results;
            setPhotosData(results);
            setIsLoaded(true);
            cache[query] = cache[query] ? cache[query] : {};
            cache[query][page] = results;
            localStorage.setItem("cache", JSON.stringify(cache));
          });
      } catch (err) {
        console.error(err);
      }
    }
  };

  // const getMorePhotos = (count = 13, page = 1) => {
  //   unsplash.search
  //     .getPhotos({
  //       query: query,
  //       page: page,
  //       per_page: count,
  //     })
  //     .then((result) => {
  //       const results = result.response.results;
  //       setPhotosData(results);
  //       setIsLoaded(true);
  //       let pg = page;
  //       pg++;
  //       setPage(pg);
  //     });
  // };

  useEffect(() => {
    fetchPhotos();
  }, [query, page]);

  console.log(photosData);
  return (
    <div className="app">
      <div className="app-header">
        <div
          className="header-bg"
          style={{
            backgroundImage: photosData.length
              ? `url(${photosData[0].urls.regular})`
              : "url(https://images.unsplash.com/photo-1604030560689-97ccf543b3a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&dpr=1&auto=format%2Ccompress&fit=crop&w=2599&h=594)"
          }}
        ></div>
        <div className="search-form">
          <Header />
          <SearchForm onSearchPhoto={onSearchPhoto} />
        </div>
      </div>
      <Sentence stats="123" query={query} />
      <Suspense fallback={<Spinner />}>
        <div className="app-gallery">
          <InfiniteScroll
            dataLength={photosData.length}
            //next={() => setPage(page => page + 1)}
            // next={() => getMorePhotos(13, page + 1)}
            hasMore={true}
          >
            {loaded ? <Photos photos={photosData.slice(1, 13)} /> : ""}
          </InfiniteScroll>
          {/* <Photos photos={photosData.slice(1, 13)} /> */}
          {/* <button className="button">Load more</button> */}
        </div>
      </Suspense>
    </div>
  );
};

export default App;

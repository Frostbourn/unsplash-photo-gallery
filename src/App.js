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

const App = () => {
  const [query, setQuery] = useState("funny");
  const [photosData, setPhotosData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState("");

  const onSearchPhoto = (searchTerms) => {
    setQuery(searchTerms);
  };

  const getMorePhotos = (count = 9, page) => {
    unsplash.search
      .getPhotos({
        query: query,
        page: page,
        per_page: count
      })
      .then((result) => {
        const results = result.response.results;
        setPhotosData([...photosData, ...results]);
        setLoading(true);
        let nextPage = page;
        nextPage++;
        setPage(nextPage);
      });
  };

  useEffect(() => {
    unsplash.search
      .getPhotos({
        query: query,
        page: 1,
        per_page: 9
      })
      .then((result) => {
        const results = result.response;
        setPhotosData(results.results);
        setTotal(results.total);
        setLoading(true);
      });
  }, [query]);

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
      <Sentence stats={total} query={query} />
      <Suspense fallback={<Spinner />}>
        <div className="app-gallery">
          <InfiniteScroll
            dataLength={photosData.length}
            next={() => getMorePhotos(9, page + 1)}
            hasMore={true}
            scrollThreshold={1}
          >
            {isLoading ? <Photos photos={photosData.slice(1)} /> : ""}
          </InfiniteScroll>
        </div>
      </Suspense>
    </div>
  );
};

export default App;

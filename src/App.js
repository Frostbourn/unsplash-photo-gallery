/* Contact: https://jakubskowronski.com */

import React, { useState, useEffect, Suspense, lazy } from "react";
import { unsplash } from "./api";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from "react-scroll-to-top";

import Spinner from "./components/Spinner";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import Sentence from "./components/Sentence";
const Photos = lazy(() => import("./components/Photos"));

import "./App.scss";

const App = () => {
  const [query, setQuery] = useState("Travel");
  const [photos, setPhotos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState("");
  const [backgroundPhoto, setBackgroundPhoto] = useState(
    "https://images.unsplash.com/photo-1604030560689-97ccf543b3a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&dpr=1&auto=format%2Ccompress&fit=crop&w=2599&h=594"
  );
  const perPage = 9;

  const onSearchPhoto = (searchTerms) => {
    setQuery(searchTerms);
    setPhotos([]);
  };

  const getMorePhotos = async (page) => {
    try {
      await unsplash.search
        .getPhotos({
          query: query,
          page: page,
          per_page: perPage
        })
        .then((result) => {
          setTotal(result.response.total);
          setPage(page);
          photos.length
            ? setPhotos([...photos, ...result.response.results])
            : setPhotos(result.response.results);
          setBackgroundPhoto(result.response.results[0].urls.regular);
        });
    } catch (err) {
      console.log("Unable to retrieve photos. Reason: " + err);
    }
  };

  useEffect(() => {
    setPage(1);
    getMorePhotos(1);
  }, [query]);

  return (
    <div className="app">
      <div className="app-header">
        <div
          className="header-bg"
          style={{
            backgroundImage: `url(${backgroundPhoto})`
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
            dataLength={photos.length}
            next={() => getMorePhotos(page + 1)}
            hasMore={isLoading}
          >
            {" "}
            {isLoading ? (
              <>
                <Photos photos={photos.slice(1)} />
                {photos.length === total ? (
                  <p style={{ textAlign: "center", padding: "50px" }}>
                    <b>Yay! You have seen it all...</b>
                  </p>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </InfiniteScroll>
        </div>
      </Suspense>
      <ScrollToTop smooth viewBox="0 0 24 24" svgPath="M18 15l-6-6-6 6" />
    </div>
  );
};

export default App;

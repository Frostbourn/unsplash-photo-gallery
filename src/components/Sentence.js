import React from "react";

const Sentence = ({ stats, query }) => {
  return (
    <>
      <div className="app-sentence">
        <svg
          width="32"
          height="32"
          className="_1Ig-9"
          version="1.1"
          viewBox="0 0 32 32"
          aria-hidden="false"
        >
          <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
        </svg>
        {stats === 0 ? (
          <p>
            Sorry there are no results for <b className="query">{query}</b>, try
            again!
          </p>
        ) : (
          <p className="gallery-stats">
            Currently showing <b>{stats}</b> results for:
            <b className="query"> {query}</b>
          </p>
        )}
      </div>
    </>
  );
};

export default Sentence;

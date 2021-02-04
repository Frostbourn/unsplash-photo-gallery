import React, { useState, useRef, useEffect } from "react";
import Suggestions from "./Suggestions";

const SearchForm = ({ onSearchPhoto }) => {
  const mostSearched = [
    "Wallpapers",
    "Nature",
    "Architecture",
    "Fashion",
    "Film",
    "Animals"
  ];

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const ref = useRef();

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      onSearchPhoto(search);
      setSearch("");
      setSuggestions("");
      setShowSuggestions(false);
    }
  };

  const fetchSuggestions = () => {
    fetch(`https://api.datamuse.com/sug?s=${search}`)
      .then((response) => response.json())
      .then((data) => {
        const suggestionsArray = data;
        // console.log(data);
        setSuggestions({
          suggestions: suggestionsArray
        });
      });
  };

  const onInputChange = (e) => {
    let search = e.target.value;
    setSearch(search);
    if (search.length > 2) {
      fetchSuggestions(search);
    }
  };

  const onInputClick = () => {
    setShowSuggestions(true);
  };

  const onSuggestionClick = (e) => {
    onSearchPhoto(e);
    setSearch("");
    setSuggestions("");
    setShowSuggestions(false);
  };

  const handleOutsideClick = (e) => {
    if (ref.current.contains(e.target)) {
      return;
    }
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (showSuggestions) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSuggestions]);

  return (
    <form ref={ref} onSubmit={onSubmitForm} className="form__search">
      <label className="search__label">
        <span className="search__icon"></span>
        <input
          id="query"
          className="search__input"
          type="text"
          placeholder="Search free high-resolution photos"
          onChange={onInputChange}
          onClick={(e) => onInputClick(!showSuggestions)}
          value={search}
        />
      </label>
      {showSuggestions ? (
        <Suggestions
          suggestions={suggestions}
          onClick={(e) => onSuggestionClick(e)}
        />
      ) : (
        <div className="search__tags">
          {mostSearched.map((suggestion, index) => {
            return (
              <span
                key={index}
                className="tag"
                onClick={() => onSuggestionClick(suggestion)}
              >
                {suggestion}
              </span>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default SearchForm;

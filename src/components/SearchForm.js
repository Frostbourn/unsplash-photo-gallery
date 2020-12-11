import React, { useState, useRef, useEffect } from "react";
import Suggestions from "./Suggestions";

const SearchForm = ({ onSearchPhoto }) => {
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

  const onSuggestionClick = () => {
    onSearchPhoto(search);
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
    <form ref={ref} onSubmit={onSubmitForm}>
      <input
        id="query"
        type="text"
        placeholder="Search free high-resolution photos"
        onChange={onInputChange}
        onClick={(e) => onInputClick(!showSuggestions)}
        value={search}
      />
      {showSuggestions && (
        <Suggestions
          suggestions={suggestions}
          onClick={(e) => onSuggestionClick(e)}
        />
      )}
    </form>
  );
};

export default SearchForm;

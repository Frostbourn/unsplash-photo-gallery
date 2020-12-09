import React, { useState } from "react";

export function SearchForm({ onSearchPhoto }) {
  const myRef = React.createRef();

  const [search, setSearch] = useState("");

  onSubmitForm = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      onSearchPhoto(search);
      setSearch("");
    }
  };

  handleClickOutside = (e) => {
    if (this.myRef.current && !this.myRef.current.contains(e.target)) {
      this.setState({
        showSuggestions: false
      });
    }
  };
  handleInputClick = (e) => {
    this.setState((state) => {
      return {
        showSuggestions: !state.showSuggestions
      };
    });
    if (e.key === "Enter") {
      this.getImages();
    }
  };

  return (
    <>
      <div ref={this.myRef}>
        <input
          id="query"
          type="text"
          // onChange={this.onInputChange}
          value={search}
          // onKeyPress={this.handleInputClick}
          // onClick={this.handleInputClick}
        />
        {/* {this.state.showSuggestions && this.renderSuggestions()} */}
      </div>
    </>
  );
}

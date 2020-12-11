import React from "react";

const Suggestions = ({ suggestions, onClick }) => {
  const handleChange = (selectedValue) => {
    onClick(selectedValue);
  };

  let suggestionsArray = suggestions.suggestions;
  const autocomplete =
    suggestionsArray &&
    !!suggestionsArray.length &&
    suggestionsArray.map((suggestion, index) => {
      return (
        <li key={index} onClick={() => handleChange(suggestion.word)}>
          <a href="#top">{suggestion.word}</a>
        </li>
      );
    });

  return (
    <>
      <ul>
        {autocomplete}
        {suggestionsArray ? (
          <li style={{ fontStyle: "italic", fontWeight: "bold" }}>
            Suggestions: {Object.keys(suggestionsArray).length}
          </li>
        ) : (
          <li style={{ fontStyle: "italic", fontWeight: "bold" }}>
            No suggestions
          </li>
        )}
      </ul>
    </>
  );
};

export default Suggestions;

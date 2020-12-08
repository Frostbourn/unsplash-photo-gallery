import React from "react";

export function Header() {
  return (
    <>
      <div className="app-header">
        <div className="search-form">
          <p className="logo">Unsplash</p>
          <p className="sub-logo">
            The internet’s source of <a href="#top">freely-usable images</a>.{" "}
            <br />
            Powered by creators everywhere.
          </p>
        </div>
      </div>
    </>
  );
}

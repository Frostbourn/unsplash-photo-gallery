import React from "react";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import "./App.scss";

export default class AutoCompletedText extends React.Component {
  myRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
      results: [],
      showSuggestions: false
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("keydown", this.handleInputClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("keydown", this.handleInputClick);
  }

  getImages = () => {
    let { text } = this.state;
    fetch(
      `https://api.unsplash.com/search/photos?per_page=30&client_id=8ba7daec662eb3e3f18f31a571b61faece5beb250fe546925e79e21ca827672f&query=${text}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          results: data.results
        });
      });
  };

  getSuggestions = async () => {
    let { text } = this.state;
    fetch(`https://api.datamuse.com/sug?s=${text}&max=6`)
      .then((response) => response.json())
      .then((data) => {
        const suggestionsArray = [].concat(...data);
        this.setState({
          suggestions: suggestionsArray
        });
      });
  };

  onInputChange = (e) => {
    const value = e.target.value;
    let suggestions = [e.target.suggestions];
    if (value.length > 2) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = suggestions.sort().filter((v) => regex.test(v));
      this.getSuggestions();
    }
    this.setState(() => ({
      suggestions,
      text: value
    }));
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

  selectedText(value) {
    this.setState(() => ({ text: value }), this.getImages);
  }

  renderSuggestions = () => {
    let { suggestions } = this.state;
    if (suggestions.length < 2) {
      return (
        <>
          <ul>
            <li style={{ fontStyle: "italic", fontWeight: "bold" }}>
              No suggestions
            </li>
          </ul>
        </>
      );
    } else if (suggestions.length > 2) {
      return (
        <>
          <ul>
            {suggestions.map((item, index) => (
              <li key={index} onClick={() => this.selectedText(item.word)}>
                <a href="#top">{item.word}</a>
              </li>
            ))}
            <li style={{ fontStyle: "italic", fontWeight: "bold" }}>
              Suggestions: {suggestions.length}
            </li>
          </ul>
        </>
      );
    }
  };

  render() {
    const { text, results } = this.state;

    const lightboxOptions = {
      settings: {
        disableKeyboardControls: true,
        disableWheelControls: true
      },
      buttons: {
        showAutoplayButton: false,
        showDownloadButton: false,
        showFullscreenButton: false,
        showThumbnailsButton: false
      },
      thumbnails: {
        showThumbnails: false
      }
    };

    return (
      <div className="app">
        <header className="app-header">
          <div className="search-form">
            <p className="logo">Unsplash</p>
            <p className="sub-logo">
              The internet’s source of <a href="#top">freely-usable images</a>.{" "}
              <br />
              Powered by creators everywhere.
            </p>
            <div ref={this.myRef}>
              <input
                id="query"
                type="text"
                onChange={this.onInputChange}
                value={text}
                onKeyPress={this.handleInputClick}
                onClick={this.handleInputClick}
              />
              {this.state.showSuggestions && this.renderSuggestions()}
            </div>
          </div>
        </header>
        <SimpleReactLightbox>
          <SRLWrapper options={lightboxOptions}>
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
              <br />
              <p>Make something awesome</p>
            </div>
            <main className="app-gallery">
              {results.map((item) => {
                return (
                  <div key={item.id} className="item">
                    <img
                      src={item.urls.regular}
                      alt={"Author: " + item.user.name}
                    />
                    <div className="item-caption">
                      <p className="item-likes">
                        <span role="img" aria-label="heart emoji">
                          ❤️
                        </span>{" "}
                        {item.likes}
                      </p>
                      <a
                        href={item.links.download}
                        className="item-button"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                );
              })}
            </main>
          </SRLWrapper>
        </SimpleReactLightbox>
      </div>
    );
  }
}

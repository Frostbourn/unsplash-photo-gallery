import React from "react";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import "./App.scss";

export default class AutoCompletedText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
      results: []
    };
    this.showSuggestions = React.createRef();
  }

  onTextChange = (e) => {
    const value = e.target.value;
    let suggestions = [e.target.suggestions];
    if (value.length > 1) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = suggestions.sort().filter((v) => regex.test(v));
      this.getSuggestions();
    }

    this.setState(() => ({
      suggestions,
      text: value
    }));
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.getImages();
      // this.getSuggestions();
    }
  };

  handleClickOutside = (e) => {
    if (
      this.showSuggestions &&
      !this.showSuggestions.current.contains(e.target)
    ) {
      this.close();
    }
  };

  selectedText(value) {
    this.setState(() => ({ text: value }), this.getImages);
  }

  getImages = () => {
    let { text } = this.state;
    fetch(
      `https://api.unsplash.com/search/photos?client_id=8ba7daec662eb3e3f18f31a571b61faece5beb250fe546925e79e21ca827672f&query=${text}`
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
    fetch(
      await `https://wordsapiv1.p.rapidapi.com/words/${text}/hasTypes?rapidapi-key=1a4baacd9cmsh2cf61313120ea95p12d8efjsn0e2f0943092d`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          suggestions: data.hasTypes.splice(1, 10)
        });
      });
  };

  renderSuggestions = () => {
    let { suggestions } = this.state;
    console.log(suggestions);
    if (suggestions === undefined && suggestions.length) {
      return null;
    } else if (suggestions.length > 0) {
      return (
        <>
          <ul>
            {suggestions.map((item, index) => (
              <li key={index}>
                <a onClick={() => this.selectedText(item)}>{item} </a>
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

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    const { text, suggestions, results } = this.state;
    const lightboxOptions = {
      settings: {
        disableKeyboardControls: false,
        disableWheelControls: false
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
              The internet’s source of <a href="#">freely-usable images</a>.{" "}
              <br />
              Powered by creators everywhere.
            </p>
            <div ref={this.showSuggestions}>
              <input
                id="query"
                type="text"
                onChange={this.onTextChange}
                value={text}
                onKeyPress={this.handleKeyPress}
              />
              {this.renderSuggestions()}
            </div>
          </div>
        </header>
        <SimpleReactLightbox>
          <SRLWrapper options={lightboxOptions}>
            <div className="app-gallery">
              {results.map((item) => {
                return (
                  <div key={item.id} className="item">
                    <img
                      src={item.urls.regular}
                      alt={"Author: " + item.user.name + ", ❤️ " + item.likes}
                    />
                    {/* <p class="title">{description}</p> */}
                  </div>
                );
              })}
            </div>
          </SRLWrapper>
        </SimpleReactLightbox>
      </div>
    );
  }
}

import React from "react";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import Masonry from "react-masonry-css";

const lightboxOptions = {
  settings: {
    // disableKeyboardControls: true,
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

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  600: 1
};

const Photos = ({ photos }) => {
  const gallery =
    photos &&
    !!photos.length &&
    photos.map((photo, index) => {
      return (
        <div key={index} className="item">
          <img src={photo.urls.regular} alt={"Author: " + photo.user.name} />
          <div className="item-caption">
            <div className="profile-links">
              <p className="item-likes">
                <span role="img" aria-label="heart emoji">
                  ❤️
                </span>{" "}
                {photo.likes}
              </p>
            </div>
            <div className="profile-details">
              <a
                href={photo.user.links.html}
                className="picture"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={photo.user.profile_image.small}
                  alt={photo.user.username}
                />
                {photo.user.name}
              </a>
              <a
                href={photo.links.download + "?force=true"}
                className="download-button"
                target="_self"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      );
    });
  let content = gallery.length && gallery;

  return (
    <SimpleReactLightbox>
      <SRLWrapper options={lightboxOptions}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="grid-column"
        >
          {content}
        </Masonry>
      </SRLWrapper>
    </SimpleReactLightbox>
  );
};

export default Photos;

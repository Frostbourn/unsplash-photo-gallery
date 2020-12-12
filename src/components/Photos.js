import React from "react";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import Masonry from "react-masonry-css";

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
          <img src={photo.urls.small} alt={"Author: " + photo.user.name} />
          <div className="item-caption">
            <p className="item-likes">
              <span role="img" aria-label="heart emoji">
                ❤️
              </span>{" "}
              {photo.likes}
            </p>
            <a
              href={photo.links.download}
              className="item-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
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

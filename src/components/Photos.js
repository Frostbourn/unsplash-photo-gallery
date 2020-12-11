import React from "react";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";

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

const Photos = ({ photos }) => {
  console.log(photos);
  const gallery =
    photos &&
    !!photos.length &&
    photos.map((photo) => {
      return (
        <div key={photo.id} className="item">
          <img src={photo.urls.regular} alt={"Author: " + photo.user.name} />
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
              rel="noreferrer"
            >
              Download
            </a>
          </div>
        </div>
      );
    });
  let content = gallery.length ? (
    gallery
  ) : (
    <p>Sorry there are no results, try again!</p>
  );
  return (
    <SimpleReactLightbox>
      <SRLWrapper options={lightboxOptions}>{content}</SRLWrapper>
    </SimpleReactLightbox>
  );

  // photos.map((photo) => (
  //   <div
  //     key={photo.id}
  //     className="photo column is-one-quarter-tablet is-half-mobile"
  //   >
  //     <div className="img-container">
  //       <img
  //         src={photo.urls.small}
  //         alt={photo.alt_description}
  //         className="image image-small"
  //         data-src={photo.urls.regular}
  //       />
  //       <div className="img-content">
  //         <div className="subtitle">
  //           <a href={photo.links.html} target="_blank">
  //             {photo.user.name}
  //           </a>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // ));
  // let content = rows.length ? (
  //   rows
  // ) : (
  //   <div className="column">
  //     <p className="content no-content">
  //       Sorry there are no results, try again!
  //     </p>
  //   </div>
  // );
  // return (
  //   <div className="column no-padding">
  //     <div className="columns is-multiline is-mobile"></div>
  //     <Suspense fallback={<div>Loading...</div>}></Suspense>
  //   </div>
  // );
};

export default Photos;

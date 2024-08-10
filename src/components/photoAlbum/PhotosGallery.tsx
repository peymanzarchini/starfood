import { useState } from "react";

import PhotoAlbum from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import photos from "./photos";

const PhotosGallery = () => {
  const [index, setIndex] = useState(-1);

  return (
    <section className="w-[100%] pt-52">
      <h1 className="mb-5 text-2xl font-bold text-starfood-colorText">Photo Gallery</h1>
      <div className="max-w-[1500px]">
        <PhotoAlbum
          photos={photos}
          layout="rows"
          targetRowHeight={150}
          onClick={({ index }) => setIndex(index)}
        />
        <Lightbox
          slides={photos}
          styles={Fullscreen as any}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          // enable optional lightbox plugins
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
      </div>
    </section>
  );
};

export default PhotosGallery;

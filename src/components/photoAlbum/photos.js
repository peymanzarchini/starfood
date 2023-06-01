import burger1 from "../../assets/images/burger1.jpg";
import burger2 from "../../assets/images/burger2.jpg";
import burger3 from "../../assets/images/burger3.jpg";
import burger4 from "../../assets/images/burger4.jpg";
import burger5 from "../../assets/images/burger5.jpg";
import burger6 from "../../assets/images/burger6.jpg";

import pizza1 from "../../assets/images/pizza1.jpg";
import pizza2 from "../../assets/images/pizza2.jpg";
import pizza3 from "../../assets/images/pizza3.jpg";
import pizza4 from "../../assets/images/pizza4.jpg";
import pizza5 from "../../assets/images/pizza5.jpg";
import pizza6 from "../../assets/images/pizza6.jpg";

const breakpoints = [3840, 2400, 240, 640, 38420056, 128, 96, 64, 48];

const productsPhotos = [
  { id: burger1, width: 240, height: 200 },
  { id: burger2, width: 240, height: 200 },
  { id: burger3, width: 240, height: 200 },
  { id: burger4, width: 240, height: 200 },
  { id: burger5, width: 240, height: 200 },
  { id: burger6, width: 240, height: 200 },
  { id: pizza1, width: 240, height: 200 },
  { id: pizza2, width: 240, height: 200 },
  { id: pizza3, width: 240, height: 200 },
  { id: pizza4, width: 240, height: 200 },
  { id: pizza5, width: 240, height: 200 },
  { id: pizza6, width: 240, height: 200 },
];

const photos = productsPhotos.map((photo) => {
  const width = breakpoints[0];
  const height = (photo.height / photo.width) * width;

  return {
    src: photo.id,
    width,
    height,
    srcSet: breakpoints.map((breakpoint) => {
      const height = Math.round((photo.height / photo.width) * breakpoint);
      return {
        src: photo.id,
        width: breakpoint,
        height,
      };
    }),
  };
});

export default photos;

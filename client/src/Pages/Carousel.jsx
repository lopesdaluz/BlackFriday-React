import React from "react";
import defaultImage from "../../src/assets/default.jpg";
import "../Styles/Carousel.css";

const CarouselComponent = ({ artItems }) => {
  return (
    <div className="carousel-container">
      <div className="carousel-inner">
        {artItems.map((item, index) => {
          // Check if it's an art item (Met API) or a home image (Pexels API)
          const imageUrl =
            item.primaryImage || item.src?.medium || defaultImage;
          const title = item.title || item.photographer || "Untitled";
          const artist =
            item.artistDisplayName || item.photographer || "Unknown Artist";

          return (
            <div
              key={item.objectID || item.id || index}
              className="carousel-item"
            >
              <img src={imageUrl} alt={title} />
              <h3>{title}</h3>
              <p>{artist}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarouselComponent;

// import React from "react";
// import defaultImage from "../../src/assets/default.jpg";
// import "../Styles/Carousel.css";

// const CarouselComponent = ({ artItems }) => {
//   return (
//     <div className="carousel-container">
//       <div className="carousel-inner">
//         {artItems.map((item) => (
//           <div key={item.objectID} className="carousel-item">
//             <img src={item.primaryImage || defaultImage} alt={item.title} />
//             <h3>{item.title}</h3>
//             <p>{item.artistDisplayName || "Unknown Artist"}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CarouselComponent;

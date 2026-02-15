// import React, { useState, useEffect } from "react";
// import Skeleton from "react-loading-skeleton";
//
// const ImageComponent = ({
//   imageName,
//   className = "",
//   altName,
//   skeletonHeight,
// }) => {
//   const [imageSrc, setImageSrc] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//
//   useEffect(() => {
//     if (imageName) {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       const imageUrl = `${apiUrl.replace("/api", "")}/uploads/${imageName}`;
//       setImageSrc(imageUrl);
//     }
//   }, [imageName]);
//
//   return (
//     <div>
//       {isLoading && <Skeleton height={skeletonHeight} width={"100%"} />}
//       {imageSrc && (
//         <img
//           src={imageSrc}
//           alt={altName}
//
//           className={className}
//           style={{ display: isLoading ? "none" : "block" }}
//           onLoad={() => setIsLoading(false)}
//           onError={() => {
//             setIsLoading(false);
//             setImageSrc(); // or keep blank
//           }}
//         />
//       )}
//     </div>
//   );
// };
//
// export default ImageComponent;


import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const NO_IMAGE =
  "https://via.placeholder.com/400x300?text=No+Image+Found";
// You can replace with your own asset

const ImageComponent = ({
                          imageName,
                          className = "",
                          altName = "Image",
                          skeletonHeight = 200,
                          width = "100%",
                          height = 200,
                        }) => {
  const [imageSrc, setImageSrc] = useState(NO_IMAGE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (imageName) {
      const imageUrl = `${apiUrl.replace("/api", "")}/uploads/${imageName}`;
      setImageSrc(imageUrl);
    } else {
      setImageSrc(NO_IMAGE);
    }

    setIsLoading(true);
  }, [imageName]);

  return (
    <div
      style={{
        width,
        height,
        overflow: "hidden",
        position: "relative",
      }}
      className="bg-gray-100 rounded"
    >
      {isLoading && (
        <Skeleton height={height} width={width} />
      )}

      <img
        src={imageSrc}
        alt={altName}
        className={className}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: isLoading ? "none" : "block",
        }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setImageSrc(NO_IMAGE);
        }}
      />
    </div>
  );
};

export default ImageComponent;

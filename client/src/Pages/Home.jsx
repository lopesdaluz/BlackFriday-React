import React, { useEffect, useState } from "react";
import "../Styles/Home.css";
// import defaultImage from "../../src/assets/default.jpg";
import CategoryComponent from "./Category";
import CarouselComponent from "./Carousel";

export function Home() {
  const [categories, setCategories] = useState({
    Home: [],
    art: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [homeSearchQuery, setHomeSearchQuery] = useState("");
  const [artSearchQuery, setArtSearchQuery] = useState("");

  const handleSearchChange = (event, category) => {
    if (category === "Home") {
      setHomeSearchQuery(event.target.value);
    } else if (category === "art") {
      setArtSearchQuery(event.target.value);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    if (category === "art") {
      fetchArtItems();
    } else if (category === "Home") {
      fetchHomeImages();
    }
  };

  useEffect(() => {
    if (homeSearchQuery.trim()) {
      fetchHomeImages();
    }
    if (artSearchQuery.trim()) {
      fetchArtItems();
    }
  }, [homeSearchQuery, artSearchQuery]);

  const fetchArtItems = async () => {
    setLoading(true); // Start loading
    setError(null); // Clear previous errors

    try {
      console.log("Fetching departments...");
      const departmentsResponse = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/departments"
      );
      const departments = await departmentsResponse.json();
      console.log("Departments fetched:", departments);

      const artDepartment = departments.departments.find(
        (dept) => dept.displayName === "Modern Art"
      );
      console.log("Art Department found:", artDepartment);

      if (artDepartment) {
        const departmentId = artDepartment.departmentId;

        console.log("Fetching objects in department:", departmentId);
        const objectsResponse = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`
        );
        const objects = await objectsResponse.json();
        console.log("Objects fetched:", objects);

        // Filter art items by search query
        const filteredArtItems = objects.objectIDs
          .slice(0, 10)
          .map(async (objectId) => {
            const objectResponse = await fetch(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
            );
            const item = await objectResponse.json();
            return item;
          });
        const artItems = await Promise.all(filteredArtItems);
        // Filter only when there's a search query and trim any extra spaces
        const searchedArtItems = artItems.filter((item) =>
          artSearchQuery.trim() !== ""
            ? item.title.toLowerCase().includes(artSearchQuery.toLowerCase())
            : true
        );

        setCategories((prevCategories) => ({
          ...prevCategories,
          art: searchedArtItems,
        }));
      }
    } catch (err) {
      console.error("Error fetching art items:", err);
      setError("Failed to fetch art items. Please try again.");
    } finally {
      setLoading(false); // Stop loading once data is fetched or error occurs
    }
  };

  const fetchHomeImages = async () => {
    setLoading(true); // Start loading
    setError(null); // Clear previous errors

    try {
      const response = await fetch(
        "https://api.pexels.com/v1/search?query=interior&per_page=10",
        {
          headers: {
            Authorization:
              "Cp6TvCuMwVTNsisa0nQRBUUrNEAvKWDcGQllvqj5u971PeeUn1jcgKNM",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch home images");
      }
      const data = await response.json();
      console.log("Home images fetched:", data);

      // Filter home items by search query
      const filteredHomeItems = data.photos.filter(
        (photo) =>
          photo.photographer
            .toLowerCase()
            .includes(homeSearchQuery.toLowerCase()) // Use homeSearchQuery for filtering
      );

      setCategories((prevCategories) => ({
        ...prevCategories,
        Home: filteredHomeItems,
      }));
    } catch (err) {
      console.error("Error fetching home images:", err);
      setError("Failed to fetch home images. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Choose a category and create or find deals</h1>

      {Object.keys(categories).map((category) => (
        <CategoryComponent
          key={category}
          category={category}
          onClick={() => handleCategoryClick(category)}
          searchQuery={category === "Home" ? homeSearchQuery : artSearchQuery}
          handleSearchChange={(event) => handleSearchChange(event, category)}
        />
      ))}

      {selectedCategory && (
        <CarouselComponent artItems={categories[selectedCategory]} />
      )}
    </div>
  );
}

//   return (
//     <div>
//       <h1>Choose a category and create or find deals</h1>

//       {/* Art Category */}
//       <section>
//         <h2>Art Pieces</h2>
//         <div className="category-grid">
//           {loading ? (
//             <p>Loading art pieces...</p>
//           ) : error ? (
//             <p>{error}</p>
//           ) : categories.art.length > 0 ? (
//             categories.art.map((item) => (
//               <div key={item.objectID} className="card">
//                 <img
//                   src={item.primaryImage || defaultImage}
//                   alt={item.title || "Art Piece"}
//                 />
//                 <h3>{item.title}</h3>
//                 <p>{item.artistDisplayName || "Unknown Artist"}</p>
//               </div>
//             ))
//           ) : (
//             <p>No art pieces available</p>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }

//why am i only sending in the prop artitem in carousel component
//why am i rendering artItem if selectdCategory is true

import React, { useEffect, useState } from "react";

export function Home() {
  const [categories, setCategories] = useState({
    Home: [],
    art: [],
  });

  const fetchArtItems = async () => {
    try {
      const departmentsResponse = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/departments"
      );
      const departments = await departmentsResponse.json();

      const artDepartment = departments.departments.find(
        (dept) => dept.displayName === "Modern and Contemporary Art"
      );
      if (artDepartment) {
        const departmentId = artDepartment.departmentId;

        const objectsResponse = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`
        );
        const objects = await objectsResponse.json();

        const artItems = await Promise.all(
          objects.objectIDs.slice(0, 10).map(async (objectId) => {
            const objectResponse = await fetch(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
            );
            return objectResponse.json();
          })
        );
        setCategories({
          ...categories,
          art: artItems,
        });
      }
    } catch (err) {
      console.error("Error fetching art items:", err);
    }
  };

  useEffect(() => {
    fetchArtItems();
  }, [fetchArtItems]); // Add fetchArtItems to the dependency array

  return (
    <div>
      <h1>Choose a categorie and create or find deals</h1>

      {/* Art Category */}
      <section>
        <h2>Art Pieces</h2>
        <div className="category-grid">
          {categories.art.length > 0 ? (
            categories.art.map((item) => (
              <div key={item.objectID} className="card">
                <img
                  src={item.primaryImage || "https://via.placeholder.com/150"}
                  alt={item.title || "Art Piece"}
                />
                <h3>{item.title}</h3>
                <p>{item.artistDisplayName || "Unknown Artist"}</p>
              </div>
            ))
          ) : (
            <p>Loading art pieces...</p>
          )}
        </div>
      </section>
    </div>
  );
}

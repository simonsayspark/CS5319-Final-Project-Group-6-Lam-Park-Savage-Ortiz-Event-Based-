// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import { Link, useParams } from "react-router-dom";
// import "../App.scss";
// import NewNav from "../Component/NewNav";
// import FooterComponent from "../Component/FooterComponent";

// const CategoryTemplate = () => {
//   const { categoryName, subcategoryName } = useParams();
//   const [categoryData, setCategoryData] = useState(null);
//   const [navData, setNavData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`https://json-server-vercel-tan-rho.vercel.app/categories`)
//       .then((response) => response.json())
//       .then((data) => {
//         setNavData(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (categoryName && navData.length > 0) {
//       const formattedCategoryName = categoryName
//         .replace(/-/g, " ")
//         .toLowerCase();
//       const category = navData.find(
//         (cat) => cat.name.toLowerCase() === formattedCategoryName
//       );

//       if (category) {
//         if (subcategoryName) {
//           const formattedSubcategoryName = subcategoryName
//             .replace(/-/g, " ")
//             .toLowerCase();
//           const subcategory = category.subcategories.find(
//             (subcat) => subcat.name.toLowerCase() === formattedSubcategoryName
//           );

//           if (subcategory) {
//             setCategoryData({ ...category, currentSubcategory: subcategory });
//           } else {
//             console.error(`Subcategory not found: ${subcategoryName}`);
//             setCategoryData(category);
//           }
//         } else {
//           setCategoryData(category);
//         }
//       } else {
//         console.error(`Category not found: ${categoryName}`);
//       }
//     } else {
//       setCategoryData(null);
//     }
//   }, [categoryName, subcategoryName, navData]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!categoryData) {
//     return <div>Category not found </div>;
//   }

//   const renderCategoryTemplate = () => (
//     <Container className="mt-5 main-content">
//       <div className="category-box">
//         <div className="main-content">
//           <h1 className="category-title2">{categoryData.name}</h1>
//         </div>
//       </div>

//       <Row className="subcategory-descriptions">
//         {categoryData.subcategories &&
//           categoryData.subcategories.map((subcat, index) => (
//             <Col key={index} className="subcategory-description">
//               <h3>{subcat.name}</h3>
//               <p>{subcat.description}</p>
//             </Col>
//           ))}
//       </Row>
//       <Row>
//         {categoryData.subcategories &&
//           categoryData.subcategories.map(
//             (subcat, index) =>
//               subcat.products &&
//               subcat.products.map((product, productIndex) => {
//                 const productImagePath = `/ProductImages/${categoryName.toUpperCase()}/${subcat.name
//                   .toUpperCase()
//                   .replace(/ /g, "-")}/${product.name
//                   .toUpperCase()
//                   .replace(/ /g, "_")}.jpg`;
//                 return (
//                   <Col
//                     key={`${index}-${productIndex}`}
//                     xs={12}
//                     md={6}
//                     lg={4}
//                     className="mb-4"
//                   >
//                     <Link
//                       to={`/category/${categoryName}/${subcat.name
//                         .toLowerCase()
//                         .replace(/ /g, "-")}/${product.name
//                         .toLowerCase()
//                         .replace(/ /g, "-")}/product`}
//                       style={{ textDecoration: "none", color: "inherit" }}
//                     >
//                       <Card className="product-card">
//                         <Card.Img
//                           variant="top"
//                           src={productImagePath}
//                           alt={product.name}
//                         />
//                         <Card.Body className="product-card-body">
//                           <Card.Title className="product-card-title">
//                             {product.name}
//                           </Card.Title>
//                         </Card.Body>
//                       </Card>
//                     </Link>
//                   </Col>
//                 );
//               })
//           )}
//       </Row>
//     </Container>
//   );

//   const renderSubcategoryTemplate = () => (
//     <Container className="mt-3 ">
//       {categoryData.currentSubcategory ? (
//         <>
//           <Row className="subcategory-descriptions">
//             <Col className="subcategory-description">
//               <h1 className="main-content category-title2">
//                 {categoryData.currentSubcategory.name}
//               </h1>
//               <p>{categoryData.currentSubcategory.description}</p>
//             </Col>
//           </Row>
//           {categoryData.currentSubcategory.image && (
//             <img
//               src={categoryData.currentSubcategory.image}
//               alt={categoryData.currentSubcategory.name}
//               style={{ maxWidth: "100%", borderRadius: "8px" }}
//             />
//           )}
//           <Row>
//             {categoryData.currentSubcategory.products &&
//               categoryData.currentSubcategory.products.map((product, index) => {
//                 const productImagePath = `/ProductImages/${categoryName.toUpperCase()}/${subcategoryName
//                   .toUpperCase()
//                   .replace(/ /g, "_")}/${product.name
//                   .toUpperCase()
//                   .replace(/ /g, "_")}.jpg`;
//                 return (
//                   <Col key={index} xs={12} md={6} lg={4} className="mb-4">
//                     <Link
//                       to={`/category/${categoryName}/${subcategoryName}/${product.name
//                         .toLowerCase()
//                         .replace(/ /g, "-")}/product`}
//                       style={{ textDecoration: "none", color: "inherit" }}
//                     >
//                       <Card className="product-card">
//                         <Card.Img
//                           variant="top"
//                           src={productImagePath}
//                           alt={product.name}
//                         />
//                         <Card.Body className="product-card-body">
//                           <Card.Title className="product-card-title">
//                             {product.name}
//                           </Card.Title>
//                         </Card.Body>
//                       </Card>
//                     </Link>
//                   </Col>
//                 );
//               })}
//           </Row>
//         </>
//       ) : (
//         <div>Subcategory not found</div>
//       )}
//     </Container>
//   );

//   return (
//     <div>
//       <NewNav navData={navData} />

//       {subcategoryName ? renderSubcategoryTemplate() : renderCategoryTemplate()}

//       <FooterComponent />
//     </div>
//   );
// };

// export default CategoryTemplate;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import NewNav from "../Component/NewNav";

const CategoryTemplate = () => {
  const { categoryName, subcategoryName } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [navData, setNavData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch category data
  useEffect(() => {
    fetch(`/api/category`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNavData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Find and format category data
  useEffect(() => {
    if (categoryName && navData.length > 0) {
      const formattedCategoryName = categoryName
        .replace(/-/g, " ")
        .toLowerCase();
      const category = navData.find(
        (cat) =>
          cat.name.toLowerCase().replace(/-/g, "").replace(/ /g, "") ===
          formattedCategoryName.replace(/-/g, "").replace(/ /g, "")
      );

      if (category) {
        if (subcategoryName) {
          const formattedSubcategoryName = subcategoryName
            .replace(/-/g, " ")
            .toLowerCase();
          const animalType = Object.keys(category.subcategory).find(
            (type) => type.toLowerCase() === formattedSubcategoryName
          );

          if (animalType) {
            setCategoryData({ ...category, currentSubcategory: animalType });
          } else {
            console.error(`Subcategory not found: ${subcategoryName}`);
            setCategoryData(category);
          }
        } else {
          setCategoryData(category);
        }
      } else {
        console.error(`Category not found: ${categoryName}`);
      }
    } else {
      setCategoryData(null);
    }
  }, [categoryName, subcategoryName, navData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!categoryData) {
    return <div>Category not found</div>;
  }

  const renderCategoryTemplate = () => (
    <Container className="mt-5 main-content">
      <div className="category-box">
        <div className="main-content">
          <h1 className="category-title2">{categoryData.name}</h1>
        </div>
      </div>

      <Row className="subcategory-descriptions">
        {Object.keys(categoryData.subcategory).map((animalType, index) => (
          <Col key={index} className="subcategory-description">
            <h3>{animalType.charAt(0).toUpperCase() + animalType.slice(1)}</h3>
          </Col>
        ))}
      </Row>

      <Row>
        {Object.keys(categoryData.subcategory).map((animalType, index) =>
          categoryData.subcategory[animalType]?.map((product, productIndex) => {
            const productImagePath = `/ProductImages/${categoryName.toUpperCase()}/${animalType.toUpperCase()}/${product.name
              .toUpperCase()
              .replace(/ /g, "_")}.jpg`;
            return (
              <Col
                key={`${index}-${productIndex}`}
                xs={12}
                md={6}
                lg={4}
                className="mb-4"
              >
                <Link
                  to={`/category/${categoryName}/${animalType.toLowerCase()}/${product.name
                    .toLowerCase()
                    .replace(/ /g, "-")}/product`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card className="product-card">
                    <Card.Img
                      variant="top"
                      src={productImagePath}
                      alt={product.name}
                    />
                    <Card.Body className="product-card-body">
                      <Card.Title className="product-card-title">
                        {product.name}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          })
        )}
      </Row>
    </Container>
  );

  const renderSubcategoryTemplate = () => (
    <Container className="mt-3">
      {categoryData.currentSubcategory ? (
        <>
          <Row className="subcategory-descriptions">
            <Col className="subcategory-description">
              <h1 className="main-content category-title2">
                {categoryData.currentSubcategory.charAt(0).toUpperCase() +
                  categoryData.currentSubcategory.slice(1)}
              </h1>
            </Col>
          </Row>
          <Row>
            {categoryData.subcategory[categoryData.currentSubcategory]?.map(
              (product, index) => {
                const productImagePath = `/ProductImages/${categoryName.toUpperCase()}/${subcategoryName
                  .toUpperCase()
                  .replace(/ /g, "_")}/${product.name
                  .toUpperCase()
                  .replace(/ /g, "_")}.jpg`;
                return (
                  <Col key={index} xs={12} md={6} lg={4} className="mb-4">
                    <Link
                      to={`/category/${categoryName}/${subcategoryName}/${product.name
                        .toLowerCase()
                        .replace(/ /g, "-")}/product`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Card className="product-card">
                        <Card.Img
                          variant="top"
                          src={productImagePath}
                          alt={product.name}
                        />
                        <Card.Body className="product-card-body">
                          <Card.Title className="product-card-title">
                            {product.name}
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                );
              }
            )}
          </Row>
        </>
      ) : (
        <div>Subcategory not found</div>
      )}
    </Container>
  );

  return (
    <div>
      <NewNav navData={navData} />
      {subcategoryName ? renderSubcategoryTemplate() : renderCategoryTemplate()}
    </div>
  );
};

export default CategoryTemplate;

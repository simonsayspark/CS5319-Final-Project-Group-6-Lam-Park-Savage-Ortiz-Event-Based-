import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Table,
  Tabs,
  Tab,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductTabs = () => {
  const { categoryName, subcategoryName, productName } = useParams();
  const [productData, setProductData] = useState(null);
  const [navData, setNavData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState(null);
  const [imageExists, setImageExists] = useState(null);
  const [OpenTabs, setOpenTabs] = useState();

  useEffect(() => {
    fetch(`https://json-server-vercel-tan-rho.vercel.app/categories`)
      .then((response) => response.json())
      .then((data) => {
        setNavData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (categoryName && navData.length > 0) {
      const formattedCategoryName = categoryName
        .replace(/-/g, " ")
        .toLowerCase();
      const category = navData.find(
        (cat) => cat.name.toLowerCase() === formattedCategoryName
      );

      if (category) {
        if (subcategoryName) {
          const formattedSubcategoryName = subcategoryName
            .replace(/-/g, " ")
            .toLowerCase();
          const subcategory = category.subcategories.find(
            (subcat) => subcat.name.toLowerCase() === formattedSubcategoryName
          );

          if (subcategory) {
            setCategoryData({ ...category, currentSubcategory: subcategory });
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

  useEffect(() => {
    fetch(`https://json-server-vercel-tan-rho.vercel.app/categories`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched categories data:", data);
        if (!Array.isArray(data)) {
          throw new Error("Fetched data is not an array");
        }

        let foundProduct = null;

        data.forEach((category, categoryIndex) => {
          if (!category || !Array.isArray(category.subcategories)) {
            console.error(
              `Category at index ${categoryIndex} is invalid or has no subcategories:`,
              category
            );
            return;
          }

          console.log(`Processing category: ${category.name}`);
          category.subcategories.forEach((subcategory, subcategoryIndex) => {
            if (!subcategory || !Array.isArray(subcategory.products)) {
              console.error(
                `Subcategory at index ${subcategoryIndex} in category ${category.name} is invalid or has no products:`,
                subcategory
              );
              return;
            }

            console.log(`Processing subcategory: ${subcategory.name}`);
            console.log(
              `Product name to match: ${productName
                .toLowerCase()
                .replace(/-/g, " ")}`
            );
            console.log(
              `Product names in subcategory: ${subcategory.products.map((p) =>
                p.name.toLowerCase()
              )}`
            );

            const product = subcategory.products.find(
              (prod) =>
                prod.name.toLowerCase().replace(/-/g, " ") ===
                productName.toLowerCase().replace(/-/g, " ")
            );

            console.log(`${categoryName.toUpperCase()}`);
            console.log(`${subcategoryName.toUpperCase()}`);
            console.log(`${productName.toUpperCase()}`);

            if (product) {
              foundProduct = product;
              setProductData(product);
              console.log("Found product:", product);
            }
          });
        });

        if (!foundProduct) {
          console.error("Product not found:", productName);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [productName]);

  if (!productData) {
    return;
  }

  const { name, category, details } = productData;

  return (
    <div className="">
      <Container className="info_Product">
        <Tabs
          defaultActiveKey="Title"
          id="justify-tab-example"
          className="rounded"
          justify
        >
          <Tab
            eventKey="Title"
            title="Especificações"
            ClassName="flex-col justify-center"
          >
            <Table
              striped
              bordered
              hover
              className="justify-center"
              style={{ width: "100%" }}
            >
              <tbody className="">
                {details &&
                  Object.entries(details).map(([key, value], index) => (
                    <tr key={index}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Tab>

          <Tab className="" eventKey="Software" title="Software/Manual"></Tab>

          <Tab eventKey="Proposta" title="Proposta Técnica">
            Tab content for Profile
          </Tab>

          <Tab className="" eventKey="Comparativo" title="Comparativo">
            Tab content for Tabela Comparativa
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default ProductTabs;

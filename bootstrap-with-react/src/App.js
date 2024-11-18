import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Page/LandingPage";
import Contact from "./Page/Contact";
import AboutUs from "./Page/AboutUs";
import CategoryTemplate from "./Page/CategoryTemplate";
import categoriesData from "./CategoriesJSON/productCategory.json";
import ProductTemplate from "./Page/ProductTemplate";
import LoginPage from "./Page/Login";
import RegisterPage from "./Page/Register";
import ShoppingCart from "./Page/ShoppingCart";
import ProfilePage from "./Page/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Contato" element={<Contact />} />
        <Route path="/SobreNos" element={<AboutUs />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Cart" element={<ShoppingCart />} />
        <Route path="/Profile" element={<ProfilePage />} />

        {/* <Route path="/Catalogo" element={<Catalog />} /> */}
        {/* <Route path="/OndeComprar" element={<WhereToBuy />} /> */}
        {/* <Route path="/Servicios/AsistenciaTecnica" element={<Astech />} />
        <Route path="/Servicios/PerguntasFrequentes" element={<Questions />} /> */}
        {/* <Route
          path="/Servicios/LaboratorioDeCalibracao"
          element={<LabCollab />}
        /> */}
        {/* <Route
          path="/Servicios/LocacaoInstrumentos"
          element={<LocacaoInstrumentos />}
        /> */}

        {/* <Route
          path="/Servicios/RedeDeAutorizadas"
          element={<AuthorizedDealers />}
        /> */}
        {/* <Route path="/Produtos" element={<ProductsPage />} /> */}
        {categoriesData.map((category) => (
          <React.Fragment key={category.id}>
            <Route
              path={`/category/:categoryName`}
              element={<CategoryTemplate />}
            />
            {category.subcategories &&
              category.subcategories.map((subcategory) => (
                <Route
                  key={subcategory.id}
                  path={`/category/:categoryName/:subcategoryName`}
                  element={<CategoryTemplate />}
                />
              ))}
          </React.Fragment>
        ))}
        {/* <Route path="/product/:productName" element={<ProductTemplate />} /> */}
        <Route
          path="/category/:categoryName/:subcategoryName/:productName/product"
          element={<ProductTemplate />}
        />
      </Routes>
    </Router>
  );
}

export default App;

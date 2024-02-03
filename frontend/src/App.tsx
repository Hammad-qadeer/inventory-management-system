// @ts-nocheck

import CategoryPage from "./pages/CategoryPage";
import ItemPage from "./pages/ItemPage";
import ProductPage from "./pages/ProductPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Container, Row, Col } from "reactstrap";
import Header from "./components/Header";
import { PrimeReactProvider } from "primereact/api";

function App() {
 
  return (
    <PrimeReactProvider>
      <div>
        <Router>
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "15%" }}>
              <Sidebar />
            </div>

            <div style={{ width: "70%" }}>
              <Routes>
                <Route path="/" element={<CategoryPage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/item" element={<ItemPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </PrimeReactProvider>
  );
}

export default App;

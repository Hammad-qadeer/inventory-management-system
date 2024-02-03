import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "reactstrap";

function Sidebar() {
  return (
    <>
      <div style={{ padding: 20 }}>
        <div style={{ marginTop: 20 }}>
          <Link to="/">Category</Link>
        </div>
        <div style={{ marginTop: 20 }}>
          <Link to="/product">Product</Link>
        </div>
        <div style={{ marginTop: 20 }}>
          <Link to="/item">Item</Link>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

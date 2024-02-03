import React from "react";
import AddEditProductForm from "../components/AddEditProductForm";

const ProductPage = (props) => {
  return (
    <div>
      <AddEditProductForm categories={props.categories}/>
    </div>
  );
};

export default ProductPage;

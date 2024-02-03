import React from "react";
import AddEditCategoryForm from "../components/AddEditCategoryForm";
function CategoryPage(props) {
  return (
    <React.Fragment>
      <AddEditCategoryForm getCategories={props.getCategories}/>
    </React.Fragment>
  );
}

export default CategoryPage;

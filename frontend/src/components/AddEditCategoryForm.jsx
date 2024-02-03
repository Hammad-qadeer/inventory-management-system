import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import {
  addCategoryToReduxState,
  addCategoryOffline,
  deleteCategoryOffline,
  updateCategoryOffline,
} from "../actions/actions";

const AddEditCategoryForm = () => {
  const [categories, setCategories] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const dispatch = useDispatch();
  let categoriesOffline = useSelector((state) => state.category.categories);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/categories");
      setCategories(response.data);
      dispatch(addCategoryToReduxState(response.data));
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    if (editMode) {
      dispatch(updateCategoryOffline(currentCategory.id, data));
      const updatedCategories = categoriesOffline.map((category) =>
        category.id === currentCategory.id ? { ...category, ...data } : category
      );
      dispatch(addCategoryToReduxState(updatedCategories));
    } else {
      const newCategories = [...categoriesOffline, data];
      dispatch(addCategoryToReduxState(newCategories));
      dispatch(addCategoryOffline(data));
    }
  };

  const actionButtons = (rowData) => {
    return (
      <div>
        <Button icon="pi pi-check" onClick={() => handleEdit(rowData)} />
        <Button
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => handleDelete(rowData)}
        />
      </div>
    );
  };

  const handleEdit = (rowData) => {
    setEditMode(true);
    setCurrentCategory(rowData);
    setValue("name", rowData.name);
  };

  const handleDelete = async (rowData) => {
    dispatch(deleteCategoryOffline(rowData.id));
    const filteredCategories = categoriesOffline.filter(
      (category) => category.id !== rowData.id
    );
    dispatch(addCategoryToReduxState(filteredCategories));
  };
  return (
    <React.Fragment>
      <h5 className="mt-5">Add Category</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            style={{ marginTop: 20 }}
            type="text"
            placeholder="Category Name"
            {...register("name")}
            className="form-control"
          />
        </div>
        <Button label="Submit" className="mt-1" />
      </form>

      <div className="mt-2">
        <DataTable
          value={categoriesOffline}
          paginator
          rows={5}
          rowsPerPageOptions={[2, 10, 25, 50]}
        >
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Category Name"></Column>
          <Column header="Actions" body={actionButtons}></Column>
        </DataTable>
      </div>
    </React.Fragment>
  );
};

export default AddEditCategoryForm;

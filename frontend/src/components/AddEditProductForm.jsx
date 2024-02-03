import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Label } from "reactstrap";
import {
  addProductOffline,
  addProductToReduxState,
  deleteProductOffline,
  updateProductOffline,
} from "../actions/actions";

const AddEditProductForm = () => {
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const dispatch = useDispatch();
  let productOffline = useSelector((state) => state.product.products);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/categories");
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      setProducts(response.data);
      dispatch(addProductToReduxState(response.data));
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (data) => {
    if (editMode) {
      dispatch(updateProductOffline(currentProduct.id, data));
      const updatedProduct = productOffline.map((product) =>
        product.id === currentProduct.id ? { ...product, ...data } : product
      );
      dispatch(addProductToReduxState(updatedProduct));
      reset();
    } else {
      const newProducts = [...productOffline, data];
      dispatch(addProductToReduxState(newProducts));
      dispatch(addProductOffline(data));
      reset();
    }
  };

  const handleEdit = (rowData) => {
    setEditMode(true);
    setCurrentProduct(rowData);
    reset(rowData);
  };

  const handleDelete = async (rowData) => {
    await dispatch(deleteProductOffline(rowData.id));
    const filteredProducts = productOffline.filter(
      (product) => product.id !== rowData.id
    );
    dispatch(addProductToReduxState(filteredProducts));
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
  return (
    <React.Fragment>
      <h5 className="mt-5">{editMode ? "Edit Product" : "Add Product"}</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="row">
            <div className="col-lg-6">
              <Label>Enter Product Name</Label>
              <input
                type="text"
                placeholder="Product Name"
                {...register("name")}
                className="form-control"
              />
            </div>
            <div className="col-lg-6">
              <Label className="form-label">Select Category ID</Label>
              <select {...register("category_id")} className="form-control">
                {/* Assuming categories is an array of objects with 'id' and 'name' properties */}
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.id}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Add more input fields as required */}
          <Button label="Submit" className="mt-2" />
        </div>
      </form>

      <div className="mt-2">
        <h5 className="form-label">Product List</h5>
        <DataTable
          value={productOffline}
          paginator
          rows={5}
          rowsPerPageOptions={[2, 10, 25, 50]}
        >
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Product Name"></Column>
          <Column field="category_id" header="Category ID"></Column>
          <Column header="Actions" body={actionButtons}></Column>
        </DataTable>
      </div>

      {/* Add a table or list here to display products with edit and delete options */}
    </React.Fragment>
  );
};

export default AddEditProductForm;

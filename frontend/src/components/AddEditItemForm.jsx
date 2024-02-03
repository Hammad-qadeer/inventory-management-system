import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  addItemOffline,
  addItemToReduxState,
  deleteItemOffline,
  updateItemOffline,
} from "../actions/actions";
import { Label } from "reactstrap";

function AddEditItemForm() {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  let itemsOffline = useSelector((state) => state.item.items);
  console.log(itemsOffline, "itemoffline");

  useEffect(() => {
    getProducts();
    getItems();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getItems = async () => {
    try {
      const response = await axios.get("http://localhost:3001/items");
      setItems(response.data);
      dispatch(addItemToReduxState(response.data));
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (data) => {
    if (editMode) {
      dispatch(updateItemOffline(currentItem.id, data));
      const updateItem = itemsOffline.map((item) =>
        item.id === currentItem.id ? { ...item, ...data } : item
      );
      dispatch(addItemToReduxState(updateItem));
      reset();
    } else {
      const newItems = [...itemsOffline, data];
      dispatch(addItemToReduxState(newItems));
      dispatch(addItemOffline(data));
      reset();
    }
  };

  const handleEdit = (rowData) => {
    setEditMode(true);
    setCurrentItem(rowData);
    reset(rowData);
  };

  const handleDelete = async (rowData) => {
    console.log(rowData, "rowdata.....");
    dispatch(deleteItemOffline(rowData.id));
    const filteredItems = itemsOffline.filter((item) => item.id !== rowData.id);
    dispatch(addItemToReduxState(filteredItems));
  };

  const actionButtons = (rowData) => {
    console.log(rowData, "rowdata123213");
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
      <h5 className="mt-5">{editMode ? "Edit Item" : "Add Item"}</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="row">
            <div className="col-lg-6">
              <Label className="form-label">Select Product ID</Label>
              <select {...register("product_id")} className="form-control">
                {/* Assuming categories is an array of objects with 'id' and 'name' properties */}
                {products?.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.id}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-lg-6">
              <Label className="form-label">Enter Quantity</Label>
              <input
                type="number"
                placeholder="Quantity"
                {...register("quantity")}
                className="form-control"
              />
            </div>
          </div>
          {/* Add more input fields as required */}
        </div>
        <Button label="Submit" className="mt-2" />
      </form>

      <div className="mt-2">
        <h5 className="form-label">Items List</h5>
        <DataTable
          value={itemsOffline}
          paginator
          rows={5}
          rowsPerPageOptions={[2, 10, 25, 50]}
        >
          <Column field="id" header="ID"></Column>
          <Column field="product_id" header="Product ID"></Column>
          <Column field="quantity" header="Quantity"></Column>
          <Column header="Actions" body={actionButtons}></Column>
        </DataTable>
      </div>

      {/* Add a table or list here to display items with edit and delete options */}
    </React.Fragment>
  );
}

export default AddEditItemForm;

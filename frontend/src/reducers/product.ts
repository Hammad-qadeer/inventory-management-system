//@ts-nocheck
const initialState = {
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return (state = {
        ...state,
        products: action.payload.products,
      });
    default:
      return state;
  }
};

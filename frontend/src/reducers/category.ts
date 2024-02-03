//@ts-nocheck
const initialState = {
  categories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return (state = {
        ...state,
        categories: action.payload.categories,
      });
    default:
      return state;
  }
};

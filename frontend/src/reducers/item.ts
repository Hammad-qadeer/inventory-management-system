//@ts-nocheck
const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return (state = {
        ...state,
        items: action.payload.items,
      });
    default:
      return state;
  }
};

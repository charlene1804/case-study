const initialState = {
  products: [],
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case "PRODUCTS_RESULTS":
      return {
        ...oldState,
        products: action.payload.products,
      };
    default:
      return { ...oldState };
  }
};

export default reducer;

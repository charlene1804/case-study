const initialState = {
  order: [],
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ORDER":
      return {
        ...oldState,
        order: action.payload.order,
      };
    default:
      return { ...oldState };
  }
};

export default reducer;

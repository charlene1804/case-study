// If there was an API to call for data I would use axios to send requests

import data from "../data/products.json";

const products = (store) => (next) => (action) => {
  //   const state = store.getState();

  async function getRequiredData() {
    try {
      // fake axios GET request

      //   const response = await axios({
      //     method: "GET",
      //     url: `/datas`,
      //   });

      store.dispatch({
        type: "PRODUCTS_RESULTS",
        payload: {
          products: data,
        },
      });
    } catch (error) {
      // console.log('Error request data :', error.response);
    }
  }

  switch (action.type) {
    case "INIT_DATAS":
      getRequiredData();
      break;
    default:
      next(action);
  }
};

export default products;

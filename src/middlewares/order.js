// If there was an API to send data to I would use axios

const order = (store) => (next) => (action) => {
  const state = store.getState();

  async function sendData() {
    try {
      // fake axios POST request

      //   const response = await axios({
      //     method: "POST",
      //     url: `/datas`,
      //     data: data in JSON, FormData....

      //   });
      console.log("Order data to be sent to a URL:", state.order.order);
    } catch (error) {
      // console.log('Error request data :', error.response);
    }
  }

  switch (action.type) {
    case "SEND_ORDER":
      sendData();
      break;
    default:
      next(action);
  }
};

export default order;

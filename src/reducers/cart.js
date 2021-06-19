const initialState = {
  cart: [],
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newCart = oldState.cart;
      const article = action.payload.article;

      // if the article is already in cart the quantity is increased
      if (newCart.find((element) => element.id === article.id) !== undefined) {
        newCart.find((element) => element.id === article.id).quantity += 1;
      } else {
        //else I create the key quantity in the object and set it to 1
        article.quantity = 1;
        //I also calculate the unit price excluding VAT to reuse for Total excl. VAT calculation
        article.unit_price_excl_vat =
          (article.unit_price_incl_vat * 100) / (100 + article.vat_category);

        newCart.push(article);
      }

      return {
        ...oldState,
        cart: newCart,
      };
    default:
      return { ...oldState };
  }
};

export default reducer;

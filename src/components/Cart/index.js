/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { checkVATCategories } from "../../utils/checkVATCategories";

const Cart = ({ cart, updateCartInState, sendOrder }) => {
  // I created a local state with the cart content for the user to be able to modify and the page to rerender dynamically
  const [localCart, setLocalCart] = useState(cart);

  const modifyLocalQuantity = (product, event) => {
    const selectedProduct = localCart.find(
      (element) => element.id === product.id
    );
    const indexOfSelectedProduct = localCart.indexOf(selectedProduct);
    const value = event.target.value;

    if (parseInt(value, 10) === 0) {
      localCart.splice(selectedProduct, 1);
    } else if (parseInt(value, 10) > 0 || value === "") {
      localCart.splice(indexOfSelectedProduct, 1);

      selectedProduct.quantity = value;

      localCart.splice(indexOfSelectedProduct, 0, selectedProduct);
    }

    setLocalCart([...localCart]);
  };

  const removeFromLocalCart = (product) => {
    const newLocalCart = localCart;

    // Find the article in the cart, remove it from the newCart array
    newLocalCart.splice(
      newLocalCart.find((element) => element.id === product.id),
      1
    );

    setLocalCart([...newLocalCart]);
  };

  const calculateTotalExclVAT = () => {
    return localCart
      ?.map((element) =>
        parseInt(element.unit_price_excl_vat * element.quantity)
      )
      .reduce((a, b) => a + b, 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    return localCart
      ?.map((element) => element.unit_price_incl_vat * element.quantity)
      .reduce((a, b) => a + b, 0)
      .toFixed(2);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            Cart
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Item
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Quantity
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-right">
                  Unit Price incl. VAT
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-right">
                  VAT
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-right">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {/* I map the content of my cart in the state to display it */}
              {localCart?.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">
                    <input
                      name="quantity"
                      type="number"
                      className="w-12 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-right outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                      value={product.quantity}
                      onChange={(event) => {
                        modifyLocalQuantity(product, event);
                      }}
                    />
                    <Link
                      to="/cart"
                      onClick={() => {
                        removeFromLocalCart(product);
                        updateCartInState(localCart);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline ml-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {product.unit_price_incl_vat} €
                  </td>
                  <td className="px-4 py-3 text-right">
                    {product.vat_category}%
                  </td>
                  <td className="px-4 py-3 text-lg text-gray-900 text-right">
                    {(product.unit_price_incl_vat * product.quantity).toFixed(
                      2
                    )}{" "}
                    €
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan="4"
                  className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right"
                >
                  Total excl. VAT
                </td>
                <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900 text-right">
                  {/* To get the total excluding VAT I map on the content of the cart and for each element I return the unit_price_excl_vat times the quantity. Then I sum all the elements and fix a number with two decimals */}
                  {calculateTotalExclVAT()} €
                </td>
              </tr>

              {/* I call a utility function checkVATCategories which will return the JSX with the VAT amount for each VAT category */}
              {checkVATCategories(localCart)}

              <tr>
                <th
                  colSpan="4"
                  className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right"
                >
                  Total
                </th>
                <th className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900 text-right">
                  {calculateTotal()} €
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
          <Link
            className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
            to="/products"
            onClick={() => {
              updateCartInState(localCart);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </Link>
          <Link
            className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
            to="/order"
            onClick={() => {
              updateCartInState(localCart);
              sendOrder(localCart);
            }}
          >
            Send order
          </Link>
        </div>
      </div>
    </section>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      unit_price_incl_vat: PropTypes.number.isRequired,
      vat_category: PropTypes.number.isRequired,
      stock_quantity: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      unit_price_excl_vat: PropTypes.number.isRequired,
    }).isRequired
  ),
  updateCartInState: PropTypes.func.isRequired,
  sendOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

const mapDispatchToProps = (dispatch) => ({
  sendOrder: (cart) => {
    console.log("Content of the shopping cart:", cart);
    dispatch({
      type: "UPDATE_ORDER",
      payload: {
        cart,
      },
    });

    setTimeout(() => {
      dispatch({
        type: "EMPTY_CART",
      });

      dispatch({
        type: "SEND_ORDER",
      });
    }, 1000);
  },

  updateCartInState: (cart) => {
    const cartToUpdate = cart;
    cart.forEach((element, index) => {
      if (element.quantity === "") {
        cartToUpdate.splice(index, 1);
      }
    });
    dispatch({
      type: "UPDATE_CART",
      payload: {
        cart: cartToUpdate,
      },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

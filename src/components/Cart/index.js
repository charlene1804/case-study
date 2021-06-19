import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { checkVATCategories } from "../../utils/checkVATCategories";

const Cart = (cart, removeFromCart) => {
  return (
    <>
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
                <>
                  {/* I map the content of my cart in the state to display */}
                  {cart.cart.map((product) => (
                    <tr key={product.id}>
                      <td className="px-4 py-3">{product.name}</td>
                      <td className="px-4 py-3">
                        <input
                          name="quantity"
                          type="number"
                          className="w-12 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-right outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                          value={product.quantity}
                        />
                        <span onClick={removeFromCart}>
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
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {product.unit_price_incl_vat} €
                      </td>
                      <td className="px-4 py-3 text-right">
                        {product.vat_category}%
                      </td>
                      <td className="px-4 py-3 text-lg text-gray-900 text-right">
                        {product.unit_price_incl_vat * product.quantity} €
                      </td>
                    </tr>
                  ))}
                </>
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
                    {/* To get the total excluding VAT I map on the ocntent of the cart and for each element I return the unit_price_excl_vat times the quantity. Then I sum all the elements and fix a number with two decimals */}
                    {cart.cart
                      .map(
                        (element) =>
                          element.unit_price_excl_vat * element.quantity
                      )
                      .reduce((a, b) => a + b, 0)
                      .toFixed(2)}{" "}
                    €
                  </td>
                </tr>

                {/* I call a utility function checkVATCategories which will return the JSX with the VAT amount for each VAT category */}
                {checkVATCategories(cart.cart)}

                <tr>
                  <th
                    colSpan="4"
                    className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right"
                  >
                    Total
                  </th>
                  <th className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900 text-right">
                    {cart.cart
                      .map(
                        (element) =>
                          element.unit_price_incl_vat * element.quantity
                      )
                      .reduce((a, b) => a + b, 0)}{" "}
                    €
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
            <Link
              className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
              to="/products"
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
            >
              Send order
            </Link>
          </div>
        </div>
      </section>
    </>
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
    }).isRequired
  ),
  removeFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (article) => {
    // dispatch({
    //   type: "UPDATE_CART",
    //   payload: {
    //     article: article,
    //   },
    // });
    console.log("removed from cart");
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

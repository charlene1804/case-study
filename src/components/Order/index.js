/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Order = ({ order }) => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            Thank you for your order
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-auto mx-auto text-left whitespace-no-wrap">
            <tbody>
              {order?.map((product) => (
                <tr>
                  <td className="px-4 py-3">{product.quantity}x</td>
                  <td className="px-4 py-3">{product.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="lg:w-2/3 mx-auto mt-10 leading-relaxed text-center">
          Please send us the payment of{" "}
          <span className="text-3xl">
            {order
              ?.map((element) => element.unit_price_incl_vat * element.quantity)
              .reduce((a, b) => a + b, 0)
              .toFixed(2)}{" "}
            €
          </span>{" "}
          to our bitcoin address.
        </p>
        <p className="text-center mt-20">
          <Link
            className="text-white bg-indigo-500 border-0 py-3 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            to="/products"
          >
            Continue shopping
          </Link>
        </p>
      </div>
    </section>
  );
};

Order.propTypes = {
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
};

const mapStateToProps = (state) => ({
  order: state.order.order,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Order);

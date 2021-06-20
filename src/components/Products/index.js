/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Products = ({ products, addArticleToCart }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            Products
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {/* I map on products from the state to display them on the products page */}
          {products?.map((product) => (
            <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src="https://dummyimage.com/420x260"
                />
              </a>
              <div className="mt-4">
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {product.name}
                </h2>
                <div className="flex flex-wrap items-center mt-2">
                  <p className="flex-1">{product.unit_price_incl_vat} €</p>
                  <Link
                    to="/cart"
                    onClick={() => {
                      addArticleToCart(product);
                    }}
                    className="text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Add to cart
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Products.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      unit_price_incl_vat: PropTypes.number.isRequired,
      vat_category: PropTypes.number.isRequired,
      stock_quantity: PropTypes.number.isRequired,
    }).isRequired
  ),
  addArticleToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products.products,
});

const mapDispatchToProps = (dispatch) => ({
  addArticleToCart: (article) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        article,
      },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);

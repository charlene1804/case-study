// Imports
import React from "react";
import { Route } from "react-router-dom";

// Components import
import Products from "./Products";
import Cart from "./Cart";
import Order from "./Order";

function App() {
  return (
    <div className="App">
      <Route exact path="/products">
        <Products />
      </Route>
      <Route exact path="/cart">
        <Cart />
      </Route>
      <Route exact path="/order">
        <Order />
      </Route>
      {/* <Route exact path="/404">
        <Page404 />
      </Route> */}
    </div>
  );
}

export default App;

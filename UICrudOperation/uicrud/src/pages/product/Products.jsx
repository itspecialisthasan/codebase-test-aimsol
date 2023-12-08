import React, { Component } from "react";
import Product from "./Product";

class Products extends Component {
  state = {
    Products: [
      {
        pname: "joggers",
        brand: "addidas",
        category: "gym joggers",
        price: "4,000",
      },
      {
        pname: "slippers",
        brand: "bata",
        category: "slippers",
        price: "1,000",
      },
    ],
  };
  render() {
    const { Products } = this.state;

    return (
      <div>
        {Products.map((product) => (
          <Product data={product} />
        ))}
      </div>
    );
  }
}

export default Products;

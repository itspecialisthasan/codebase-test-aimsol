import React, { Component } from "react";

import axios from "axios";

const Context = React.createContext();

export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Products: [
        {
          productId: 1,
          productName: "joggers",
          brand: "addidas",
          category: "gym joggers",
          price: "4,000",
        },
      ],
    };
  }

  componentDidMount() {
    axios
      .get("api/CrudOperation/GetProductList")
      .then((res) => {
        this.setState({
          Products: res.data,
        });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

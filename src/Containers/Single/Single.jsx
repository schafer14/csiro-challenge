import React, { Component } from "react";
import axios from "axios";

class Single extends Component {
  state = {
    data: {}
  };

  componentWillMount() {
    axios
      .get(
        `https://jsonplaceholder.typicode.com${this.props.location.pathname}`
      )
      .then(response => {
        this.setState({
          data: response.data
        });
      });
  }

  render() {
    return <h1>User {this.state.data.name}</h1>;
  }
}

export default Single;

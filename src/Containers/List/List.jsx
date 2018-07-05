import React, { Component, Fragment } from "react";
import {
  Row,
  Panel,
  Col,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Glyphicon,
  FormControl
} from "react-bootstrap";
import { map, filter, pick, values } from "lodash";
import axios from "axios";

import Item from "../../Components/Item/Item";

class ListContainer extends Component {
  state = {
    loading: true,
    filter: "",
    data: [],
    filteredData: []
  };

  componentWillMount() {
    axios.get("https://jsonplaceholder.typicode.com/users").then(response => {
      this.setState({
        data: response.data,
        loading: false,
        filteredData: response.data
      });
    });
  }

  toggle = () => {
    this.setState({ displayRow: !this.state.displayRow });
  };

  handleFilterChange = e => {
    let newFilter = e.target.value;
    this.setState({ filter: e.target.value });

    if (!newFilter) {
      this.setState({ filteredData: this.state.data });
    } else {
      this.setState({
        filteredData: filter(this.state.data, datum => {
          let regex = new RegExp(newFilter, "i");
          let props = pick(datum, ["name", "username", "email"]);

          return regex.test(values(props).join(" "));
        })
      });
    }
  };

  changeState = id => {
    this.props.history.push(`/users/${id}`);
  };

  render() {
    const buttonClass = this.state.displayRow ? "th-large" : "th-list";

    const button = (
      <Button onClick={this.toggle}>
        <Glyphicon glyph={buttonClass} />
      </Button>
    );

    return (
      <Fragment>
        <h1>List Users</h1>
        <Panel>
          <Panel.Body>
            <Row>
              <Col md={3}>
                <FormControl
                  type="text"
                  value={this.state.filter}
                  placeholder="Filter"
                  onChange={this.handleFilterChange}
                />
              </Col>
              <Col md={2} mdOffset={7} xsHidden>
                <ButtonToolbar className="pull-right">
                  <ButtonGroup>{button}</ButtonGroup>
                </ButtonToolbar>
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
        <Row>
          {map(this.state.filteredData, (item, index) => {
            return (
              <Item
                click={() => this.changeState(item.id)}
                {...item}
                key={index}
                row={this.state.displayRow}
              />
            );
          })}
        </Row>
      </Fragment>
    );
  }
}

export default ListContainer;

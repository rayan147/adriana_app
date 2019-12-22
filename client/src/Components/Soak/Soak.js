import React, { useEffect, useState } from "react";
import ItemModel from "../ItemModel";
import "../../Assets/css/Flavours.css";

import Header from "../Layout/Header";
import {
  Container,
  Row,
  ListGroup,
  ListGroupItem,
  ButtonToggle
} from "reactstrap";
import { getItems, deleteItem, updateItem } from "../../actions/itemActions";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Soaks = props => {
  const [state, setState] = useState();
  const API_DATA = async () => {
    return await props.getItems();
  };

  useEffect(() => {
    API_DATA();
  }, []);

  const onDeleteClick = async id => {
    return await props.deleteItem(id);
  };

  const onUpdateClick = id => {
    console.log(id);
    return props.updateItem(id);
  };

  // onSubmit = e => {
  //   e.preventDefault();

  //   const newItem = {
  //     name: this.state.name
  //   };

  //   // Add item via addItem action
  //   this.props.addItem(newItem);

  //   // Close modal
  //   this.toggle();
  // };

  const { items } = props.item;

  const mappedSoaksFirstCol = items.map(({ _id, name }) => (
    <ListGroup flush key={_id}>
      <TransitionGroup key={_id}>
        <CSSTransition key={_id} timeout={500} classNames="alert">
          <ListGroupItem className="Flavours--item" key={_id}>
            <ButtonToggle
              className="Flavours--item__remove-btn"
              color="danger"
              size="sm"
              style={{ marginRight: "2rem" }}
              onClick={function() {
                onDeleteClick(_id);
              }}
            >
              &times;
            </ButtonToggle>
            <ButtonToggle
              className="Flavours--item__remove-btn"
              color="success"
              size="sm"
              style={{ marginRight: "2rem" }}
              onClick={function() {
                onUpdateClick(_id);
              }}
            >
              +
            </ButtonToggle>
            {name}
          </ListGroupItem>
        </CSSTransition>
      </TransitionGroup>
    </ListGroup>
  ));

  const styleFont = {
    fontWeight: "600",
    fontSize: "2rem"
  };
  return (
    <Container>
      <Header title="SOAKS" />
      <ItemModel />
      <Container className="Flavours">
        <Row className="shadow-lg p-3 mb-5 bg-white rounded" style={styleFont}>
          <div className="Flavours">{mappedSoaksFirstCol}</div>
        </Row>
      </Container>
    </Container>
  );
};
const mapStateToProp = state => ({
  item: state.item
});

export default connect(
  mapStateToProp,
  { getItems, deleteItem, updateItem }
)(Soaks);

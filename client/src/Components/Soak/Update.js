import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { updateItem } from "../../actions/itemActions";
import PropTypes from "prop-types";

class Update extends Component {
  state = {
    modal: false,
    name: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name
    };

    // Add item via addItem action
    this.props.updateItem(newItem);

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Update
          </Button>
        }

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Update Item</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Update</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Update item"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Update Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { updateItem }
)(Update);

import React, { Component } from 'react';
import { Label, Input, FormGroup, Button, Alert } from 'reactstrap';
import { X } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from 'classnames';

class DataListSidebar extends Component {
  state = {
    _id: '',
    name: '',
    description: '',
    type: '',
    category: '',
    img_url: '',
    home_url: '',
    msg: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== null && prevProps.data === null) {
      if (this.props.data._id !== prevState._id) {
        this.setState({ _id: this.props.data._id });
      }
      if (this.props.data.name !== prevState.name) {
        this.setState({ name: this.props.data.name });
      }
      if (this.props.data.description !== prevState.description) {
        this.setState({ description: this.props.data.description });
      }
      if (this.props.data.category !== prevState.category) {
        this.setState({ category: this.props.data.category });
      }
      if (this.props.data.type !== prevState.type) {
        this.setState({ type: this.props.data.type });
      }
      if (this.props.data.img_url !== prevState.img_url) {
        this.setState({ img_url: this.props.data.img_url });
      }
      if (this.props.data.home_url !== prevState.home_url) {
        this.setState({ home_url: this.props.data.home_url });
      }
    }
    if (this.props.data === null && prevProps.data !== null) {
      this.setState({
        _id: '',
        name: '',
        type: '',
        description: '',
        category: '',
        img_url: '',
        home_url: ''
      });
    }
  }

  handleSubmit = (obj) => {
    if (this.props.data !== null) {
      const { _id, description, category, img_url, home_url } = obj;
      this.props.updateData({ _id, description, category, img_url, home_url });
    } else {
      if (!obj.name) {
        return this.setState({ msg: 'Name must be set' });
      } else {
        const { _id, msg, ...sendData } = this.state;
        this.props.addData(sendData);
      }
    }
    this.props.handleSidebar(false, true);
  };

  render() {
    let disableName = false;
    if (this.props.data != null && this.props.data.name) disableName = true;
    let { show, handleSidebar, data } = this.props;
    let {
      msg,
      name,
      description,
      category,
      type,
      img_url,
      home_url
    } = this.state;
    return (
      <div
        className={classnames('data-list-sidebar', {
          show: show
        })}>
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? 'UPDATE DATA' : 'ADD NEW DATA'}</h4>
          <X size={20} onClick={() => handleSidebar(false, true)} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          {this.props.thumbView && img_url ? (
            <FormGroup className="text-center">
              <img className="img-fluid" src={img_url} alt={name} />
            </FormGroup>
          ) : null}
          <FormGroup>
            <Label for="data-name">Name</Label>
            <Input
              type="text"
              value={name || ''}
              disabled={disableName}
              placeholder="Name"
              onChange={(e) => this.setState({ name: e.target.value })}
              id="data-name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-description">Description</Label>
            <Input
              type="text"
              value={description || ''}
              placeholder="Description"
              onChange={(e) => this.setState({ description: e.target.value })}
              id="data-description"
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-category">Type</Label>
            <Input
              type="select"
              id="data-type"
              value={type}
              required
              onChange={(e) => this.setState({ type: e.target.value })}>
              <option value="PHYSICAL">PHYSICAL</option>
              <option value="DIGITAL">DIGITAL</option>
              <option value="SERVICE">SERVICE</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="data-category">Category</Label>
            <Input
              type="select"
              id="data-category"
              value={category}
              onChange={(e) => this.setState({ category: e.target.value })}>
              <option value="Audio">Audio</option>
              <option value="Computer">Computer</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Fitness">Fitness</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="data-img-url">Image URL</Label>
            <Input
              type="text"
              id="data-img-url"
              value={img_url || ''}
              onChange={(e) =>
                this.setState({ img_url: e.target.value })
              }></Input>
          </FormGroup>
          <FormGroup>
            <Label for="data-home-url">Home URL</Label>
            <Input
              type="text"
              id="data-home-url"
              value={home_url || ''}
              onChange={(e) =>
                this.setState({ home_url: e.target.value })
              }></Input>
          </FormGroup>
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button color="primary" onClick={() => this.handleSubmit(this.state)}>
            {data !== null ? 'Update' : 'Submit'}
          </Button>
          <Button
            className="ml-1"
            color="danger"
            outline
            onClick={() => handleSidebar(false, true)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}
export default DataListSidebar;

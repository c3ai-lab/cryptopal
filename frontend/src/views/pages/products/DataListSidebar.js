import React, { Component } from 'react';
import { Label, Input, FormGroup, Button } from 'reactstrap';
import { X } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from 'classnames';

class DataListSidebar extends Component {
  state = {
    id: '',
    name: '',
    description: '',
    category: 'Audio',
    img_url: '',
    home_url: ''
  };

  addNew = false;

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== null && prevProps.data === null) {
      if (this.props.data.id !== prevState.id) {
        this.setState({ id: this.props.data.id });
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
      if (this.props.data.img_url !== prevState.img_url) {
        this.setState({ img_url: this.props.data.img_url });
      }
      if (this.props.data.home_url !== prevState.home_url) {
        this.setState({ home_url: this.props.data.home_url });
      }
    }
    if (this.props.data === null && prevProps.data !== null) {
      this.setState({
        id: '',
        name: '',
        description: '',
        category: 'Audio',
        img_url: '',
        home_url: ''
      });
    }
    if (this.addNew) {
      this.setState({
        id: '',
        name: '',
        description: '',
        category: 'Audio',
        img_url: '',
        home_url: ''
      });
    }
    this.addNew = false;
  }

  handleSubmit = (obj) => {
    if (this.props.data !== null) {
      this.props.updateData(obj);
    } else {
      this.addNew = true;
      this.props.addData(obj);
    }
    let params = Object.keys(this.props.dataParams).length
      ? this.props.dataParams
      : { page: 1, perPage: 5 };
    this.props.handleSidebar(false, true);
    this.props.getData(params);
  };

  render() {
    let { show, handleSidebar, data } = this.props;
    let { name, description, category, img_url, home_url } = this.state;
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
          {this.props.thumbView && img_url ? (
            <FormGroup className="text-center">
              <img className="img-fluid" src={img_url} alt={name} />
            </FormGroup>
          ) : null}
          <FormGroup>
            <Label for="data-name">Name</Label>
            <Input
              type="text"
              value={name}
              disabled
              placeholder="Name"
              onChange={(e) => this.setState({ name: e.target.value })}
              id="data-name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-description">Description</Label>
            <Input
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => this.setState({ description: e.target.value })}
              id="data-description"
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-category">Category</Label>
            <Input
              type="select"
              id="data-category"
              value={category}
              onChange={(e) => this.setState({ category: e.target.value })}>
              <option>Audio</option>
              <option>Computers</option>
              <option>Fitness</option>
              <option>Appliances</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="data-img-url">Image URL</Label>
            <Input
              type="text"
              id="data-img-url"
              value={img_url}
              onChange={(e) =>
                this.setState({ img_url: e.target.value })
              }></Input>
          </FormGroup>
          <FormGroup>
            <Label for="data-home-url">Home URL</Label>
            <Input
              type="text"
              id="data-home-url"
              value={home_url}
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

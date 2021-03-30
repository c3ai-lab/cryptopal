import React, { Component } from 'react';
import {
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from 'reactstrap';
import DataTable from 'react-data-table-component';
import classnames from 'classnames';
import ReactPaginate from 'react-paginate';
import {
  Edit,
  Trash,
  ChevronDown,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight
} from 'react-feather';
import { connect } from 'react-redux';
import {
  getData,
  deleteData,
  updateData,
  addData
} from '../../../redux/actions/product-list/productListActions';
import Sidebar from './DataListSidebar';
import Checkbox from '../../../components/@vuexy/checkbox/CheckboxesVuexy';

import '../../../assets/scss/plugins/extensions/react-paginate.scss';
import '../../../assets/scss/pages/data-list.scss';

const selectedStyle = {
  rows: {
    selectedHighlighStyle: {
      backgroundColor: 'rgba(115,103,240,.05)',
      color: '#7367F0 !important',
      boxShadow: '0 0 1px 0 #7367F0 !important',
      '&:hover': {
        transform: 'translateY(0px) !important'
      }
    }
  }
};

const ActionsComponent = (props) => {
  return (
    <div className="data-list-action">
      <Edit
        className="cursor-pointer mr-1"
        size={20}
        onClick={() => {
          return props.currentData(props.row);
        }}
      />
      <Trash
        className="cursor-pointer"
        size={20}
        onClick={() => {
          props.deleteRow(props.row);
        }}
      />
    </div>
  );
};

const CustomHeader = (props) => {
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-left d-flex flex-wrap">
        <UncontrolledDropdown className="data-list-dropdown mr-1">
          <DropdownToggle className="p-1" color="primary">
            <span className="align-middle mr-1">Actions</span>
            <ChevronDown size={15} />
          </DropdownToggle>
          <DropdownMenu tag="div" right>
            <DropdownItem tag="a">Delete</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <Button
          className="add-new-btn"
          color="primary"
          onClick={() => props.handleSidebar(true, true)}
          outline>
          <Plus size={15} />
          <span className="align-middle">Add New</span>
        </Button>
      </div>
      <div className="actions-right d-flex flex-wrap mt-sm-0 mt-2">
        <UncontrolledDropdown className="data-list-rows-dropdown mr-1 d-md-block d-none">
          <DropdownToggle color="" className="sort-dropdown">
            <span className="align-middle mx-50">
              {`${props.startIndex} - ${props.endIndex} of ${props.total}`}
            </span>
            <ChevronDown size={15} />
          </DropdownToggle>
          <DropdownMenu tag="div" right>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(5)}>
              5
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(10)}>
              10
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(15)}>
              15
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(20)}>
              20
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </div>
  );
};

class DataListConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.productList.totalItems !== state.data.totalItems) {
      return {
        data: props.productList.data,
        totalPages: props.productList.totalPages,
        totalItems: props.productList.totalItems
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  state = {
    data: [],
    totalPages: 0,
    totalItems: 0,
    parsedFilter: {
      page_size: 5,
      page: 1,
      total_required: true
    },
    columns: [
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        minWidth: '300px',
        cell: (row) => (
          <p title={row.name} className="text-truncate text-bold-500 mb-0">
            {row.name}
          </p>
        )
      },
      {
        name: 'Category',
        selector: 'category',
        sortable: true
      },
      {
        name: 'Description',
        selector: 'description',
        sortable: false
      },
      {
        name: 'Actions',
        sortable: true,
        cell: (row) => (
          <ActionsComponent
            row={row}
            getData={this.props.getData}
            parsedFilter={this.props.parsedFilter}
            currentData={this.handleCurrentData}
            deleteRow={this.handleDelete}
          />
        )
      }
    ],
    sidebar: false,
    currentData: null
  };

  thumbView = this.props.thumbView;

  componentDidMount() {
    this.props.getData(this.state.parsedFilter);
  }

  componentDidUpdate() {
    if (this.thumbView) {
      this.thumbView = false;
      let columns = [
        {
          name: 'Image',
          selector: 'img',
          minWidth: '220px',
          cell: (row) => (
            <img
              src={
                row.img_url
                  ? row.img_url
                  : 'https://previews.123rf.com/images/stuartphoto/stuartphoto1206/stuartphoto120600282/14055075-demn%C3%A4chst-stempelabdruck-new-product-arrivals.jpg'
              }
              height="100"
              alt={row.name}
            />
          )
        },
        {
          name: 'Name',
          selector: 'name',
          minWidth: '250px',
          cell: (row) => (
            <p title={row.name} className="text-truncate text-bold-500 mb-0">
              {row.name}
            </p>
          )
        },
        {
          name: 'Category',
          selector: 'category',
          cell: (row) => `${row.category}`
        },
        {
          name: 'Description',
          selector: 'description',
          minWidth: '350px',
          cell: (row) => `${row.description}`
        },
        {
          name: 'Actions',
          cell: (row) => (
            <ActionsComponent
              row={row}
              getData={this.props.getData}
              parsedFilter={this.props.parsedFilter}
              currentData={this.handleCurrentData}
              deleteRow={this.handleDelete}
            />
          )
        }
      ];
      this.setState({ columns });
    }
  }

  handleRowsPerPage = (value) => {
    this.setState(
      (prevState) => ({
        parsedFilter: { ...prevState.parsedFilter, page: 1, page_size: value }
      }),
      () => {
        this.props.getData(this.state.parsedFilter);
      }
    );
  };

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };

  handleDelete = (row) => {
    this.props.deleteData(row);
  };

  handleCurrentData = (obj) => {
    this.setState({ currentData: obj }, () => this.handleSidebar(true));
  };

  handlePagination = (currentPage) => {
    this.setState(
      (prevState) => ({
        parsedFilter: {
          ...prevState.parsedFilter,
          page: currentPage.selected + 1
        }
      }),
      () => {
        this.props.getData(this.state.parsedFilter);
      }
    );
  };

  render() {
    let {
      columns,
      data,
      parsedFilter,
      totalPages,
      totalItems,
      currentData,
      sidebar
    } = this.state;
    return (
      <div
        className={`data-list ${
          this.props.thumbView ? 'thumb-view' : 'list-view'
        }`}>
        <DataTable
          columns={columns}
          data={data}
          pagination
          paginationServer
          paginationComponent={() => (
            <ReactPaginate
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel="..."
              breakClassName="break-me"
              pageCount={totalPages}
              containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
              activeClassName="active"
              onPageChange={(page) => this.handlePagination(page)}
              forcePage={parsedFilter.page - 1}
            />
          )}
          noHeader
          subHeader
          selectableRows
          responsive
          pointerOnHover
          selectableRowsHighlight
          onSelectedRowsChange={(data) =>
            this.setState({ selected: data.selectedRows })
          }
          customStyles={selectedStyle}
          subHeaderComponent={
            <CustomHeader
              handleSidebar={this.handleSidebar}
              handleFilter={this.handleFilter}
              handleRowsPerPage={this.handleRowsPerPage}
              rowsPerPage={parsedFilter.page_size}
              total={totalItems}
              startIndex={(parsedFilter.page - 1) * parsedFilter.page_size + 1}
              endIndex={
                parsedFilter.page * parsedFilter.page_size <= totalItems
                  ? parsedFilter.page * parsedFilter.page_size
                  : totalItems
              }
            />
          }
          sortIcon={<ChevronDown />}
          selectableRowsComponent={Checkbox}
          selectableRowsComponentProps={{
            color: 'primary',
            icon: <Check className="vx-icon" size={12} />,
            label: '',
            size: 'sm'
          }}
        />
        <Sidebar
          show={sidebar}
          data={currentData}
          updateData={this.props.updateData}
          addData={this.props.addData}
          handleSidebar={this.handleSidebar}
          thumbView={this.props.thumbView}
          getData={() => this.props.getData(parsedFilter)}
        />
        <div
          className={classnames('data-list-overlay', {
            show: sidebar
          })}
          onClick={() => this.handleSidebar(false, true)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productList: state.productList
  };
};

export default connect(mapStateToProps, {
  getData,
  deleteData,
  updateData,
  addData
})(DataListConfig);

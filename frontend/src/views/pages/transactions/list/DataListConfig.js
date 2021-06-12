// ================================================================================================
// 	File Name: DataListConfig.js
// 	Description:
//  This components represents the table of all loaded transactions. It holds the configuration
//  of the table defining which properties should be displayed in each row. The header holds
//  controlling elements for displaying chosen number of transactions in the table on one page.
// ================================================================================================
import React, { Component } from 'react';
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from 'reactstrap';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import { ChevronDown, ChevronLeft, ChevronRight } from 'react-feather';
import { connect } from 'react-redux';
import { getTransactions } from '../../../../redux/actions/wallet/walletActions';
import { history } from '../../../../history';

import '../../../../assets/scss/plugins/extensions/react-paginate.scss';
import '../../../../assets/scss/pages/data-list.scss';

// style for selected row (selected transaction)
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

// header with dropdown menu for displaying different numbers of transactions on one site
const CustomHeader = (props) => {
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-left d-flex flex-wrap"></div>
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
  // get state from redux props
  static getDerivedStateFromProps(props, state) {
    if (props.wallet.transactions !== state.data) {
      return {
        data: props.wallet.transactions,
        totalItems: props.wallet.totalItmes,
        totalPages: props.wallet.totalPages
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  // define components initial state and table colums
  state = {
    data: [],
    totalPages: 0,
    totalItems: 0,
    parsedFilter: {
      page_size: 2,
      page: 1,
      total_required: true
    },
    columns: [
      {
        name: 'Name',
        selector: 'name',
        width: '25%',
        cell: (row) => (
          <p title={row.name} className="text-truncate text-bold-500 mb-0">
            {row.name}
          </p>
        )
      },
      {
        name: 'Date',
        selector: 'date',
        width: '25%',
        cell: (row) => (
          <p title={row.date} className="text-truncate text-bold-500 mb-0">
            {row.date}
          </p>
        )
      },
      {
        name: 'Type',
        selector: 'type',
        width: '25%',
        cell: (row) => `${row.type}`
      },
      {
        name: 'Value',
        selector: 'value',
        width: '25%',
        cell: (row) => <p>{parseFloat(row.value).toFixed(2)} USD</p>
      }
    ]
  };

  // initially get transactions with redux
  componentDidMount() {
    this.props.getTransactions(this.state.parsedFilter);
  }

  // update table with loaded data for transactions
  componentDidUpdate(prevProps) {
    if (this.props.wallet.transactions !== prevProps.wallet.transactions) {
      // get readyble date format
      const formatDate = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format;
      let columns = [
        {
          name: 'Name',
          selector: 'name',
          width: '25%',
          cell: (row) => (
            <p title={row.name} className="text-truncate text-bold-500 mb-0">
              {row.name}
            </p>
          )
        },
        {
          name: 'Date',
          selector: 'date',
          width: '25%',
          cell: (row) => (
            <p title={row.date} className="text-truncate text-bold-500 mb-0">
              {formatDate(new Date(row.date))}
            </p>
          )
        },
        {
          name: 'Type',
          selector: 'type',
          width: '25%',
          cell: (row) => `${row.type}`
        },
        {
          name: 'Value',
          selector: 'value',
          width: '25%',
          cell: (row) => <p>{parseFloat(row.value).toFixed(2)} USD</p>
        }
      ];
      const { totalPages, totalItems } = this.props.wallet;
      this.setState({ columns, totalItems, totalPages });
    }
  }

  // handle number of transaction shown on one page by selecting in dropdown
  handleRowsPerPage = (value) => {
    this.setState(
      (prevState) => ({
        parsedFilter: { ...prevState.parsedFilter, page: 1, page_size: value }
      }),
      () => {
        this.props.getTransactions(this.state.parsedFilter);
      }
    );
  };

  // load requested transactions by changing page
  handlePagination = (currentPage) => {
    this.setState(
      (prevState) => ({
        parsedFilter: {
          ...prevState.parsedFilter,
          page: currentPage.selected + 1
        }
      }),
      () => {
        this.props.getTransactions(this.state.parsedFilter);
      }
    );
  };

  // render table with given transactions and configured properties
  render() {
    let { columns, data, parsedFilter, totalPages, totalItems } = this.state;
    return (
      <div className="data-list list-view">
        <DataTable
          onRowClicked={(data) => history.push('/transaction?tx=' + data.id)}
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
        />
      </div>
    );
  }
}

// get state from redux
const mapStateToProps = (state) => {
  return {
    wallet: state.wallet
  };
};

export default connect(mapStateToProps, { getTransactions })(DataListConfig);

// ================================================================================================
// 	File Name: productList.js
// 	Description:
//  This class handles holds and sets all variables related to the products globally in
//  redux state. The variables are the total displayed items, total pages and filter parameters
//  to load products conditionally.
// ================================================================================================
/* eslint-disable no-case-declarations */
const initialState = {
  data: [],
  totalPages: 0,
  totalItems: 0,
  params: {
    page_size: 5,
    page: 1,
    total_required: true
  }
};

const DataListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        totalItems: action.totalItems,
        params: action.params
      };
    case 'ADD_DATA':
      state.data.push({ ...action.obj });

      return {
        ...state,
        data: state.data,
        totalItems: state.totalItems + 1
      };
    case 'UPDATE_DATA':
      state.data.find((item) => {
        if (item._id === action.obj._id) {
          return Object.assign(item, { ...action.obj });
        } else {
          return item;
        }
      });
      return { ...state };
    case 'DELETE_DATA':
      let index = state.data.findIndex((item) => item._id === action.obj._id);
      let updatedData = [...state.data];
      updatedData.splice(index, 1);
      return {
        ...state,
        data: updatedData,
        totalItems: state.totalItems - 1
      };
    default:
      return state;
  }
};

export default DataListReducer;

import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",
  initialState: {
    loading: false,
    lists: [],
    list: {},
    isListCreated: false,
    isListUpdated: false,
    isListDeleted: false,
  },
  reducers: {
    listsRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    listsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        lists: action.payload.lists,
      };
    },
    listsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    listRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    listSuccess(state, action) {
      return {
        ...state,
        loading: false,
        list: action.payload.list,
      };
    },
    listFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    createListRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    createListSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isListCreated: true,
      };
    },
    createListFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearListCreated(state, action) {
      return {
        ...state,
        isListCreated: false,
      };
    },

    deleteListRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteListSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isListDeleted: true,
      };
    },
    deleteListFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearListDeleted(state, action) {
      return {
        ...state,
        isListDeleted: false,
      };
    },
    updateListRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateListSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isListUpdated: true,
      };
    },
    updateListFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    clearListUpdated(state, action) {
      return {
        ...state,
        isListUpdated: false,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

const { actions, reducer } = listSlice;

export const {
  listsRequest,
  listsSuccess,
  listsFail,
  listRequest,
  listSuccess,
  listFail,
  updateListRequest,
  updateListSuccess,
  updateListFail,
  deleteListRequest,
  deleteListSuccess,
  deleteListFail,
  clearListDeleted,
  clearListUpdated,
  clearError,
  createListRequest,
  createListSuccess,
  createListFail,
  clearListCreated,
} = actions;

export default reducer;

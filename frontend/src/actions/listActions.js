import axios from "axios";
import {
  createListFail,
  createListRequest,
  createListSuccess,
  deleteListFail,
  deleteListRequest,
  deleteListSuccess,
  listFail,
  listRequest,
  listSuccess,
  listsFail,
  listsRequest,
  listsSuccess,
  updateListFail,
  updateListRequest,
  updateListSuccess,
} from "../slices/listSlice";

export const createList =
  ({ name, lists }) =>
  async (dispatch) => {
    try {
      dispatch(createListRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/v1/create-list`,
        { name, lists },
        config
      );
      dispatch(createListSuccess(data));
    } catch (e) {
      dispatch(createListFail(e.response.data.message));
    }
  };

export const getLists = () => async (dispatch) => {
  try {
    dispatch(listsRequest());
    const { data } = await axios.get(`/api/v1/get-lists`);
    dispatch(listsSuccess(data));
  } catch (e) {
    dispatch(listsFail(e.response.data.message));
  }
};

export const getList = (id) => async (dispatch) => {
  try {
    dispatch(listRequest());
    const { data } = await axios.get(`/api/v1/get-list/${id}`);
    dispatch(listSuccess(data));
  } catch (e) {
    dispatch(listFail(e.response.data.message));
  }
};

export const updateList =
  ({ id, name, lists }) =>
  async (dispatch) => {
    try {
      dispatch(updateListRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/update-list`,
        { id, name, lists },
        config
      );
      dispatch(updateListSuccess(data));
    } catch (e) {
      dispatch(updateListFail(e.response.data.message));
    }
  };

export const deleteList = (id) => async (dispatch) => {
  try {
    console.log(id);
    dispatch(deleteListRequest());
    await axios.delete(`/api/v1/delete-list/${id}`);
    dispatch(deleteListSuccess());
  } catch (e) {
    dispatch(deleteListFail(e.response.data.message));
  }
};

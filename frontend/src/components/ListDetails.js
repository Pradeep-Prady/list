import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteList, getList, updateList } from "../actions/listActions";
import { clearListDeleted, clearListUpdated } from "../slices/listSlice";
import Loader from "./../layouts/Loader";
import MetaData from "../layouts/MetaData";

export default function ListDetails() {
  const dispatch = useDispatch();
  const { list, loading, isListUpdated, isListDeleted } = useSelector(
    (state) => state.listState
  );
  const { id } = useParams();
  const navigate = useNavigate();

  const [addlists, setAddLists] = useState([]);
  const [add, setAdd] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getList(id));
  }, [dispatch, id]);

  const addList = () => {
    setAddLists((prevLists) => [...prevLists, { list: add }]);
    setAdd("");
  };

  const removeList = (index) => {
    setAddLists((prevLists) => prevLists.filter((_, i) => i !== index));
  };

  const handleCheckboxChange = (index) => {
    setAddLists((prevLists) =>
      prevLists.map((item, i) =>
        i === index ? { ...item, done: !item.done } : item
      )
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateList({ id: list?._id, name, lists: addlists }));
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(deleteList(list?._id));
  };
  useEffect(() => {
    if (isListUpdated) {
      dispatch(clearListUpdated());
    }
  }, [isListUpdated, dispatch]);

  useEffect(() => {
    if (isListDeleted) {
      dispatch(clearListDeleted());
      navigate("/");
    }
  }, [isListDeleted, navigate, dispatch]);

  useEffect(() => {
    if (list) {
      setAddLists(list.lists);
      setName(list.name);
    }
  }, [list]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`Details`} />

          <div className="w-full h-[90%] overflow-hidden text-[18px]">
            <div className="w-full h-[80%] bg-mywhite">
              <div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-center outline-none w-full bg-transparent my-3"
                />
              </div>

              <div className="h-full overflow-y-scroll">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4   z-0">
                  {addlists?.map((item, index) => (
                    <div
                      className="flex items-center h-auto justify-between bg-mydark m-2 p-3 rounded-sm "
                      key={index}
                    >
                      <div className="flex ">
                        <div class="checkbox-wrapper-12">
                          <div class="cbx">
                            <input
                              id="cbx-12"
                              checked={item?.done || false}
                              onChange={() => handleCheckboxChange(index)}
                              type="checkbox"
                            />
                            <label for="cbx-12"></label>
                            <svg
                              width="15"
                              height="14"
                              viewbox="0 0 15 14"
                              fill="none"
                            >
                              <path d="M2 8.36364L6.23077 12L13 2"></path>
                            </svg>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <defs>
                              <filter id="goo-12">
                                <fegaussianblur
                                  in="SourceGraphic"
                                  stddeviation="4"
                                  result="blur"
                                ></fegaussianblur>
                                <fecolormatrix
                                  in="blur"
                                  mode="matrix"
                                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                                  result="goo-12"
                                ></fecolormatrix>
                                <feblend
                                  in="SourceGraphic"
                                  in2="goo-12"
                                ></feblend>
                              </filter>
                            </defs>
                          </svg>
                        </div>
                        <p
                          className={`mx-2 text-mywhite ${
                            item?.done ? "line-through " : ""
                          }`}
                        >
                          {item.list}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeList(index)}
                        className={`text-mywhite hover:text-red-500`}
                      >
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full relative h-[10%] bg-mywhite z-50">
              <div className="w-full h-full flex items-center justify-between px-2 sm:px-5">
                <button
                  onClick={(e) => {
                    const confimation = window.confirm(
                      "Are you sure you want to delete?"
                    );
                    if (confimation) {
                      deleteHandler(e);
                    }
                  }}
                  type="submit"
                  className="bg-mydark w-auto  text-mywhite p-3 rounded-sm"
                >
                  Delete
                </button>
                <button
                  onClick={submitHandler}
                  type="submit"
                  className="bg-mydark w-auto text-mywhite p-3  rounded-sm"
                >
                  Save
                </button>
              </div>
            </div>
            <div className="w-full h-[10%] bg-mywhite relative z-50">
              <div className="w-full h-full flex items-center justify-between px-2 sm:px-5">
                <input
                  className="p-3 outline-none bg-mydark text-mywhite w-full rounded-l-sm"
                  value={add}
                  onChange={(e) => setAdd(e.target.value)}
                  type="text"
                  placeholder="New List"
                />
                <p
                  onClick={addList}
                  className="bg-mydark cursor-pointer text-mywhite p-3 rounded-r-sm"
                >
                  Add
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

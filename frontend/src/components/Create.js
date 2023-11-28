import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createList } from "../actions/listActions";
import { useNavigate } from "react-router-dom";
import { clearListCreated } from "../slices/listSlice";
import MetaData from "../layouts/MetaData";

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isListCreated } = useSelector((state) => state.listState);

  const [lists, setLists] = useState([]);
  const [list, setList] = useState("");
  const [name, setName] = useState("");

  const addList = () => {
    setLists((prevLists) => [...prevLists, { list }]);
    setList("");
  };

  const removeList = (index) => {
    setLists((prevLists) => prevLists.filter((_, i) => i !== index));
  };

  const handleCheckboxChange = (index) => {
    setLists((prevLists) =>
      prevLists.map((item, i) =>
        i === index ? { ...item, done: !item.done } : item
      )
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createList({ name, lists }));
  };

  useEffect(() => {
    if (isListCreated) {
      navigate("/");
      dispatch(clearListCreated());
    }
  }, [isListCreated, navigate, dispatch]);

  return (
    <>
      <MetaData title={`Create`} />
      <div className="w-full h-[90%] text-[18px]">
        <div className="w-full h-[100%] bg-mywhite flex items-center justify-center ">
          <form onSubmit={submitHandler} className="w-full  h-full ">
            <div className="w-full h-[10%] ">
              <input
                onChange={(e) => setName(e.target.value)}
                required
                value={name}
                className="bg-mygreen outline-none px-3 py-4 w-full text-center text-mywhite"
                type="text"
                placeholder="List Title"
              />
            </div>
            <div className="w-full h-[70%]   text-mywhite ">
              <div className="h-full overflow-y-scroll">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4   z-0">
                  {lists.map((item, i) => (
                    <div
                      className="flex items-center justify-between bg-mydark m-2 p-3 rounded-sm "
                      key={i}
                    >
                      <div className="flex ">
                        <div class="checkbox-wrapper-12">
                          <div class="cbx">
                            <input
                              id="cbx-12"
                              checked={item?.done || false}
                              onChange={() => handleCheckboxChange(i)}
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
                          className={`mx-2 ${
                            item?.done ? "line-through " : ""
                          }`}
                        >
                          {item.list}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeList(i)}
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
              <div className="w-full h-full flex items-center justify-end px-2 sm:px-5">
                <button
                  type="submit"
                  className="bg-mydark text-mywhite p-3 rounded-md "
                >
                  Save
                </button>
              </div>
            </div>
            <div className="w-full h-[10%] bg-mywhite relative z-50">
              <div className="w-full h-full flex items-center justify-between px-2 sm:px-5">
                <input
                  className="p-3 outline-none bg-mydark text-mywhite w-full rounded-l-sm"
                  value={list}
                  onChange={(e) => setList(e.target.value)}
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
          </form>
        </div>
      </div>
    </>
  );
}

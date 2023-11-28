import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createList } from "../actions/listActions";
import { useNavigate } from "react-router-dom";
import { clearListCreated } from "../slices/listSlice";

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
      <div className="w-full h-[90%] ">
        <div className="w-full h-[100%] bg-mywhite flex items-center justify-center ">
          <form onSubmit={submitHandler} className="w-full sm:w-4/6 h-full ">
            <div className="w-full h-[10%] ">
              <input
                onChange={(e) => setName(e.target.value)}
                required
                value={name}
                className="bg-mygreen outline-none px-3 py-2 w-full text-center text-mywhite"
                type="text"
                placeholder="List Title"
              />
            </div>
            <div className="w-full h-[80%] relative text-mywhite overflow-y-scroll">
              {lists.map((item, i) => (
                <div
                  className="flex items-center justify-between bg-mydark m-2 p-3 rounded-sm "
                  key={i}
                >
                  <div className="flex ">
                    <input type="checkbox" />
                    <p className="mx-2">{item.list}</p>
                  </div>
                  <p>Delete</p>
                </div>
              ))}

              <div className="w-full sm:w-7/12 md:w-8/12 fixed bottom-14 flex items-center justify-end p-3 md:p-5">
                <button
                  type="submit"
                  className="bg-mydark text-mywhite px-3 py-2 rounded-md "
                >
                  Save
                </button>
              </div>
            </div>

            <div className="w-full h-[10%] ">
              <div className="w-full h-full flex items-center justify-between px-2 sm:px-5">
                <input
                  className="py-2 px-3 outline-none bg-mydark text-mywhite w-full rounded-l-sm"
                  value={list}
                  onChange={(e) => setList(e.target.value)}
                  type="text"
                  placeholder="New List"
                />
                <p
                  onClick={addList}
                  className="bg-mydark cursor-pointer text-mywhite px-3 py-2 rounded-r-sm"
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

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLists } from "../actions/listActions";
import MetaData from "../layouts/MetaData";

export default function Lists() {
  const dispatch = useDispatch();

  const { lists, loading } = useSelector((state) => state.listState);
  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  const finished = (ls) => {
    let count = 0;
    ls.forEach((l) => {
      if (l.done) {
        count++;
      }
    });

    return count;
  };

  return (
    <>
      <MetaData title={`Home`} />
      <div className="w-full h-[90%] text-[18px]">
        <div className="w-full h-[90%] bg-mywhite ">
          <div className="h-full overflow-y-scroll">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  ">
              {lists?.map((l) => (
                <Link
                  to={`/${l?._id}/details`}
                  className="bg-mydark flex items-center justify-between w-fulll m-3 h-auto p-3 px-5 md:py-4 cursor-pointer"
                  key={l?._id}
                >
                  <div className="flex items-center justify-center">
                    <i className="fa-solid fa-list-check text-mywhite "></i>

                    <h2 className="text-mywhite text-center mx-3">{l?.name}</h2>
                  </div>

                  <div className="flex items-center justify-center">
                    <p className="text-mywhite">{l?.lists?.length}</p>
                    <sup className="text-mylight mx-1">
                      {finished(l?.lists)}
                    </sup>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-[10%] bg-mywhite relative z-50">
          <div className="w-full h-full flex items-center justify-end px-5">
            <Link
              to="/create"
              className="bg-mydark text-mywhite text-[18px] p-3 md:p-4 rounded-sm"
            >
              New
            </Link>
          </div>
        </div>{" "}
      </div>
    </>
  );
}

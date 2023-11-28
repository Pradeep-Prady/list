import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full h-[10%] bg-mydark text-mywhite flex items-center justify-between px-7 md:px-32">
      <Link to="/" className="text-xl ">
        List
      </Link>
      <div>Pradeep M</div>
    </div>
  );
}

import React from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link to={"/login"}>
        <button>login</button>
      </Link>
      <Link to={"/sign-up"}>
        <button>sign up</button>
      </Link>
    </div>
  );
}

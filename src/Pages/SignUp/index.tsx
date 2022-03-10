import React from "react";
import { Navigate } from "react-router-dom";

import SignUpForm from "./SignUpForm";

export default function SignUp() {
  return (
    <div className="homePage flex items-center justify-center">
       <SignUpForm />
    </div>
  );
}

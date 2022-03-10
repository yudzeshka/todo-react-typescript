import React from "react";
import { Navigate } from "react-router-dom";

import LoginForm from "./LogInForm";

export default function Login() {
  return (
    <div className="homePage flex items-center justify-center">
       <LoginForm />
    </div>
  );
}

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IRequestOptions } from "../types/data";
import { Navigate } from "react-router-dom";
import BaseButton from "../components/common/BaseButton/BaseButton";
import { ILogInFormValues } from "../types/data";

export default function LogIn() {
  const [currentUser, setCurrentUser] = React.useState<any>(null);

  const initialValues: ILogInFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: ILogInFormValues) => {
    const logInHeader = new Headers();
    logInHeader.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: values.email,
      password: values.password,
    });

    const requestOptions: IRequestOptions = {
      method: "POST",
      headers: logInHeader,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      "https://api-nodejs-todolist.herokuapp.com/user/login",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => setCurrentUser(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };

  currentUser && localStorage.setItem("token", currentUser.token);

  return currentUser ? (
    <Navigate to={"/main"} />
  ) : (
    <div className="formWrapper">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .required("is required")
            .max(20, "should be less than 20 characters")
            .min(7, "to short"),
          email: Yup.string().email("Invalid email").required("Required"),
        })}
      >
        {({ errors, touched, isValid }) => (
          <Form className="form">
            <Field name="email" placeholder="Email" />
            {errors.email && touched.email ? (
              <ErrorMessage name="email" component="div" className="error" />
            ) : null}
            <Field name="password" placeholder="Password" type="password" />
            {errors.password && touched.password ? (
              <ErrorMessage name="password" component="div" className="error" />
            ) : null}
            <BaseButton disabled={!isValid} text={"Log In"} type={"submit"} />
          </Form>
        )}
      </Formik>
    </div>
  );
}

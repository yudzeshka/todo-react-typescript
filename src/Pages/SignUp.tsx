import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IRequestOptions } from "../types/data";
import { Navigate } from "react-router-dom";
import BaseButton from "../components/common/BaseButton/BaseButton";
import { ISignUpFormValues } from "../types/data";

export default function SignUpForm() {
  const [currentUser, setCurrentUser] = React.useState<any>(null);

  const initialValues: ISignUpFormValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values: ISignUpFormValues) => {
    const signUpHeader = new Headers();
    signUpHeader.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    const requestOptions: IRequestOptions = {
      method: "POST",
      headers: signUpHeader,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      "https://api-nodejs-todolist.herokuapp.com/user/register",
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
          name: Yup.string().required("is required"),
          password: Yup.string()
            .required("is required")
            .max(20, "should be less than 20 characters")
            .min(7, "to short"),
          email: Yup.string().email("Invalid email").required("Required"),
        })}
      >
        {({ errors, touched, isValid }) => (
          <Form className="form">
            <Field name="name" placeholder="Name" />
            {errors.password && touched.password ? (
              <ErrorMessage name="name" component="div" className="error" />
            ) : null}
            <Field name="email" placeholder="Email" />
            {errors.email && touched.email ? (
              <ErrorMessage name="email" component="div" className="error" />
            ) : null}
            <Field name="password" placeholder="Password" type="password" />
            {errors.password && touched.password ? (
              <ErrorMessage name="password" component="div" className="error" />
            ) : null}
            <BaseButton disabled={!isValid} text={"Sign Up"} type={"submit"} />
          </Form>
        )}
      </Formik>
    </div>
  );
}

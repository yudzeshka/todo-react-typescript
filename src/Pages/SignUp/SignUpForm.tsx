import React from "react";
import { Formik, Form, Field, ErrorMessage, validateYupSchema } from "formik";
import * as Yup from "yup";
import { IRequestOptions } from "../../types/data";
import { Navigate } from "react-router-dom";
import Button from "../../components/Button";
interface MyFormValues {
  name: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const [currentUser, setCurrentUser] = React.useState<any>(null);

  const initialValues: MyFormValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values: MyFormValues) => {
    console.log({ values });

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

    fetch(
      "https://api-nodejs-todolist.herokuapp.com/user/register",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => setCurrentUser(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };

  return currentUser ? (
    <Navigate to={`/${currentUser.token}`} />
  ) : (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("is required"),
        password: Yup.string()
          .required("is required")
          .max(20, "should be less than 20 characters")
          .min(7, "to short"),
        email: Yup.string().required("is required"),
      })}
    >
      {() => (
        <Form className="form">
          <Field name="name" placeholder="Name" />
          <ErrorMessage name="name" component="div" className="error" />
          <Field name="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" className="error" />
          <Field name="password" placeholder="Password" type="password" />
          <ErrorMessage name="password" component="div" className="error" />
          <Button text={"Sign Up"} type={"submit"} />
        </Form>
      )}
    </Formik>
  );
}

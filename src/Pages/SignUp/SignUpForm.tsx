import React from "react";
import { Formik, Form, Field, ErrorMessage, validateYupSchema } from "formik";
import * as Yup from "yup";

interface MyFormValues {
  name: string;
  email: string;
  password: string;
}

interface IRequestOptions {
  method: string;
  headers: any;
  body: any;
  redirect: any;
}

export default function SignUpForm() {

const [currentUser, setCurrentUser] = React.useState({})

  const initialValues: MyFormValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values: MyFormValues) => {
    console.log({ values });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    const requestOptions: IRequestOptions = {
      method: "POST",
      headers: myHeaders,
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

  return (
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
        <Form className=" flex flex-col">
          <Field name="name" placeholder="Name" />
          <ErrorMessage name="name" component="div" className="error" />
          <Field name="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" className="error" />
          <Field name="password" placeholder="Password" type="password" />
          <ErrorMessage name="password" component="div" className="error" />
          <button type="submit">Sign Up</button>
        </Form>
      )}
    </Formik>
  );
}

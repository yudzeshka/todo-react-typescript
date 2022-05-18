import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IRequestOptions } from "../types/data";
import { Navigate } from "react-router-dom";
import BaseButton from "../components/common/BaseButton/BaseButton";
import { ISignUpFormValues } from "../types/data";
import { useDispatch, useSelector } from "react-redux";
import { USER_SIGN_UP } from "../redux/types";

export default function SignUpForm() {
  const [currentUser, setCurrentUser] = React.useState<any>(null);
  const dispatch = useDispatch();
  const store: any = useSelector((s) => s);

  React.useEffect(() => {
    setCurrentUser(store.user.user);
  }, [store]);
  const initialValues: ISignUpFormValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values: ISignUpFormValues) => {
    const raw = JSON.stringify({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    dispatch({ type: USER_SIGN_UP, raw });
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

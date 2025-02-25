import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../Styles/Register.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setUsername("");
    setPassword("");
  }, []);

  // const initialValues = {
  //   username: "",
  //   password: "",
  // };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("Username is required"),
    password: Yup.string().min(3).max(15).required("password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log("Response from backend", data);

      if (response.ok) {
        //store the user's username and userId in localStorage after successfull login
        sessionStorage.setItem(
          "user",
          JSON.stringify({ username: data.username, userId: data.userId })
        );

        alert("Login sueccessful");
        setIsLoggedIn(true);
        navigate("/");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Error during login", err);
      alert("Something went wrong! Please try again");
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ username, password }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="formContainer">
          <label>Username:</label>
          <ErrorMessage
            name="username"
            component="div"
            className="errorMessage"
          />
          <Field
            autoComplete="Off"
            name="username"
            id="inputUsername"
            placeholder="Your username"
          />
          <label>Password:</label>
          <ErrorMessage
            name="password"
            component="div"
            className="errorMessage"
          />
          <Field
            autoComplete="Off"
            type="password"
            name="password"
            id="inputPassword"
            placeholder="Your password"
          />
          <button type="submit">Log in</button>
        </Form>
      </Formik>
    </div>
  );
}

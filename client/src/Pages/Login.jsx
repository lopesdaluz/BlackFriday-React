import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../Styles/Register.css";

export function Login() {
  const initialValues = {
    username: "",
    password: "",
  };

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
        alert("Login sueccessful");
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
        initialValues={initialValues}
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

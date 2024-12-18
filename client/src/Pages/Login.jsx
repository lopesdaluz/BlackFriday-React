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

  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
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
          <button type="Submit">Log in</button>
        </Form>
      </Formik>
    </div>
  );
}

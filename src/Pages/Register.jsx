import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../Styles/Register.css";

export function Register() {
  const initialValues = {
    name: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(15).required(),
    lastname: Yup.string().min(3).max(15).required(),
    email: Yup.string().min(3).max(15).required(),
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(3).max(15).required(),
  });
  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        <Form className="formContainer">
          <label>Name:</label>
          <ErrorMessage name="name" component="div" className="errorMessage" />
          <Field
            autoComplete="off"
            id="inputName"
            name="name"
            placeholder="Your name"
          />
          <label>Lastname:</label>
          <ErrorMessage
            name="lastname"
            component="div"
            className="errorMessage"
          />
          <Field
            autoComplete="off"
            id="inputLastname"
            name="lastname"
            placeholder="Your lastname"
          />
          <label>email:</label>
          <ErrorMessage name="email" component="div" className="errorMessage" />
          <Field
            autoComplete="off"
            id="inputEmail"
            name="email"
            placeholder="Your email"
          />
          <label>Username:</label>
          <ErrorMessage
            name="username"
            component="div"
            className="errorMessage"
          />
          <Field
            autoComplete="off"
            id="inputUsername"
            name="username"
            placeholder="Your username"
          />
          <label>Password:</label>
          <ErrorMessage
            name="password"
            component="div"
            className="errorMessage"
          />
          <Field
            autoComplete="off"
            id="inputPassword"
            name="password"
            placeholder="Your password"
          />
          <button>Sign up!</button>
        </Form>
      </Formik>
    </div>
  );
}

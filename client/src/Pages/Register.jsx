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
    // email: Yup.string().min(3).max(15).required(),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(3).max(15).required(),
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log("Response from backend:", data);

      if (response.ok) {
        alert("user registered successfully");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Error during registration:", err);
      alert("Something went wrong! Please try again later");
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
          <button type="submit">Sign up!</button>
        </Form>
      </Formik>
    </div>
  );
}

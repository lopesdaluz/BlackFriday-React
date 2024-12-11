import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import "../Styles/Register.css"


export function Login() {
  const initialValues = {
    username: "",
    password: "",
  }
 
  const validationSchema = Yup.object()shape({
    username: Yup.string().min(3).max(15).required("Username is required"),
    password: Yup.string().min(3).max(15).required("password is required"),
  })

  return(
    <div>
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      >
       <Form>
        </Form> 
      </Formik>
    </div>
  )
}

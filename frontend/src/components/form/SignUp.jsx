import axios from "axios";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormLayout from "../../layout/FormLayout";
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import Title from "./Title";

const SignupForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        values
      );

      if (response.status === 201) {
        // toast.success("Sign up successful! Redirecting to login...");
        setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      console.error(
        "Sign up failed:",
        error.response ? error.response.data : error.message
      );
      // toast.error("Sign up failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <FormLayout>
        <Title title_info="Sign Up" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            isSubmitting,
          }) => (
            <Form className="w-full flex flex-col gap-5">
              <AuthInput
                label="Username"
                placeholdertext="Enter your username"
                input_type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                icon="user.svg"
                error={touched.username && errors.username}
              />
              <AuthInput
                label="Email"
                placeholdertext="Enter your email"
                input_type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                icon="mail.svg"
                error={touched.email && errors.email}
              />
              <AuthInput
                label="Password"
                placeholdertext="Enter your password"
                input_type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                icon="lock.svg"
                error={touched.password && errors.password}
              />

              <AuthButton
                text={isSubmitting ? "Signing up..." : "Sign Up"}
                isdisabled={isSubmitting}
              />
              <section className=" ml-1 text-sm opacity-50 font-semibold">
                <Link to="/">Already have an account?</Link>
              </section>
            </Form>
          )}
        </Formik>
        {/* <ToastContainer position="top-right" autoClose={2000} hideProgressBar /> */}
      </FormLayout>
    </div>
  );
};

export default SignupForm;

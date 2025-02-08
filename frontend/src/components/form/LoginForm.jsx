import axios from "axios";
import { Form, Formik } from "formik";
import { toast, Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useTasks } from "../../context/Taskcontext";
import FormLayout from "../../layout/FormLayout";
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import Title from "./Title";

const LoginForm = () => {
  const navigate = useNavigate();
  const { loadTasks } = useTasks();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        values
      );

      if (response.status === 200) {
        toast.success("Login successful! Redirecting...");
        console.log("Login successful. Redirecting to Home...");
        localStorage.setItem("authToken", response.data.token);
        loadTasks();

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      toast.error("Login failed! Please try again...");
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <FormLayout>
        <Title title_info="Login" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            isSubmitting,
            touched,
            errors,
          }) => (
            <Form className="w-full flex flex-col gap-7 mt-3">
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
                text={isSubmitting ? "Logging..." : "Login"}
                isdisabled={isSubmitting ? true : false}
              />
              <section className=" ml-1 text-sm opacity-50 mb-5">
                <p>
                  {" "}
                  {t("No Account?")}{" "}
                  <Link to="/signup">{t("Create one!")}</Link>
                </p>
              </section>
              <Toaster position="top-left" reverseOrder={false} />
            </Form>
          )}
        </Formik>
      </FormLayout>
    </div>
  );
};

export default LoginForm;

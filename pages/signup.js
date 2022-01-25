import Head from "next/head";
import Link from 'next/link';
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { cookieValidateLogin } from "../middleware/middleware";
import Alert from "../components/alert";
const endpoint =
  process.env.NODE_ENV === "production" ? `` : "http://localhost:3000";

// console.log(endpoint);
export async function getServerSideProps({ req, res }) {
  try {
    cookieValidateLogin(req, res);
    return { props: {} };
  } catch (error) {
    return { props: {} };
  }
}

const Signup = ({}) => {
  const router = useRouter();
  const [showAlert, setshowAlert] = useState({ msg: "", type: "danger" });
  const [loading, setloading] = useState(false);

  const validationSchema  = Yup.object().shape({
    username: Yup.string()
            .required('Username is required')
            .min(6, 'Password must be at least 6 characters'),
    email: Yup.string().email('Must be valid email!').required('Email is required'),
    password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
   });
  
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const signup = async (data) => {
    setloading(true);
    setshowAlert({ msg: "", type: "" });
    let payload = {
      email : data.email,
      username: data.username,
      password: data.password,
    };

    try {
      let res = await fetch(`${endpoint}/api/user/signup`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      if (!res.success) {
        setloading(false);
        if (res.message === "invalid_credential") {
          setshowAlert({
            msg: "User creadentials are not valid",
            type: "danger",
          });
        } else {
          setshowAlert({
            msg: "Server Error",
            type: "danger",
          });
        }
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  return (
    <>
      <Head>
        <title>User Sign Up</title> 
      </Head>
      <div className="d-flex">
        {" "}
        <div className={styles.authWrapper}>
          <div
            className={`${styles.authInner} col-10 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4 `}
          >
            {showAlert.msg && <Alert {...showAlert} />}

            <form onSubmit={(e) => e.preventDefault()}>
              <h3>Sign Up</h3>
              <div className="mb-3 ">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  id="email"
                  className={
                    errors.email ? "form-control is-invalid" : "form-control"
                  }
                  placeholder="Enter email"
                  {...register("email", {
                    required: "You must specify an email",
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div className="mb-3 ">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  className={
                    errors.username ? "form-control is-invalid" : "form-control"
                  }
                  placeholder="Enter username"
                  {...register("username", {
                    required: "You must specify an Username",
                  })}
                />
                {errors.username && (
                  <div className="invalid-feedback">
                    {errors.username.message}
                  </div>
                )}
              </div>
              <div className="mb-3 ">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className={
                    errors.password ? "form-control is-invalid" : "form-control"
                  }
                  placeholder="Create a Password"
                  {...register("password", {
                    required: "You must specify a password",
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                  <button
                      type="submit"
                      id="submit"
                      className="btn btn-primary btn-block"
                      onClick={handleSubmit(signup)}
                      disabled={loading}
                    >Sign Up </button> 

                   <div className={styles.class__signup}> Already have account?  <Link href="/admin"><a>Login Here</a></Link>
                   </div>
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm me-1"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
               </div> 
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;

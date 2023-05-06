import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";
import { loginAction } from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import "./Login.css";
import classNames from "classnames";
import * as Yup from "yup";

const Login = () => {
    const [loadingIcon, setloadingIcon] = useState("");
    const [loading, setloading] = useState(false);

    const dispatch = useDispatch();

    let history = useHistory();
    const validationSchema = Yup.object().shape({
        userName: Yup.string().required("This field is required.").max(254, "Maximum length is 254 characters"),
        userPassword: Yup.string().required("This field is required.").max(100, "Maximum length is 100 characters"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            userName: "",
            userPassword: "",
        },
        validate: (data) => {
            let errors = {};
            return errors;
        },
        onSubmit: async (data) => {
            // setloadingIcon("pi pi-spin pi-spinner");
            // setloading(true);
            console.log("data", data);
            if (data !== null) {
                localStorage.setItem("userName", data.userName);
                localStorage.setItem("userPassword", data.userPassword);
            }
            const res = await dispatch(loginAction(data, "/login"));
            setloading(false);
            setloadingIcon("");
            if (res?.data.login) {
                history.push("/dashboard");
            }

            // if (localStorage.getItem("userName") === "employee@gmail.com" && localStorage.getItem("userPassword") === "123456") {
            //     history.push("/");
            // }
            //  else {
            //     alert("please enter correct userName userPassword");
            // }
        },
    });
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <div className="login_body">
            <div align="center" style={{ marginTop: "4%", marginBottom: "1%" }}>
                {/* <img src={LogoImage} alt="" width={"50%"} /> */}
            </div>
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <form action="#" className="login_form" onSubmit={formik.handleSubmit}>
                        <div className="p-mb-4">
                            <h1 className="login_h1">Login</h1>
                        </div>
                        <div className="p-mt-4 credentail_wrapper">
                            <input id="userName" className={classNames({ "p-invalid": isFormFieldValid("userName") }, "login_input")} name="userName" value={formik.values.userName} placeholder="Enter Email Address " onChange={formik.handleChange} type="text" />
                            {getFormErrorMessage("userName")}
                            <input className={classNames({ "p-invalid": isFormFieldValid("userPassword") }, "login_input")} name="userPassword" placeholder="Enter Password" value={formik.values.userPassword} onChange={formik.handleChange} type="password" />
                            {getFormErrorMessage("userPassword")}
                            <div className="p-mt-2 button_wrapper">
                                <Button className="login_button mt-5" label="Login" icon={loadingIcon || ""} iconPos="right" />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1 className="login_h1">Welcome!</h1>
                            <p className="login_p">Please login to access UMGT Portal</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <p className="login_p"> Powered by UMGT</p>
            </footer>
        </div>
    );
};

export default Login;

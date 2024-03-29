import React, {useEffect, useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { singUp } from "../../redux/actions/userSignActions";
import logo from "../../assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import GoogleSignUp from "../GoogleButtons/GoogleSignUp";
//MUI 


export default function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loggedUser = useSelector((state) => state.userSignReducer.userData)
    const [googleSeen, setGoogleSeen] = useState(false)
    useEffect(() => {
        if(loggedUser){
            navigate("/home")
        }
        setGoogleSeen(true)
    }, [loggedUser])


    const formik = useFormik({
        initialValues: {
            userName: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, "Must be 6 characters or more").required("Required"), //string().matches^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$ //  8-16 may minus Puede tener otros símbolos.
        }),
        onSubmit: async (values) => {
            console.log(values, "values");
            await dispatch(singUp({...values, from: "signUp"}))
            formik.handleReset();
        },
    });
    return (
        <div className="h-screen gradient-form bg-gray-200 md:h-screen">
            <div className="py-3 px-1 h-full">
                <div className="flex justify-center items-center flex-wrap h-3/6 g-6 text-gray-800">
                    <div className="xl:w-10/12">
                        <div className="block bg-white shadow-lg rounded-lg">
                            <div className="lg:flex lg:flex-wrap g-0">
                                <div className="lg:w-6/12 px-4 md:px-0">
                                    <div className="md:p-3 md:mx-6">
                                        <div class="text-center">
                                            <img class="mx-auto w-48"
                                                src={logo}
                                                alt="logo" />
                                            {/* <h4 class="text-xl font-semibold mt-1 mb-12 pb-1">Welcome to Arterest</h4> */}
                                        </div>
                                        <form action="" onSubmit={formik.handleSubmit}>
                                            <div className="text-4xl font-bold text-gray-500 m-5"><h1>Sign Up</h1></div>
                                            <div>
                                                {/* <label htmlFor="userName" className="text-gray-500">Name</label> */}
                                                {/* <input
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    id="userName"
                                                    name="userName"
                                                    type="text"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.userName}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.userName && formik.errors.userName ? (
                                                    <div className="text-sm text-red-500">{formik.errors.userName}</div>
                                                ) : null} */}
                                                {/* {formik.errors.name && (
                            <p className="text-sm text-red-500">{formik.errors.name}</p>
                        )} */}
                                            </div>

                                            <div>
                                                {/* <label htmlFor="email" className="text-gray-500">Email</label>
                                                <input
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.email}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.email && formik.errors.email ? (
                                                    <div className="text-sm text-red-500">{formik.errors.email}</div>
                                                ) : null} */}
                                            </div>

                                            {/* <div>
                                                <label htmlFor="password" className="text-gray-500">Password</label>
                                                <input
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.password}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.password && formik.errors.password ? (
                                                    <div className="text-sm text-red-500">{formik.errors.password}</div>
                                                ) : null}
                                            </div> */}

                                            {/* <div className="text-center pt-1 mb-5 pb-1"><button type="submit" className="inline-block px-6 py-2.5  font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-500 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 bg-white text-gray-500">Sign Up</button></div> */}


                                            <div
                                                class="flex items-center justify-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                                {/* <p class="text-center font-semibold mx-4 mb-0">OR</p> */}
                                            </div>                                        
                                            {googleSeen ? <GoogleSignUp /> : null}
                                            <div className="flex items-center justify-left pb-6">Already have an account? <span className="inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-gray-100 focus:text-blue-700 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 active:text-blue-800 transition duration-300 ease-in-out"><Link to={"/signIn"} >Login here</Link></span></div>
                                        </form>
                                    </div>
                                </div>
                                <div class="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-white text-gray-100" >
                                    <div class="text-gray-700 px-4 py-6 md:p-12 md:mx-6">
                                    <h4 class="text-2xl font-semibold mb-6">Use your Google Account to access to my whole list of artworks</h4>
                                        {/* <p class="text-x1">
                                            Arterest is a website that was shaped with the goal of empowering artists and creating opportunities for success. It’s the place for artists to showcase their work with others.
                                        </p> */}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
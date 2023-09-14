import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, TextField } from "@mui/material";
import { setUser } from '../../reducer/userProfile';
import { useDispatch } from "react-redux";
import { postAPI } from "../../configs/api";

function Login() {
  const next = useNavigate();
  const dispatch = useDispatch();

  // const fakeApi = [
  //   {
  //     name: "user1",
  //     fullName: "user1",
  //     email: "user1@gmail.com",
  //     password: "Trung@123",
  //     role: "SUPERADMIN",
  //     id: 0,
  //   },
  //   {
  //     name: "user2",
  //     fullName: "user2",
  //     email: "user2@gmail.com",
  //     password: "Trung@123",
  //     role: "ADMIN",
  //     id: 1,
  //   },
  //   {
  //     name: "user3",
  //     fullName: "user3",
  //     email: "user3@gmail.com",
  //     password: "Trung@123",
  //     role: "CLIENT",
  //     id: 2,
  //   },
  // ];

  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("email không hợp lệ").required("bắt buộc"),
      password: yup
        .string()
        .min(8)
        .matches(
          regex,
          "Mật khẩu phải chứa ít nhất một ký tự viết hoa, một ký tự viết thường, một số và một ký tự đặc biệt"
        )
        .required("bắt buộc"),
    }),
    onSubmit: (values) => {
      console.log(1);
      // console.log(">>values", values);
      // const { email, password } = values;
      // const user = fakeApi.find((user) => user.email === email && user.password === password);
    
      // if (user) {
      //   dispatch(setUser(user));
      //   next("/ListUser");
      //   localStorage.setItem('role',user.role)
      //   localStorage.setItem('token', user.token)
      // } else {
      //   toast.error("Thông tin đăng nhập không hợp lệ. Vui lòng thử lại!");
      // }

      postAPI('http://localhost:8080/user/signin', {  
        userName: values.userName,
        passwordUser:values.password
      }).then((res)=> {
        const dataLogin = res.data.data
        dispatch(setUser(dataLogin));
        localStorage.setItem('roleUser', dataLogin.role)
        localStorage.setItem('token', dataLogin.token)
        console.log(dataLogin.role);
        toast.success('Đăng nhập thành công.')
        next("/ListUser")
      }).catch((err) => {
        console.log(err);
        toast.error("Thông tin đăng nhập không hợp lệ. Vui lòng thử lại!");
      })
    },
  });
  // console.log(1, dataUser);
  // localStorage.setItem('role', dataUser.role)

  const handleToRegister = () => {
    next("/Register");
  };

  return (
    <>
      <div className="Login">
        <div className="form-login">
          <form onSubmit={formik.handleSubmit}>
            <p id="title">LogIn</p>
            <div className="inp-box">
              <TextField
                id="userName"
                name="userName"
                label="userName"
                type="text"
                fullWidth
                margin="normal"
                variant="outlined"
                value={formik.values.userName}
                onChange={formik.handleChange}
                error={formik.touched.userName && Boolean(formik.errors.userName)}
                helperText={formik.touched.userName && formik.errors.userName}
              />
              <TextField
                id="passWordUser"
                name="passWordUser"
                label="Mật khẩu"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                value={formik.values.passWordUser}
                onChange={formik.handleChange}
                error={
                  formik.touched.passWordUser && Boolean(formik.errors.passWordUser)
                }
                helperText={formik.touched.passWordUser && formik.errors.passWordUser}
              />
            </div>
            <Box mt={5} className='btn-box'>
              <Button type="submit" variant="contained" color="primary">
                Đăng nhập
              </Button>
              <p onClick={handleToRegister} id="btn-Register">
                Đăng ký
              </p>
            </Box>
          </form>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}

export default Login;

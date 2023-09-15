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

  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      userName: yup.string().required("bắt buộc"),
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
      postAPI('', {  
        userName: values.userName,
        passwordUser:values.password
      }).then((res)=> {
        dispatch(setUser(res.data.data));
        const dataLogin = res.data.data
        localStorage.setItem('token', dataLogin.token)
        localStorage.setItem('roleUser', dataLogin.role)
        toast.success('Đăng nhập thành công.')
        next("/ListUser")
      }).catch((err) => {
        console.log(err);
        toast.error("Thông tin đăng nhập không chính xác. Vui lòng thử lại!");
      })
    },
  });

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
                label="Tên đăng nhập"
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
                id="password"
                name="password"
                label="Mật khẩu"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

import { ToastContainer, toast } from "react-toastify";
import { Button, TextField, Box } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { postAPI } from "../../configs/api";

const Register = () => {
  const next = useNavigate();
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  const formik = useFormik({
    initialValues: {
      name: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("bắt buộc"),
      fullName: yup.string().required("bắt buộc"),
      email: yup.string().email("email không hợp lệ").required("bắt buộc"),
      password: yup
        .string()
        .min(8)
        .matches(
          regex,
          "Mật khẩu phải chứa ít nhất một ký tự viết hoa, một ký tự viết thường, một số và một ký tự đặc biệt"
        )
        .required("bắt buộc"),
      confirmPassword: yup
        .string()
        .required("Xác nhận mật khẩu là bắt buộc")
        .oneOf(
          [yup.ref("password"), null],
          "Xác nhận mật khẩu không trùng khớp với mật khẩu"
        ),
    }),
    onSubmit: (values) => {
      postAPI("", {
        name: values.name,
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      })
        .then((res) => {
          toast.success("Đăng kí thành công ");
          next("/Login");
        })
        .catch((err) => {
          toast.error(err);
        });
    },
  });

  function handleToLogin() {
    next('/Login')
  }

  return (
    <div className="Register">
      <div className="Register-form">
        <p id="title">Register</p>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="name"
            name="name"
            label="Tên người dùng"
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            id="fullName"
            name="fullName"
            label="Tên đầu đủ"
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Box mt={5} className='btn-box'>
            <Button type="submit" variant="contained" color="primary">
              Đăng ký
            </Button>
            <p onClick={handleToLogin} id="btn-Register">
                Đăng nhập
              </p>
          </Box>
        </form>
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
    </div>
  );
};

export default Register;

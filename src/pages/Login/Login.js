import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, TextField } from "@mui/material";
import { setUser } from '../../reducer/userProfile';
import { useDispatch } from "react-redux";

function Login() {
  const next = useNavigate();
  const dispatch = useDispatch();

  const fakeApi = [
    {
      name: "user1",
      fullName: "user1",
      email: "user1@gmail.com",
      password: "Trung@123",
      role: "SUPERADMIN",
      id: 0,
    },
    {
      name: "user2",
      fullName: "user2",
      email: "user2@gmail.com",
      password: "Trung@123",
      role: "ADMIN",
      id: 1,
    },
    {
      name: "user3",
      fullName: "user3",
      email: "user3@gmail.com",
      password: "Trung@123",
      role: "CLIENT",
      id: 2,
    },
  ];

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
      const { email, password } = values;
      const user = fakeApi.find((user) => user.email === email && user.password === password);
    
      if (user) {
        dispatch(setUser(user));
        next("/ListUser");
        localStorage.setItem('role',user.role)
        localStorage.setItem('token', user.token)
      } else {
        toast.error("Thông tin đăng nhập không hợp lệ. Vui lòng thử lại!");
      }
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

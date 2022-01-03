import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axios from "axios";

import { useHistory } from "react-router-dom";

import { useToasts } from "react-toast-notifications";

// context
import { UserStoreContext } from "../context/UserContext";

//react-hook-form

const schema = yup.object().shape({
  email: yup.string().required("อีเมล์ห้ามว่าง").email("รูปแบบอีเมลไม่ถูกต้อง"),
  password: yup
    .string()
    .required("รหัสผ่านห้ามว่าง")
    .min(3, "รหัสผ่านต้อง 3 ตัวอักษรขึ้นไป"),
});

const LoginPage = () => {
  const history = useHistory();
  const { addToast } = useToasts();

  // context
  const userStore = React.useContext(UserStoreContext);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      // console.log(data);
      //เพิ่มข้อมูลเข้า backend , เช็ค body ของ backend ว่าต้องการให้ส่งอะไรไป
      const apiUrl = `https://api.codingthailand.com/api/login`;
      const resp = await axios.post(apiUrl, {
        email: data.email,
        password: data.password,
      });
      // console.log(resp.data);
      // นำ token เก็บใน localstorage
      localStorage.setItem("token", JSON.stringify(resp.data));

      const urlProfile = "https://api.codingthailand.com/api/profile";
      // เช็ค headers ของ backend
      const respProfile = await axios.get(urlProfile, {
        headers: {
          Authorization: "Bearer " + resp.data.access_token,
        },
      });
      // console.log(respProfile.data.data.user);
      localStorage.setItem(
        "profile",
        JSON.stringify(respProfile.data.data.user)
      );

      addToast("เข้าสู่ระบบเรียบร้อย", { appearance: "success" });
      // history.replace("/");
      // history.go(0)

      // update profile โดยใช้ context
      const profileValue = JSON.parse(localStorage.getItem("profile"));
      userStore.updateProfile(profileValue);
      history.replace("/");
    } catch (error) {
      addToast(error.response.data.message, { appearance: "error" });
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                ref={register}
                className={`${errors.email ? "is-invalid" : ""}`}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.email.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                ref={register}
                className={`${errors.password ? "is-invalid" : ""}`}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.password.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;

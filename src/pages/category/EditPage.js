import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

// react-hook-form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axios from "axios";

import { useHistory, useParams } from "react-router-dom";

//react-hook-form
//validation
const schema = yup.object().shape({
  name: yup.string().required("ชื่อหมวดหมู่ห้ามว่าง"),
});
const EditPage = () => {
  const history = useHistory();
  // id จาก url
  const { id } = useParams();

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  //   const getData = async () => {
  //     const resp = await axios.get(
  //       "https://api.codingthailand.com/api/category/" + id
  //     );
  //     console.log(resp.data);
  //     setValue('name', resp.data.name)
  //   };

  //   // ทำงานก็ต่อเมื่อ id มีการเปลี่ยนแปลง
  //   React.useEffect(() => {
  //     getData();
  //     // นำ warning ออกแต่ต้องมั่นใจว่าเขียนถูกeslint-disable-next-line-react-hook/exhaustive-deps
  //   }, [id]);

  // ถ้าไม่นำเอา disable ออก
  const getData = React.useCallback(async () => {
    const resp = await axios.get(
      "https://api.codingthailand.com/api/category/" + id
    );
    // console.log(resp.data);
    setValue("name", resp.data.name);
  }, [id, setValue]);

  // ทำงานก็ต่อเมื่อ id มีการเปลี่ยนแปลง
  React.useEffect(() => {
    getData();
    // นำ warning ออกแต่ต้องมั่นใจว่าเขียนถูกeslint-disable-next-line-react-hook/exhaustive-deps
  }, [getData]);

  const onSubmit = async (data) => {
    // console.log(data);
    // ส่งข้อมูลไปแก้ไขที่ bankend ดู body ด้วยว่าต้องการข้อมูลอะไร
    const apiUrl = `https://api.codingthailand.com/api/category`;
    const resp = await axios.put(apiUrl, {
      id: id,
      name: data.name,
    });
    alert(resp.data.message) // แก้ไขข้อมูล
    history.replace("/category");
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name">
              <Form.Label>หมวดหมู่ข่าว</Form.Label>
              <Form.Control
                type="text"
                name="name"
                ref={register}
                className={`${errors.name ? "is-invalid" : ""}`}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              บันทึก
            </Button>
          </Form>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default EditPage;

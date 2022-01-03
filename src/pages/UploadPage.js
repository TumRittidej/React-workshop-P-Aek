import React from "react";

import { Col, Row, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useToasts } from "react-toast-notifications";

const SUPPORTED_IMAGE_FORMATS = ["image/jpg", "image/jpeg"];

// Upload File + React-hook-form + Comtom-Validation
const UploadPage = () => {
  const history = useHistory();

  const { addToast } = useToasts();

  const { handleSubmit, errors, register } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    try {
      let fileUpload = data.picture[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileUpload);
      reader.onload = async (e) => {
        let base64Image = e.target.result;
        // console.log(base64Image);
        const urlAPI = "https://api.codingthailand.com/api/upload";
        const resp = await axios.post(urlAPI, {
          picture: base64Image,
        });
        // alert(resp.data.data.message);
        addToast(resp.data.data.message, { appearance: "success" });
        history.replace("/");
      };
    } catch (error) {
      addToast(JSON.stringify(error), { appearance: "error" });
      // console.log(error);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <h1>อัปโหลดรูปภาพ</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="exampleFormControlFile1">Example</label>
              <input
                type="file"
                name="picture"
                ref={register({
                  required: "กรุณาเลือกไฟล์ภาพก่อน",
                  validate: {
                    checkFileType: (value) => {
                      return (
                        value && SUPPORTED_IMAGE_FORMATS.includes(value[0].type)
                      );
                    },
                  },
                })}
                className={`form-control-file ${
                  errors.picture ? "is-invalid" : ""
                }`}
                id="exampleFormControlFile1"
              />
              {errors.picture && errors.picture.type === "required" && (
                <div className="invalid-feedback">{errors.picture.message}</div>
              )}
              {errors.picture && errors.picture.type === "checkFileType" && (
                <div className="invalid-feedback">
                  รองรับรูปภาพเฉพาะไฟล์นามสกุล .jpg และ jpeg
                </div>
              )}
            </div>

            <button className="btn btn-primary" type="submit">
              Upload...
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadPage;

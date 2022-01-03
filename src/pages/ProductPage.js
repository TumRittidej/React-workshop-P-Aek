import React from "react";

import { Table, Image, Badge, Spinner } from "react-bootstrap";
import axios from "axios";
// libary format date
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { BsEyeFill } from "react-icons/bs";
// คล้ายๆ tag a ธรรมดา
import { Link } from "react-router-dom";

const ProductPage = () => {
  // ดูชนิดข้อมูลหลังบ้านก่อนและรับชนิตตามข้อมูลให้ถูก
  // useState เปลี่ยนค่าที่มีการ re-render
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  // useRef เก็บตัวแปรให้คงที่เสมอไม่ขึ้นกับการ re-render อาจใช้กับ form, input
  const cancelToken = React.useRef(null);

  const getData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        "https://api.codingthailand.com/api/course",
        {
          cancelToken: cancelToken.current.token,
        }
      );
      //   console.log(resp.data.data);
      setProduct(resp.data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // จะเรียกใช้ useRef ต้องมี .current ตาม
    cancelToken.current = axios.CancelToken.source();
    getData();
    // cancel อะไรต่าง ๆ เช่น requset , eventlistener แก้ไขปัญหาการเรียกใช้งาน api รัว ๆ memory จะได้ไม่เต็ม
    return () => {
      // console.log('exit productpage');
      cancelToken.current.cancel();
    };
  }, []);

  // if ข้างในก็ได้ แต่อาจจะดูไม่สวย
  if (loading === true) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>เกิดข้อผิดพลาดจาก Server กรุณาลองใหม่</p>
        {/* .response.data ก่อนตามด้วยสิ่งที่ต้องการโชว์ */}
        <p>{error.response.data.message}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>สินค้า</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>ชื่อคอร์ส</th>
                <th>รายละเอียด</th>
                <th>วันที่สร้าง</th>
                <th>Views</th>
                <th>รูปภาพ</th>
                <th>เครื่องมือ</th>
              </tr>
            </thead>
            <tbody>
              {product.map((p, index) => {
                return (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.title}</td>
                    <td>{p.detail}</td>
                    <td>
                      {format(new Date(p.date), "dd/MMM/yyyy", { locale: th })}
                    </td>
                    <td>
                      <Badge variant="success">{p.view}</Badge>
                    </td>
                    <td>
                      <Image
                        src={p.picture}
                        thumbnail
                        alt={p.picture}
                        width={100}
                      />
                    </td>
                    <td>
                     <Link to={`/detail/${p.id}/title/${p.title}`}>
                        <BsEyeFill />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

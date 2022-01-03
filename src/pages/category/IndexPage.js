import React from "react";
import axios from "axios";
import { Table, Spinner, Button } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";

import { useHistory } from 'react-router-dom'

// Pagination
const IndexPage = () => {
  const [category, setCategory] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const cancelToken = React.useRef(null);

  const history = useHistory()
  const getData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `https://api.codingthailand.com/api/category`,
        {
          cancelToken: cancelToken.current.token,
        }
      );
      setCategory(resp.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // ทำงานก็ต่อเมื่อ id มีการเปลี่ยนแปลง
  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    getData();
    return () => {
      cancelToken.current.cancel();
    };
  }, []);

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
        <p>{JSON.stringify(error)}</p>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-12">
            <Button className="mb-3" variant="success" onClick={() => history.push('/category/create')}>
              เพิ่มข้อมูล
            </Button>
            <h2>หมวดหมู่ข่าว</h2>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>หมวดหมู่ข่าว</th>
                  <th>เครื่องมือ</th>
                </tr>
              </thead>
              <tbody>
                {category.map((c, index) => {
                  return (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.name}</td>
                      <td>
                        <Button
                          className="ml-2"
                          variant="outline-info"
                          size="sm"
                          onClick={() => history.push('/category/edit/' + c.id)}
                        >
                          <BsPencil />
                        </Button>
                        {/* ลบข้อมูล */}
                        <Button
                          className="ml-2"
                          variant="outline-danger"
                          size="sm"
                          onClick={ async() => {
                            const isComfirm = window.confirm('แน่ใจว่าต้องการลบข้อมูล ' + c.name + '?')
                            if (isComfirm === true) {
                              const resp = await axios.delete('https://api.codingthailand.com/api/category/' + c.id)
                              alert(resp.data.message)
                              // refresh หน้านั้น
                              history.go(0)
                            }
                          }}
                        >
                          <BsTrash />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;

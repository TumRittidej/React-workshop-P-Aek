import React, { useRef, useState } from "react";

import { useParams, useHistory } from "react-router-dom";
import { Spinner, CardDeck, Card, Button } from "react-bootstrap";
import axios from "axios";

const DetailPage = () => {
  const { id, title } = useParams();
  const history = useHistory()

  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelToken = useRef(null);

  const getData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        "https://api.codingthailand.com/api/course/" + id,
        {
          cancelToken: cancelToken.current.token,
        }
      );
      setDetail(resp.data.data);
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
  }, [id]);

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
        <Button variant="secondary" onClick={() => {
            history.goBack()
        }}>ย้อนหลัง</Button>
          <h2>
            {title} - {id}
          </h2>

          <div className="row">
            {detail.length > 0 ? (
              <CardDeck>
                {detail.map((d, index) => {
                  return (
                    <div className="col-md-4" key={d.ch_title}>
                      <Card className="mb-4 shadow-sm">
                        <Card.Body>
                          <Card.Title>{d.ch_title}</Card.Title>
                          <Card.Text>
                            {d.ch_dateadd}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      ;
                    </div>
                  );
                })}
              </CardDeck>
            ) : (
              <p className="mx-auto">ไม่พบข้อมูล...</p>
            )}
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

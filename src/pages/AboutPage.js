import React from "react";
import axios from "axios";

const AboutPage = () => {
  // react hook [ค่าเริ่มต้น, function]
  const [version, setVersion] = React.useState("");

  // reuse ได้
  const getData = async () => {
    const resp = await axios.get("https://api.codingthailand.com/api/version");
    // อยากดูข้อมูลจากการใช้ axios ต้อง .data เสมอ
    // console.log(resp.data.data.version);
    setVersion(resp.data.data.version);
  };

  // ให้ทำแค่ตอนเริ่มครั้งเดียว
  React.useEffect(() => {
    // async function getData() {
    //     const resp = await axios.get('https://api.codingthailand.com/api/version')
    //     // อยากดูข้อมูลจากการใช้ axios ต้อง .data เสมอ
    //     // console.log(resp.data.data.version);
    //     setVersion(resp.data.data.version)
    // }

    getData();
  }, []);

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>เกี่ยวกับเรา</h2>
          {version && <p>Backend API version: {version}</p>}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

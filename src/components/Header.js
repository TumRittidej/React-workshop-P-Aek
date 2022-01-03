import React from "react";
import Logo from "./Logo";
import Title from '../style/title/Title'
import { Button } from "../style/button/Button";

const Header = () => {
  let companyName = "CCT";
  const companyAddress = <p>Ubon</p>;
  let num = 10;
  const showMessage = () => {
    return companyName + ".com";
  };
  const isLogin = true;
  const showMe = () => {
    alert("Hello React");
  };
  const products = [
    { id: 1, name: "Coke" },
    { id: 2, name: "Pepsi" },
  ];

  return (
    <>
    <Title>Hello React</Title>
      {/* JSX */}
      <h1>บริษัท {companyName}</h1>
      {companyAddress}
      {num + 100} <br />
      {showMessage()}
      {/* if */}
      {/* { isLogin && <p>ยินดีต้อนรับ</p> } แบบย่อ */}
      {isLogin === true && (
        <>
          <p>ยินดีต้อนรับ</p>
          <p>ยินดีต้อนรับ 2</p>
        </>
      )}
      {isLogin && <Logo />}
      {/* if else */}
      {isLogin ? <Logo /> : <p>ไม่มีสิทธิ์เข้าถึง logo</p>}
      <br />
      {/* Event */}
      {/* <button onClick={showMe}>Click Me!</button> */}
      <Button onClick={showMe}>Click Me!</Button>
      <Button primary onClick={showMe}>Click Me!</Button>
      <br />

      {/* List and Key */}
      <ul>
        {products.map((product, index) => {
          return (
          <li key={product.id}>{product.name}{index}</li>
          );
        })}
      </ul>
      <hr />
    </>
  );
};

export default Header;

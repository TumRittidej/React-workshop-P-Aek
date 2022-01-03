import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";

import { UserStoreContext } from "../context/UserContext";

const NavBar = () => {
  const history = useHistory();
  // const [profile, setProfile] = React.useState(null);
  // console.log(profile);

  const userStore = React.useContext(UserStoreContext)

  // const getProfile = () => {
  //   const profileValue = JSON.parse(localStorage.getItem("profile"));
  //   console.log(profileValue);
  //   if (profileValue) {
  //     setProfile(profileValue)
  //   }
  // };

  // React.useEffect(() => {
  //   console.log("useeffect");
  //   getProfile();
  // }, []);

  const getProfile = () => {
    const profileValue = JSON.parse(localStorage.getItem("profile"));
    console.log(profileValue);
    if (profileValue) {
      userStore.updateProfile(profileValue)
    }
  };

  React.useEffect(() => {
    // console.log("useeffect");
    getProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    history.replace("/");
    // history.go(0);
    userStore.updateProfile(null)
  };

  return (
    <>
      <Navbar bg="success" expand="lg">
        <Container>
          <NavLink className="navbar-brand" to="/" exact>
            <img
              src="./logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="CodingThailand logo"
            />{" "}
            CodingThailand
          </NavLink>
          {/* <Navbar.Brand href="#home">
            <img
              src="./logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="CodingThailand logo"
            />
            {' '}CodingThailand
          </Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink
                className="nav-link"
                to="/"
                exact
                activeClassName="active"
              >
                หน้าหลัก
              </NavLink>
              <NavLink
                className="nav-link"
                to="/product"
                activeClassName="active"
              >
                สินค้า
              </NavLink>
              <NavLink
                className="nav-link"
                to="/about"
                activeClassName="active"
              >
                เกี่ยวกับเรา
              </NavLink>
              <NavDropdown
                title="Workshop (Pagination + CRUD)"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  onClick={() => {
                    history.replace("/hospital");
                  }}
                >
                  ข้อมูลสถานพยาบาล (Pagination)
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    history.replace("/category");
                  }}
                >
                  หมวดหมู่ข่าว (CRUD)
                </NavDropdown.Item>
              </NavDropdown>
              <NavLink
                className="nav-link"
                to="/upload"
                activeClassName="active"
              >
                อัปโหลดไฟล์
              </NavLink>
              <NavLink
                className="nav-link"
                to="/member"
                activeClassName="active"
              >
                เมนูสมาชิก
              </NavLink>
            </Nav>

            {userStore.profile ? (
              <span className="navbar-text text-white">
                ยินดีต้อนรับคุณ {userStore.profile.name} role: {userStore.profile.role}
                <button className="btn btn-danger ml-2" onClick={logout}>
                  Logout
                </button>
              </span>
            ) : (
              <>
                <Nav>
                  <NavLink
                    className="nav-link"
                    to="/register"
                    activeClassName="active"
                  >
                    สมัครสมาชิก
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="/login"
                    activeClassName="active"
                  >
                    เข้าสู่ระบบ
                  </NavLink>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;

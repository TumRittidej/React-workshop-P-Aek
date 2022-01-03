import Footer from "./components/Footer";
import Header from "./components/Header";
import Logo from "./components/Logo";
import Sidebar from "./components/Sidebar";
import './App.css'
import Menu from "./components/Menu";

function AppV1() {
  return (
    <div className="logo">
      <Logo />

      <Header />

      <Footer title="Google" website="www.google.com" postcode={11000} isOpen />
    
      <hr />

      <Sidebar></Sidebar>

      <Menu />

    </div>
  );
}

export default AppV1;

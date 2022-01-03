import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// alrert สวยๆ
import { ToastProvider } from "react-toast-notifications";

import React from "react";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import DetailPage from "./pages/DetailPage";
import HospitalPage from "./pages/hospital/HospitalPage";
import IndexPage from "./pages/category/IndexPage";

import { QueryClient, QueryClientProvider } from "react-query";
import CreatePage from "./pages/category/CreatePage";
import EditPage from "./pages/category/EditPage";
import UploadPage from "./pages/UploadPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MemberPage from "./pages/MemberPage";

import PrivateRoute from "./guard/Auth";

import UserStoreProvider from "./context/UserContext";

const queryClient = new QueryClient();

function App() {
  return (
    <UserStoreProvider>
      <ToastProvider
        placement="top-center"
        autoDismiss
        autoDismissTimeout={3000}
      >
        <QueryClientProvider client={queryClient}>
          <Router>
            <NavBar></NavBar>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/about">
                <AboutPage />
              </Route>
              <Route path="/product">
                <ProductPage />
              </Route>
              <Route path="/detail/:id/title/:title">
                <DetailPage />
              </Route>
              <Route path="/hospital">
                <HospitalPage />
              </Route>
              <Route path="/upload">
                <UploadPage />
              </Route>

              <PrivateRoute path="/member">
                <MemberPage />
              </PrivateRoute>

              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>

              <Route
                path="/category"
                render={({ match: { url } }) => (
                  <>
                    <Route path={`${url}/`} exact>
                      <IndexPage />
                    </Route>
                    <Route path={`${url}/create`}>
                      <CreatePage />
                    </Route>
                    <Route path={`${url}/edit/:id`}>
                      <EditPage />
                    </Route>
                  </>
                )}
              ></Route>
            </Switch>
            <Footer></Footer>
          </Router>
        </QueryClientProvider>
      </ToastProvider>
    </UserStoreProvider>
  );
}

export default App;

import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import { API } from "./General/General";
import "./App.css";
import Users from "./Components/Users";
import Leads from "./Components/Leads";
import Service from "./Components/Service";
import Contact from "./Components/Contact";
import Viewuser from "./Components/Viewuser";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Appbar from "./Components/Appbar";
import Adduser from "./Components/Adduser";
import Register from "./Components/Register";
import Forgotpassword from "./Components/Forgotpassword";
import Verification from "./Components/Verification";
import Updatepassword from "./Components/Updatepassword";
import { useState } from "react";
import Footer from "./Components/Footer";
import CreateService from "./Components/DashboardContent/CreateService";
import ViewWorkflow from "./Components/ViewWorkflow";

function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = () => {
    const loginContent = {
      username,
      password,
    };

    console.log(loginContent);
    fetch(`${API}/login`, {
      method: "POST",
      body: JSON.stringify(loginContent),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem("token", result.token);
        localStorage.setItem("usertype", result.usertype);
        localStorage.setItem("firstname", result.firstname);
        localStorage.setItem("lastname", result.lastname);
        navigate("/dashboard");
      });
  };

  window.onbeforeunload = function () {
    localStorage.clear();
  };

  return (
    <div className="App">
      {window.location.pathname != "/" && <Appbar />}
      <div className="crm-content">
        <Routes>
          <Route
            path="/"
            element={
              <Login
                setUsername={setUsername}
                setPassword={setPassword}
                userLogin={userLogin}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/updatepassword" element={<Updatepassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads"
            element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>
            }
          />
          <Route
            path="/service"
            element={
              <ProtectedRoute>
                <Service />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute>
                <Viewuser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adduser"
            element={
              <ProtectedRoute>
                <Adduser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createservice"
            element={
              <ProtectedRoute>
                <CreateService />
              </ProtectedRoute>
            }
          />
          <Route path="/workflow" element={<ViewWorkflow />} />
        </Routes>
      </div>
      {window.location.pathname != "/" && <Footer />}
    </div>
  );
  function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    return token ? <div>{children}</div> : <Navigate replace to="/" />;
  }
}

export default App;

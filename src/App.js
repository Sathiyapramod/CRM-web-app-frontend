import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import "./App.css";
import Users from "./Components/Users";
import Leads from "./Components/Leads";
import Service from "./Components/Service";
import Contact from "./Components/Contact";
import Viewuser from "./Components/Viewuser";
import { Routes, Route, Navigate } from "react-router-dom";
import Appbar from "./Components/Appbar";
import Adduser from "./Components/Adduser";
import Register from './Components/Register';
import Forgotpassword from "./Components/Forgotpassword";
import Verification from "./Components/Verification";
import Updatepassword from "./Components/Updatepassword";

function App() {
  return (
    <div className="App">
      <Appbar />
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<Forgotpassword />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/updatepassword" element={<Updatepassword />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
        <Route path="/service" element={<ProtectedRoute><Service /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/users/:id" element={<ProtectedRoute><Viewuser /></ProtectedRoute>} />
        <Route path="/adduser" element={<ProtectedRoute><Adduser /></ProtectedRoute>} />
      </Routes>
    </div>
  );
  function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    return token ? <div>{children}</div> : <Navigate replace to="/" />;
  }
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./pages/Navbar";
import { Logout } from "./pages/Logout";
import { Task } from "./pages/Task";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/task" element={<Task />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;

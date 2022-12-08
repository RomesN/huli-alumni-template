import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Regsiter from "./pages/Register";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Regsiter />} />
        </Routes>
    );
}

export default App;

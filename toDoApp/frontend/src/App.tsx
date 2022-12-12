import { Routes, Route, Navigate } from "react-router-dom";
import { TokenContextProvider } from "./hooks/useTokenContext";
import Login from "./pages/Login";
import Regsiter from "./pages/Register";
import ToDos from "./pages/ToDos";

function App() {
    return (
        <TokenContextProvider>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Regsiter />} />
                <Route path="/todos" element={<ToDos />} />
            </Routes>
        </TokenContextProvider>
    );
}

export default App;

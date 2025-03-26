import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/User";
import Settings from "./pages/admin/Setting";
import AdminLayout from "./pages/admin/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import './App.css';
// import GalleryCRUD from "./pages/admin/Gallery";

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute />}>
                    <Route path="dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
                    <Route path="users" element={<AdminLayout><Users /></AdminLayout>} />
                    <Route path="settings" element={<AdminLayout><Settings/></AdminLayout>} />
                </Route>

                {/* Redirect jika path tidak ditemukan */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;

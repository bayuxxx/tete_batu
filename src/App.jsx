import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";
import Settings from "./pages/admin/Setting";
import AdminLayout from "./pages/admin/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import ActivityManager from "./pages/admin/ActivityManager";
import ImageManager from "./pages/admin/ImgaeManager";
import VideoManager from "./pages/admin/VideoManager";
import MessageManager from "./pages/admin/MessgaeManager";
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute />}>
                    <Route path="activity" element={<AdminLayout><ActivityManager /></AdminLayout>} />
                    <Route path="images" element={<AdminLayout><ImageManager /></AdminLayout>} />
                    <Route path="videos" element={<AdminLayout><VideoManager /></AdminLayout>} />
                    <Route path="messages" element={<AdminLayout><MessageManager/></AdminLayout>} />
                    <Route path="settings" element={<AdminLayout><Settings/></AdminLayout>} />
                </Route>

                {/* Redirect jika path tidak ditemukan */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;

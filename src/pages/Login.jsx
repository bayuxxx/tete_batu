import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "Wega Kun" && password === "Wega1234") {
            localStorage.setItem("isAuthenticated", "true");
            navigate("/admin/activity");
        } else {
            alert("Username atau Password salah!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-green-100">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-green-700 mb-2">Login Admin</h2>
                    <p className="text-green-600/70 text-sm">Silakan masuk ke akun Anda</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="username" className="text-sm font-medium text-green-700 block">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Masukkan username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 bg-white text-gray-800 placeholder-gray-400"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-green-700 block">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Masukkan password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 bg-white text-gray-800 placeholder-gray-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 font-medium shadow-sm hover:shadow-md"
                    >
                        Masuk
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-green-600/70">
                        &copy; {new Date().getFullYear()} Admin Panel
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
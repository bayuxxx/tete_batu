import { Link } from "react-router-dom";
import { useState } from "react";

const AdminLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(
    new Date().toISOString().slice(0, 19).replace("T", " ")
  );

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/login";
  };

  useState(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(
        new Date().toISOString().slice(0, 19).replace("T", " ")
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { path: "/admin/activity", text: "Activity" },
    { path: "/admin/images", text: "Images" },
    { path: "/admin/videos", text: "Videos" },
    { path: "/admin/messages", text: "Message" },
    { path: "/admin/settings", text: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:h-screen bg-white shadow-lg">
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-2xl font-bold text-green-600 text-center">Admin Panel</h2>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
              >
                <span className="ml-3">{item.text}</span>
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 mt-4 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              <span className="ml-3">Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          <div>
            <h2 className="text-xl font-bold text-green-600">Admin Panel</h2>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-600"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="p-4 border-t space-y-2 bg-white">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>{item.text}</span>
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 mt-4 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              <span>Logout</span>
            </button>
          </nav>
        )}
      </div>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen">
        <div className="p-6">
          {/* Breadcrumb/Current Page Info */}
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
              <div className="mt-2 sm:mt-0 text-sm text-gray-600">
                {currentDateTime}
              </div>
            </div>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

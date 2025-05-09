import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/axios"; 

axios.defaults.baseURL = api.baseURL;

const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("/messages");
      setMessages(res.data.data);
    } catch (err) {
      setError("Gagal mengambil data pesan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Daftar Pesan</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <p>Memuat...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Nama</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Pesan</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">{msg.name}</td>
                  <td className="px-4 py-2">{msg.email}</td>
                  <td className="px-4 py-2">{msg.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MessageManager;

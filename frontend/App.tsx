import { useEffect, useState } from "react";
import backend from "~backend/client";
import type { HelloResponse } from "~backend/hello/hello";

export default function App() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setLoading(true);
        const response: HelloResponse = await backend.hello.hello();
        setMessage(response.message);
      } catch (err) {
        console.error("Failed to fetch message:", err);
        setError("Failed to load message");
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">👋</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hello World App
          </h1>
          <p className="text-gray-600">
            A simple backend and frontend demo
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          {loading && (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          )}

          {error && (
            <div className="text-red-600 font-medium">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="text-2xl font-bold text-green-600">
              {message}
            </div>
          )}
        </div>

        <div className="text-sm text-gray-500">
          Message fetched from the backend API
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateFact() {
    setLoading(true);
    setFact("");

    try {
      const response = await axios.post(
        "https://huggingface.co/spaces/YOUR-USERNAME/future-fact-backend/api/predict",
        {
          data: [nameA, nameB],
        }
      );
      const result = response.data.data[0];
      setFact(result);
    } catch (err) {
      console.error(err);
      setFact("Error: Could not reach the backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-purple-100 to-indigo-200 text-center">
      <h1 className="text-3xl font-bold mb-4">🔮 Future Fact Generator</h1>
      <p className="mb-6 text-gray-600">Enter two names to reveal a probable future fact...</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          className="border border-gray-400 rounded p-2"
          placeholder="First person's full name"
          value={nameA}
          onChange={(e) => setNameA(e.target.value)}
        />
        <input
          className="border border-gray-400 rounded p-2"
          placeholder="Second person's full name"
          value={nameB}
          onChange={(e) => setNameB(e.target.value)}
        />
      </div>

      <button
        onClick={generateFact}
        disabled={loading}
        className="bg-purple-600 text-white py-2 px-4 rounded shadow hover:bg-purple-700 transition"
      >
        {loading ? "Generating..." : "Generate Future Fact"}
      </button>

      {fact && (
        <div className="mt-6 p-4 bg-white shadow rounded max-w-md">
          <h2 className="font-semibold text-lg mb-2">✨ Your Future Fact:</h2>
          <p className="text-gray-800">{fact}</p>
        </div>
      )}
    </main>
  );
}
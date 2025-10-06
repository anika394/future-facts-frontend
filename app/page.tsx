"use client";

import { useState } from "react";
import { Client } from "@gradio/client";

export default function Home() {
  const [nameA, setNameA] = useState("");
  const [infoA, setInfoA] = useState("");
  const [nameB, setNameB] = useState("");
  const [infoB, setInfoB] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nameA || !nameB) {
      setResult("Please fill in both names!");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const client = await Client.connect("anika394/future-fact-backend");
      const response = await client.predict("/predict", {
        name_a: nameA,
        info_a: infoA,
        name_b: nameB,
        info_b: infoB,
      });

      setResult((response.data as any[])[0]);
    } catch (err) {
      console.error(err);
      setResult("⚠️ Could not reach backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 flex flex-col items-center justify-center px-4 py-8 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center drop-shadow-lg">
        🔮 Future Fact Generator
      </h1>

      <p className="text-center max-w-xl mb-6">
        Enter two people's names and some info about them to discover a fun,
        creative probabilistic future fact!
      </p>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-10 w-full max-w-xl shadow-lg">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Person A Full Name"
            className="p-3 rounded-lg text-black font-medium focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={nameA}
            onChange={(e) => setNameA(e.target.value)}
          />
          <textarea
            placeholder="Person A Info (text)"
            className="p-3 rounded-lg text-black font-medium focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={infoA}
            onChange={(e) => setInfoA(e.target.value)}
          />
          <input
            type="text"
            placeholder="Person B Full Name"
            className="p-3 rounded-lg text-black font-medium focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={nameB}
            onChange={(e) => setNameB(e.target.value)}
          />
          <textarea
            placeholder="Person B Info (text)"
            className="p-3 rounded-lg text-black font-medium focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={infoB}
            onChange={(e) => setInfoB(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 font-bold py-3 rounded-lg mt-2 transition-all duration-200 shadow-md"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Future Fact"}
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl max-w-xl shadow-lg text-black font-semibold">
          <h2 className="text-xl font-bold mb-2 text-center">🔮 Future Fact</h2>
          <p className="text-center">{result}</p>
        </div>
      )}
    </main>
  );
}
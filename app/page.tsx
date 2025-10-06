"use client";
import { useState } from "react";
import { Client } from "@gradio/client";

export default function Home() {
  const [nameA, setNameA] = useState("");
  const [infoA, setInfoA] = useState("");
  const [nameB, setNameB] = useState("");
  const [infoB, setInfoB] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    setResult("Loading...");
    try {
      // Connect to your Hugging Face backend
      const client = await Client.connect("anika394/future-fact-backend");

      // Call the /predict function
      const response = await client.predict("/predict", {
        name_a: nameA,
        info_a: infoA,
        name_b: nameB,
        info_b: infoB,
      });

      // Display the returned fact
      setResult(response.data[0]);
    } catch (err) {
      console.error(err);
      setResult("⚠️ Could not reach backend.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">🔮 Future Fact Generator</h1>

      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Person A Full Name"
          className="border p-2 rounded"
          value={nameA}
          onChange={(e) => setNameA(e.target.value)}
        />
        <textarea
          placeholder="Person A Info"
          className="border p-2 rounded"
          value={infoA}
          onChange={(e) => setInfoA(e.target.value)}
        />
        <input
          type="text"
          placeholder="Person B Full Name"
          className="border p-2 rounded"
          value={nameB}
          onChange={(e) => setNameB(e.target.value)}
        />
        <textarea
          placeholder="Person B Info"
          className="border p-2 rounded"
          value={infoB}
          onChange={(e) => setInfoB(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
      >
        Generate Future Fact
      </button>

      <div className="mt-6 w-full max-w-md text-center">
        <p className="text-lg">{result}</p>
      </div>
    </main>
  );
}
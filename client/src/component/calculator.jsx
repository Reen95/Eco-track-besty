import { useState } from "react";

// client/src/components/Calculator.jsx
// Replace previous API_BASE line with:
const raw = import.meta.env.VITE_API_BASE;
const API_BASE = raw === undefined || raw === "" ? "" : raw;

export default function Calculator({ setResult }) {
  const [inputs, setInputs] = useState({
    transport: "",
    electricity: "",
    diet: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { transport, electricity, diet } = inputs;
    const total =
      Number(transport) * 0.21 + Number(electricity) * 0.5 + Number(diet) * 0.3;

    try {
      await fetch(`${API_BASE}/api/footprints`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transport,
          electricity,
          diet,
          total,
        }),
      });
    } catch (err) {
      console.error("Failed to save to backend:", err);
    }

    setResult(total.toFixed(2));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow p-6 max-w-lg mx-auto mb-8"
    >
      <h3 className="text-xl font-semibold mb-4 text-center">
        Estimate your footprint (per week)
      </h3>

      <label className="block mb-2 font-medium">
        Transport (km traveled by car)
      </label>
      <input
        type="number"
        name="transport"
        value={inputs.transport}
        onChange={handleChange}
        className="w-full mb-4 border rounded p-2"
        placeholder="e.g. 50"
        required
      />

      <label className="block mb-2 font-medium">Electricity (kWh used)</label>
      <input
        type="number"
        name="electricity"
        value={inputs.electricity}
        onChange={handleChange}
        className="w-full mb-4 border rounded p-2"
        placeholder="e.g. 20"
        required
      />

      <label className="block mb-2 font-medium">
        Diet (meat-based meals per week)
      </label>
      <input
        type="number"
        name="diet"
        value={inputs.diet}
        onChange={handleChange}
        className="w-full mb-4 border rounded p-2"
        placeholder="e.g. 10"
        required
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-lg w-full font-semibold hover:bg-green-700"
      >
        Calculate
      </button>
    </form>
  );
}

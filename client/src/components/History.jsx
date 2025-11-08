import { useEffect, useState } from "react";

export default function History() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/footprints")
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="max-w-3xl mx-auto mb-8">
      <h3 className="text-2xl font-bold mb-4 text-center">📊 Your Past Logs</h3>
      {records.length === 0 ? (
        <p className="text-center text-gray-500">No records yet.</p>
      ) : (
        <ul className="space-y-3">
          {records.map((r) => (
            <li
              key={r._id}
              className="bg-white p-3 rounded-lg shadow flex justify-between"
            >
              <p>
                <strong>{r.total} kg CO₂</strong>
              </p>
              <p className="text-gray-500 text-sm">
                {new Date(r.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

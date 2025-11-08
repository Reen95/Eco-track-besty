import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function ResultCard({ result }) {
  const data = [
    { name: "Transport", value: result * 0.4 },
    { name: "Electricity", value: result * 0.35 },
    { name: "Diet", value: result * 0.25 },
  ];

  const COLORS = ["#16a34a", "#4ade80", "#86efac"];

  return (
    <div className="text-center bg-green-50 p-6 rounded-2xl shadow max-w-lg mx-auto mb-8">
      <h3 className="text-xl font-semibold mb-4">Your Weekly Carbon Footprint</h3>
      <p className="text-3xl font-bold text-green-700 mb-2">{result} kg CO₂</p>

      <div className="flex justify-center">
        <PieChart width={250} height={200}>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={70}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}

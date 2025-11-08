export default function TipsSection() {
  const tips = [
    "Walk, cycle, or use public transport instead of driving.",
    "Unplug chargers and electronics when not in use.",
    "Eat more plant-based meals during the week.",
    "Use energy-efficient bulbs and appliances.",
    "Recycle and reuse whenever possible.",
  ];

  return (
    <section id="tips" className="max-w-3xl mx-auto mb-8">
      <h3 className="text-2xl font-bold mb-4 text-center">🌱 Eco-Friendly Tips</h3>
      <ul className="grid gap-3">
        {tips.map((tip, i) => (
          <li key={i} className="bg-white p-3 rounded-lg shadow text-gray-700">
            {tip}
          </li>
        ))}
      </ul>
    </section>
  );
}

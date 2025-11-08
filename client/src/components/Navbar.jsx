export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white py-4 shadow">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">EcoTrack 🌍</h2>
        <a
          href="#tips"
          className="bg-white text-green-600 px-3 py-1 rounded-lg font-semibold"
        >
          Tips
        </a>
      </div>
    </nav>
  );
}

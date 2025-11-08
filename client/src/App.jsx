import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Calculator from "./components/Calculator";
import ResultCard from "./components/ResultCard";
import TipsSection from "./components/TipsSection";
import Footer from "./components/Footer";
import History from "./components/History";
import { useState } from "react";

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center mb-6"
        >
          🌿 EcoTrack – Your Carbon Footprint Companion
        </motion.h1>

        <Calculator setResult={setResult} />
        {result && <ResultCard result={result} />}
        <History />
        <TipsSection />
      </main>
      <Footer />
    </div>
  );
}

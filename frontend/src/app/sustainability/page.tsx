'use client'; // For interactivity

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SustainabilityCalculator() {
  const [quantity, setQuantity] = useState(0);
  const [material, setMaterial] = useState('paper'); // Default
  const [footprint, setFootprint] = useState(0);
  const [tips, setTips] = useState<string[]>([]);

  const calculateFootprint = () => {
    if (quantity <= 0) return; // Basic validation
    let baseEmission = 0;
    // Mock calculations (kg CO2 per unit)
    if (material === 'paper') baseEmission = 0.05; // Low for recycled
    else if (material === 'plastic') baseEmission = 0.15;
    else if (material === 'metal') baseEmission = 0.25;
    const total = quantity * baseEmission;
    setFootprint(total);

    // Mock tips based on total
    const mockTips = [
      'Opt for recycled materials to reduce emissions by up to 50%.',
      'Choose local printing to cut shipping CO2.',
      `Your order emits ${total.toFixed(2)}kg CO2—offset with tree planting?`,
    ];
    setTips(mockTips);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <section className="py-12">
        <div className="container mx-auto max-w-md">
          <h2 className="text-3xl font-bold text-center mb-8">Sustainability Calculator</h2>
          <p className="text-center mb-8 text-gray-600">Estimate your print order's environmental impact.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full p-2 border rounded"
                placeholder="E.g., 100"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Material</label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="paper">Recycled Paper (Low Impact)</option>
                <option value="plastic">Plastic (Medium)</option>
                <option value="metal">Metal (High)</option>
              </select>
            </div>
            <button
              onClick={calculateFootprint}
              disabled={quantity <= 0}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
            >
              Calculate Footprint
            </button>
            {footprint > 0 && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Estimated CO2: {footprint.toFixed(2)} kg</h3>
                <ul className="space-y-1 text-sm">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
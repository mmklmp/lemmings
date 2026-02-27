/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import AnalemmaChart from './components/AnalemmaChart';

export default function App() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [latitude, setLatitude] = useState(51.5074);
  const [longitude, setLongitude] = useState(-0.1278);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-5xl font-bold tracking-tighter text-stone-800">Analemma Calendar</h1>
        <p className="text-stone-500 mt-2">Visualizing the sun's path from your location</p>
      </header>

      <main className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
          <h2 className="font-bold text-lg text-stone-800 mb-4">Controls</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-stone-600">Year</label>
              <input
                type="number"
                id="year"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="mt-1 block w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-md text-sm shadow-sm placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-500 focus:border-stone-500"
              />
            </div>
            <div>
              <label htmlFor="latitude" className="block text-sm font-medium text-stone-600">Latitude</label>
              <input
                type="number"
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(parseFloat(e.target.value))}
                className="mt-1 block w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-md text-sm shadow-sm placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-500 focus:border-stone-500"
              />
            </div>
            <div>
              <label htmlFor="longitude" className="block text-sm font-medium text-stone-600">Longitude</label>
              <input
                type="number"
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(parseFloat(e.target.value))}
                className="mt-1 block w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-md text-sm shadow-sm placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-500 focus:border-stone-500"
              />
            </div>
          </div>
        </div>

        <div id="visualization-container" className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-stone-200 min-h-[400px]">
          {/* D3 visualization will be rendered here */}
          <AnalemmaChart year={year} latitude={latitude} longitude={longitude} />
        </div>
      </main>

      <footer className="w-full max-w-5xl mx-auto text-center mt-8 text-stone-400 text-sm">
        <p>An analemma is a diagram showing the position of the Sun in the sky as seen from a fixed location on Earth at the same mean solar time, as that position varies over the course of a year.</p>
      </footer>
    </div>
  );
}

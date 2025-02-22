"use client";
import SortingVisualizer from "./_components/SortingVisualizer";
import CodeVisualizer from "./_components/CodeVisualizer";
import Explanation from "./_components/Explanation";
import { useSelectionSort } from "@/hooks/useSelectionSort";

export default function Home() {
  const {
    array,
    currentI,
    currentJ,
    swapping,
    sortedIndex,
    currentLine,
    isSorting,
    speed,
    isPaused,
    selectionSort,
    resetArray,
    togglePause,
    handleCustomArray,
    setSpeed,
  } = useSelectionSort([4, 3, 5, 6, 1, 2]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Visualisasi Selection Sort</h1>
      <div className="flex flex-col items-center space-y-4 w-full max-w-2xl">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Masukkan array (contoh: 4,3,5,6,1,2)"
            className="border border-gray-300 p-2 rounded"
            onChange={(e) => handleCustomArray(e.target.value)}
          />
          <button
            onClick={resetArray}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Reset
          </button>
        </div>

        <SortingVisualizer
          array={array}
          currentI={currentI}
          currentJ={currentJ}
          swapping={swapping}
          sortedIndex={sortedIndex}
        />

        <div className="flex space-x-4">
          <label>Kecepatan:</label>
          <select
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="border border-gray-300 p-2 rounded"
          >
            <option value={1000}>Lambat</option>
            <option value={500}>Normal</option>
            <option value={200}>Cepat</option>
          </select>
        </div>

        <CodeVisualizer currentLine={currentLine} />

        <Explanation currentI={currentI} currentJ={currentJ} array={array} minIndex={currentJ} />

        <div className="flex space-x-4">
          <button
            onClick={selectionSort}
            disabled={isSorting}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${
              isSorting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Mulai
          </button>
          <button
            onClick={togglePause}
            disabled={!isSorting}
            className={`bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 ${
              !isSorting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>
    </div>
  );
}
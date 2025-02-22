"use client";
import { useState } from "react";

interface Topic {
  name: string;
  completed: boolean;
}

interface Stage {
  name: string;
  topics: Topic[];
}

const initialStages: Stage[] = [
  {
    name: "Tahap 1: Fondasi Dasar",
    topics: [
      { name: "Bahasa Pemrograman (C++: variabel, loop, fungsi)", completed: false },
      { name: "Input/Output (cin/cout, scanf/printf)", completed: false },
      { name: "Struktur Data Dasar (Array, Vector, Set/Map)", completed: false },
      { name: "Algoritma Dasar (Sorting: bubble, STL; Searching: binary)", completed: false },
      { name: "Matematika Dasar (Prima, GCD/LCM)", completed: false },
    ],
  },
  {
    name: "Tahap 2: Algoritma dan Struktur Data Inti",
    topics: [
      { name: "Rekursi (Faktorial, Fibonacci)", completed: false },
      { name: "DFS dan BFS (Graf, Pohon)", completed: true }, // Misalnya, DFS sudah dipelajari
      { name: "Struktur Data (Stack, Queue, Priority Queue)", completed: false },
      { name: "Greedy (Activity Selection, Coin Change)", completed: false },
      { name: "Kompleksitas Waktu (Big-O)", completed: false },
    ],
  },
  {
    name: "Tahap 3: Teknik Menengah",
    topics: [
      { name: "Dynamic Programming (Knapsack, LCS)", completed: false },
      { name: "Graf Lanjutan (Dijkstra, MST: Kruskal/Prim)", completed: false },
      { name: "Binary Search Lanjutan (Cari jawaban optimal)", completed: false },
      { name: "Two Pointers dan Sliding Window (Subarray)", completed: false },
    ],
  },
  {
    name: "Tahap 4: Tingkat Lanjut",
    topics: [
      { name: "Segment Tree (Range query)", completed: false },
      { name: "Fenwick Tree (BIT: Inversi)", completed: false },
      { name: "Number Theory (Sieve, Modular Exponentiation)", completed: false },
      { name: "String Algorithms (KMP, Trie)", completed: false },
      { name: "Advanced Graph (SCC, Max Flow)", completed: false },
    ],
  },
];

export default function Home() {
  const [stages, setStages] = useState<Stage[]>(initialStages);

  const toggleTopic = (stageIndex: number, topicIndex: number) => {
    const newStages = [...stages];
    newStages[stageIndex].topics[topicIndex].completed =
      !newStages[stageIndex].topics[topicIndex].completed;
    setStages(newStages);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Tracker Belajar CP
      </h1>
      <div className="max-w-2xl mx-auto">
        {stages.map((stage, stageIndex) => (
          <div key={stage.name} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{stage.name}</h2>
            <ul className="space-y-2">
              {stage.topics.map((topic, topicIndex) => (
                <li key={topic.name} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={topic.completed}
                    onChange={() => toggleTopic(stageIndex, topicIndex)}
                    className="mr-2"
                  />
                  <span
                    className={
                      topic.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {topic.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

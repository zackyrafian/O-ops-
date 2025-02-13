"use client";
import { useState, useRef } from "react"
import { SortingVisualizer } from "./components/SortingVisualizer"
import { CodeVisualizer } from "./components/CodeVisualizer"
import { Explanation } from "./components/Explanation"

export default function Home() {
  const [array, setArray] = useState<number[]>([4, 3, 5, 6, 1, 2])
  const [currentI, setCurrentI] = useState<number | null>(null)
  const [currentJ, setCurrentJ] = useState<number | null>(null)
  const [swapping, setSwapping] = useState(false)
  const [currentLine, setCurrentLine] = useState<number>(-1)
  const [isSorting, setIsSorting] = useState(false)
  const [sortedIndex, setSortedIndex] = useState<number[]>([])
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const pauseRef = useRef<boolean>(false)
  const [speed, setSpeed] = useState<number>(500)

  const handleCustomArray = (input: string) => {
    const newArray = input.split(",").map((num) => parseInt(num.trim()))
    if (newArray.every((num) => !isNaN(num))) {
      setArray(newArray)
    }
  }

  const bubbleSort = async () => {
    if (isSorting) return
    setIsSorting(true)
    const arr = [...array]
    const n = arr.length
    setCurrentLine(0)
    await new Promise((resolve) => setTimeout(resolve, speed))

    for (let i = 0; i < n - 1; i++) {
      setCurrentI(i)
      setCurrentLine(1)
      await delay(speed)

      for (let j = 0; j < n - i - 1; j++) {
        while (pauseRef.current) {
          await delay(100)
        }
        setCurrentJ(j)
        setCurrentLine(2)
        await delay(speed)

        setCurrentLine(3)
        await delay(speed)

        if (arr[j] > arr[j + 1]) {
          setSwapping(true)
          setCurrentLine(5)
          await delay(speed)

          const temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
          setArray([...arr])
          await delay(speed)
          setSwapping(false)
        }
      }

      setSortedIndex((prev) => [...prev, n - i - 1])
    }

    setCurrentI(null)
    setCurrentJ(null)
    setCurrentLine(-1)
    setIsSorting(false)
  }

  const resetArray = () => {
    setArray([4, 3, 5, 6, 1, 2])
    setCurrentI(null)
    setCurrentJ(null)
    setSwapping(false)
    setCurrentLine(-1)
    setSortedIndex([])
  }

  const togglePause = () => {
    setIsPaused((prev) => !prev)
    pauseRef.current = !pauseRef.current
  }

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Visualisasi Bubble Sort</h1>
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
            Reset Array
          </button>
        </div>
        <SortingVisualizer
          array={array}
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
            <option value={1000}>Lambat (1 detik)</option>
            <option value={500}>Normal (0.5 detik)</option>
            <option value={200}>Cepat (0.2 detik)</option>
          </select>
        </div>
        <CodeVisualizer currentLine={currentLine} />
        <Explanation currentI={currentI} currentJ={currentJ} array={array} />
        <div className="flex space-x-4">
          <button
            onClick={bubbleSort}
            disabled={isSorting}
            className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${
              isSorting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Start Sorting
          </button>
          <button
            onClick={togglePause}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>
    </div>
  )
}
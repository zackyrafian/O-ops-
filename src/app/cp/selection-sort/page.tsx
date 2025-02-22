"use client"
import { useState, useEffect, useRef } from "react"

// Komponen untuk visualisasi array
const SortingVisualizer = ({
  array,
  currentI,
  currentJ,
  swapping,
  sortedIndex,
}: {
  array: number[]
  currentI: number | null
  currentJ: number | null
  swapping: boolean
  sortedIndex: number[]
}) => {
  const maxValue = Math.max(...array)
  return (
    <div className="flex items-end space-x-2 h-64">
      {array.map((value, index) => (
        <div
          key={index}
          className={`w-10 flex flex-col justify-end items-center ${
            index === currentI || index === currentJ
              ? swapping
                ? "bg-green-500"
                : "bg-yellow-500 border-4 border-red-500"
              : sortedIndex.includes(index)
              ? "bg-purple-500"
              : "bg-blue-500"
          }`}
          style={{
            height: `${(value / maxValue) * 100}%`,
            transition: "all 0.5s ease",
          }}
        >
          <span className="text-white font-bold mb-1">{value}</span>
        </div>
      ))}
    </div>
  )
}

// Komponen untuk visualisasi kode C++
const CodeVisualizer = ({ currentLine }: { currentLine: number }) => {
  const codeLines = [
    "void selectionSort(int arr[], int n) {",
    "    for (int i = 0; i < n - 1; i++) {",
    "        int minIndex = i;",
    "        for (int j = i + 1; j < n; j++) {",
    "            if (arr[j] < arr[minIndex]) {",
    "                minIndex = j;",
    "            }",
    "        }",
    "        // Swap arr[i] and arr[minIndex]",
    "        int temp = arr[i];",
    "        arr[i] = arr[minIndex];",
    "        arr[minIndex] = temp;",
    "    }",
    "}",
  ]

  const lineDescriptions = [
    "Definisi fungsi selectionSort.",
    "Loop untuk iterasi i (menentukan elemen saat ini).",
    "Inisialisasi minIndex sebagai indeks elemen terkecil.",
    "Loop untuk mencari elemen terkecil di sisa array.",
    "Memeriksa apakah elemen saat ini lebih kecil dari elemen pada minIndex.",
    "Update minIndex jika elemen lebih kecil ditemukan.",
    "Akhir dari inner loop.",
    "Inisialisasi pertukaran nilai (temp).",
    "Melakukan pertukaran nilai antara arr[i] dan arr[minIndex].",
    "Menyalin nilai arr[minIndex] ke arr[i].",
    "Akhir dari outer loop.",
    "Akhir fungsi.",
  ]

  return (
    <div className="mt-4 w-full">
      <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
        {codeLines.map((line, index) => (
          <div key={index} className={`${index === currentLine ? "bg-yellow-600" : ""}`}>
            {line}
          </div>
        ))}
      </pre>
      <div className="text-gray-600 mt-2 italic">
        {currentLine !== -1 && lineDescriptions[currentLine]}
      </div>
    </div>
  )
}

// Komponen untuk penjelasan real-time
const Explanation = ({
  currentI,
  currentJ,
  array,
  minIndex,
}: {
  currentI: number | null
  currentJ: number | null
  array: number[]
  minIndex: number | null
}) => {
  if (currentI === null || currentJ === null) {
    return <div className="text-sm text-gray-600">Menunggu langkah selanjutnya...</div>
  }

  const valueI = array[currentI]
  const valueJ = array[currentJ]
  const minValue = minIndex !== null ? array[minIndex] : null

  return (
    <div className="text-sm text-gray-600 mt-4">
      <p>
        Iterasi luar (i): {currentI}. Mencari elemen terkecil di sisa array mulai dari indeks {currentI}.
      </p>
      <p>
        Iterasi dalam (j): {currentJ}. Membandingkan elemen ke-{currentJ} (nilai:
        {valueJ}) dengan elemen terkecil saat ini (nilai: {minValue ?? "belum ditentukan"}).
      </p>
      <p>
        {minIndex !== null &&
          `Elemen terkecil saat ini berada di indeks ${minIndex} dengan nilai ${minValue}.`}
      </p>
    </div>
  )
}

export default function Home() {
  const [array, setArray] = useState<number[]>([4, 3, 5, 6, 1, 2])
  const [currentI, setCurrentI] = useState<number | null>(null)
  const [currentJ, setCurrentJ] = useState<number | null>(null)
  const [swapping, setSwapping] = useState(false)
  const [currentLine, setCurrentLine] = useState<number>(-1)
  const [isSorting, setIsSorting] = useState(false)
  const [sortedIndex, setSortedIndex] = useState<number[]>([])
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [speed, setSpeed] = useState<number>(500) // Kecepatan animasi (default 500ms)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const pauseRef = useRef<boolean>(false)

  const handleCustomArray = (input: string) => {
    const newArray = input.split(",").map((num) => parseInt(num.trim()))
    if (newArray.every((num) => !isNaN(num))) {
      setArray(newArray)
    } else {
      alert("Masukkan angka yang valid, dipisahkan dengan koma!")
    }
  }

  const selectionSort = async () => {
    if (isSorting) return
    setIsSorting(true)
    setElapsedTime(0)
    const arr = [...array]
    const n = arr.length
    setCurrentLine(0)
    await delay(speed)

    for (let i = 0; i < n - 1; i++) {
      setCurrentI(i)
      setCurrentLine(1)
      await delay(speed)

      let minIndex = i
      setCurrentLine(2)
      await delay(speed)

      for (let j = i + 1; j < n; j++) {
        while (pauseRef.current) {
          await delay(100) // Tunggu jika di-pause
        }
        setCurrentJ(j)
        setCurrentLine(3)
        await delay(speed)

        setCurrentLine(4)
        await delay(speed)

        if (arr[j] < arr[minIndex]) {
          minIndex = j
          setCurrentLine(5)
          await delay(speed)
        }
      }

      if (minIndex !== i) {
        setSwapping(true)
        setCurrentLine(7)
        await delay(speed)

        // Tukar elemen
        const temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
        setArray([...arr])
        await delay(speed)
        setSwapping(false)
      }

      setSortedIndex((prev) => [...prev, i])
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
    setElapsedTime(0)
  }

  const togglePause = () => {
    setIsPaused((prev) => !prev)
    pauseRef.current = !pauseRef.current
  }

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Visualisasi Selection Sort</h1>
      <div className="flex flex-col items-center space-y-4 w-full max-w-2xl">
        {/* Input untuk custom array */}
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

        {/* Visualisasi Array */}
        <SortingVisualizer
          array={array}
          currentI={currentI}
          currentJ={currentJ}
          swapping={swapping}
          sortedIndex={sortedIndex}
        />

        {/* Pengaturan Kecepatan */}
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

        {/* Visualisasi Kode C++ */}
        <CodeVisualizer currentLine={currentLine} />

        {/* Penjelasan Real-Time */}
        <Explanation
          currentI={currentI}
          currentJ={currentJ}
          array={array}
          minIndex={currentJ}
        />

        {/* Tombol untuk memulai sorting, pause, dan resume */}
        <div className="flex space-x-4">
          <button
            onClick={selectionSort}
            disabled={isSorting}
            className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${
              isSorting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Mulai Selection Sort
          </button>
          <button
            onClick={togglePause}
            disabled={!isSorting}
            className={`mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 ${
              !isSorting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>
    </div>
  )
}
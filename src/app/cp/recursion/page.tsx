"use client"
import { useState, useEffect } from "react"


const RecursionStack = ({ stack }: { stack: string[] }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Stack Rekursi</h3>
      <div className="flex flex-col space-y-2">
        {stack.map((call, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              index === stack.length - 1 ? "bg-yellow-500" : "bg-gray-700"
            } text-white`}
          >
            {call}
          </div>
        ))}
      </div>
    </div>
  )
}


const CodeVisualizer = ({ currentLine }: { currentLine: number }) => {
  const codeLines = [
    "int factorial(int n) {",
    "    if (n == 0 || n == 1) {",
    "        return 1;",
    "    }",
    "    return n * factorial(n - 1);",
    "}",
  ]

  const lineDescriptions = [
    "Definisi fungsi factorial.",
    "Memeriksa apakah n sama dengan 0 atau 1 (base case).",
    "Jika base case terpenuhi, kembalikan nilai 1.",
    "Akhir dari kondisi if.",
    "Mengembalikan hasil rekursif: n * factorial(n - 1).",
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


const Explanation = ({ currentCall, result }: { currentCall: string; result: number | null }) => {
  return (
    <div className="text-sm text-gray-600 mt-4">
      <p>
        Panggilan saat ini: <strong>{currentCall}</strong>
      </p>
      {result !== null && (
        <p>
          Hasil dari panggilan ini: <strong>{result}</strong>
        </p>
      )}
    </div>
  )
}

export default function Home() {
  const [number, setNumber] = useState<number>(5)
  const [stack, setStack] = useState<string[]>([])
  const [currentCall, setCurrentCall] = useState<string>("")
  const [result, setResult] = useState<number | null>(null)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [speed, setSpeed] = useState<number>(500) 
  const [currentLine, setCurrentLine] = useState<number>(-1)

  const factorial = async (n: number): Promise<number> => {
    setCurrentLine(0) 
    await delay(speed)

    setCurrentCall(`factorial(${n})`)
    setStack((prev) => [...prev, `factorial(${n})`]) 
    await delay(speed)

    if (n === 0 || n === 1) {
      setCurrentLine(1) 
      await delay(speed)

      setCurrentLine(2) 
      await delay(speed)

      setCurrentCall(`factorial(${n}) = 1`)
      setStack((prev) => [...prev.slice(0, -1)]) 
      return 1
    }

    setCurrentLine(4) 
    await delay(speed)

    const res = await factorial(n - 1)
    setCurrentCall(`factorial(${n}) = ${n} * ${res}`)
    await delay(speed)

    const finalResult = n * res
    setResult(finalResult)
    setStack((prev) => [...prev.slice(0, -1)]) 
    return finalResult
  }

  const runFactorial = async () => {
    if (isRunning) return
    setIsRunning(true)
    setResult(null)
    setStack([])
    setCurrentCall("")
    setCurrentLine(-1)
    await factorial(number)
    setIsRunning(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value)) {
      setNumber(value)
    }
  }

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Visualisasi Rekursi Faktorial (C++)</h1>
      <div className="flex flex-col items-center space-y-4 w-full max-w-2xl">
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="Masukkan angka"
            value={number}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
          <button
            onClick={runFactorial}
            disabled={isRunning}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${
              isRunning ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Hitung Faktorial
          </button>
        </div>

        <RecursionStack stack={stack} />

        <CodeVisualizer currentLine={currentLine} />

        <Explanation currentCall={currentCall} result={result} />

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
      </div>
    </div>
  )
}
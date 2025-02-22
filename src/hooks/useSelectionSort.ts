import { useState, useRef } from "react";

export function useSelectionSort(initialArray: number[]) {
  const [array, setArray] = useState(initialArray);
  const [currentI, setCurrentI] = useState<number | null>(null);
  const [currentJ, setCurrentJ] = useState<number | null>(null);
  const [swapping, setSwapping] = useState(false);
  const [sortedIndex, setSortedIndex] = useState<number[]>([]);
  const [currentLine, setCurrentLine] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [isPaused, setIsPaused] = useState(false);
  const pauseRef = useRef(false);

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const selectionSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const arr = [...array];
    setCurrentLine(0);
    await delay(speed);

    for (let i = 0; i < arr.length - 1; i++) {
      setCurrentI(i);
      setCurrentLine(1);
      await delay(speed);

      let minIndex = i;
      setCurrentLine(2);
      await delay(speed);

      for (let j = i + 1; j < arr.length; j++) {
        while (pauseRef.current) await delay(100);
        setCurrentJ(j);
        setCurrentLine(3);
        await delay(speed);

        setCurrentLine(4);
        await delay(speed);

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
          setCurrentLine(5);
          await delay(speed);
        }
      }

      if (minIndex !== i) {
        setSwapping(true);
        setCurrentLine(7);
        await delay(speed);
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setArray([...arr]);
        await delay(speed);
        setSwapping(false);
      }

      setSortedIndex((prev) => [...prev, i]);
    }

    setCurrentI(null);
    setCurrentJ(null);
    setCurrentLine(-1);
    setIsSorting(false);
  };

  const resetArray = () => {
    setArray(initialArray);
    setCurrentI(null);
    setCurrentJ(null);
    setSwapping(false);
    setCurrentLine(-1);
    setSortedIndex([]);
    setIsSorting(false);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
    pauseRef.current = !pauseRef.current;
  };

  const handleCustomArray = (input: string) => {
    const newArray = input.split(",").map((num) => parseInt(num.trim()));
    if (newArray.every((num) => !isNaN(num))) setArray(newArray);
    else alert("Masukkan angka valid, dipisah koma!");
  };

  return {
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
  };
}
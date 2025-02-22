interface CodeVisualizerProps {
    currentLine: number;
  }
  
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
  ];
  
  const lineDescriptions = [
    "Definisi fungsi selectionSort.",
    "Loop untuk iterasi i.",
    "Inisialisasi minIndex.",
    "Loop untuk cari elemen terkecil.",
    "Cek elemen lebih kecil.",
    "Update minIndex.",
    "Akhir inner loop.",
    "Inisialisasi swap.",
    "Swap arr[i] dan arr[minIndex].",
    "Salin nilai ke arr[i].",
    "Akhir outer loop.",
    "Akhir fungsi.",
  ];
  
  export default function CodeVisualizer({ currentLine }: CodeVisualizerProps) {
    return (
      <div className="mt-4 w-full">
        <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
          {codeLines.map((line, index) => (
            <div key={index} className={index === currentLine ? "bg-yellow-600" : ""}>
              {line}
            </div>
          ))}
        </pre>
        {currentLine !== -1 && (
          <div className="text-gray-600 mt-2 italic">{lineDescriptions[currentLine]}</div>
        )}
      </div>
    );
  }
export const CodeVisualizer = ({ currentLine }: { currentLine: number }) => {
    const codeLines = [
      "void bubbleSort(int arr[], int n) {",
      "    for (int i = 0; i < n - 1; i++) {",
      "        for (int j = 0; j < n - i - 1; j++) {",
      "            if (arr[j] > arr[j + 1]) {",
      "                // Swap arr[j] and arr[j + 1]",
      "                int temp = arr[j];",
      "                arr[j] = arr[j + 1];",
      "                arr[j + 1] = temp;",
      "            }",
      "        }",
      "    }",
      "}",
    ]
  
    const lineDescriptions = [
      "Definisi fungsi bubbleSort.",
      "Loop untuk iterasi i (menentukan batas sorting).",
      "Loop untuk iterasi j (membandingkan pasangan elemen).",
      "Memeriksa apakah elemen saat ini lebih besar dari elemen berikutnya.",
      "Inisialisasi pertukaran nilai (temp).",
      "Melakukan pertukaran nilai.",
      "Menyalin nilai arr[j + 1] ke arr[j].",
      "Menyalin nilai temp ke arr[j + 1].",
      "Akhir dari inner loop.",
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
  
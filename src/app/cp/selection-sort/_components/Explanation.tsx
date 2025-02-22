interface ExplanationProps {
    currentI: number | null;
    currentJ: number | null;
    array: number[];
    minIndex: number | null;
  }
  
  export default function Explanation({ currentI, currentJ, array, minIndex }: ExplanationProps) {
    if (currentI === null || currentJ === null) {
      return <div className="text-sm text-gray-600">Menunggu langkah selanjutnya...</div>;
    }
  
    const valueI = array[currentI];
    const valueJ = array[currentJ];
    const minValue = minIndex !== null ? array[minIndex] : null;
  
    return (
      <div className="text-sm text-gray-600 mt-4">
        <p>Iterasi luar (i): {currentI}. Mencari elemen terkecil dari indeks {currentI}.</p>
        <p>
          Iterasi dalam (j): {currentJ}. Bandingkan elemen {valueJ} dengan terkecil saat ini (
          {minValue ?? "belum ada"}).
        </p>
        {minIndex !== null && (
          <p>
            Elemen terkecil di indeks {minIndex} dengan nilai {minValue}.
          </p>
        )}
      </div>
    );
  }
export const Explanation = ({
    currentI,
    currentJ,
    array,
  }: {
    currentI: number | null
    currentJ: number | null
    array: number[]
  }) => {
    if (currentI === null || currentJ === null || currentJ + 1 >= array.length) {
      return <div className="text-sm text-gray-600">Menunggu langkah selanjutnya...</div>
    }
  
    const valueJ = array[currentJ]
    const valueJPlus1 = array[currentJ + 1]
  
    return (
      <div className="text-sm text-gray-600 mt-4">
        <p>
          Iterasi luar (i): {currentI}. Ini menunjukkan bahwa {currentI + 1} elemen terakhir sudah
          terurut di akhir array.
        </p>
        <p>
          Iterasi dalam (j): {currentJ}. Saat ini, kita membandingkan elemen ke-{currentJ} (nilai:
          {valueJ}) dengan elemen ke-{currentJ + 1} (nilai: {valueJPlus1}).
        </p>
        <p>
          {valueJ > valueJPlus1
            ? `Karena ${valueJ} > ${valueJPlus1}, maka kedua elemen akan ditukar.`
            : `Karena ${valueJ} <= ${valueJPlus1}, tidak ada pertukaran.`}
        </p>
      </div>
    )
  }
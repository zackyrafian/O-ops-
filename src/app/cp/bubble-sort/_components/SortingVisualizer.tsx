export const SortingVisualizer = ({
    array,
    currentJ,
    swapping,
    sortedIndex,
  }: {
    array: number[]
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
              index === currentJ || index === currentJ! + 1
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
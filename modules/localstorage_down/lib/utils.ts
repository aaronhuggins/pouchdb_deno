export function sortedIndexOf (arr: string[], item: string) {
  let low = 0
  let high = arr.length

  while (low < high) {
    const mid = (low + high) >>> 1

    if (arr[mid] < item) {
      low = mid + 1
    } else {
      high = mid
    }
  }

  return low
}

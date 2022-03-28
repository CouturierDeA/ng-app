export function calculatePaginationStart(pagination: {
  start?: number,
  rows?: number,
  numFound?: number
  // pageSizes: number[],
}, startDisplayNormalization = 0) {
  const {start, rows: rowsParam, numFound: numFoundParam} = pagination;
  const rows = Number(rowsParam);
  const numFound = Number(numFoundParam);
  const newStart = Number(start) - startDisplayNormalization;
  if(start === 0) {
    return newStart
  }
  const desiredPage = newStart * rows
  if(desiredPage > numFound) {
    return desiredPage - (desiredPage - numFound);
  }
  return desiredPage
}

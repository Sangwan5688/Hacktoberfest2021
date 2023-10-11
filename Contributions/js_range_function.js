// this function generate an Array of range between 2 points (start, end)

function range(start, stop) {
  let res = [];
  res.unshift(start);
  for (let i = start; i < stop; i++){
    res.push(start += 1);
  }
  return res;
}
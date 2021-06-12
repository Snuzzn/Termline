export default function generateTable() {
  let arr = new Array(13);
  for (var i = 0; i < 13; i++) {
    arr[i] = new Array(7);
    for (var j = 0; j < 7; j++) {
      arr[i][j] = [{}];
    }
  }

  return arr;
}

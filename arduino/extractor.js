const fs = require("fs");
const filename = "./resultsB.txt";

fs.readFile(filename, "utf8", function (err, data) {
  if (err) throw err;
  console.log("OK: " + filename);
  const lines = data.split("\n");

  const results = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("total")) {
      results.push(
        parseInt(line.substring(line.indexOf(":") + 2, line.indexOf("ms") - 1))
      );
      console.log(lines[i]);
    }
  }
  const mode = (arr) => {
    const mode = {};
    let max = 0,
      count = 0;

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];

      if (mode[item]) {
        mode[item]++;
      } else {
        mode[item] = 1;
      }

      if (count < mode[item]) {
        max = item;
        count = mode[item];
      }
    }

    return max;
  };

  const median = (arr) => {
    const { length } = arr;

    arr.sort((a, b) => a - b);

    if (length % 2 === 0) {
      return (arr[length / 2 - 1] + arr[length / 2]) / 2;
    }

    return arr[(length - 1) / 2];
  };

  const range = (arr) => {
    arr.sort((a, b) => a - b);

    return [arr[0], arr[arr.length - 1]];
  };
  const sum = results.reduce((p, c) => p + c, 0);

  console.log("B sample");
  console.log("Number of samples:", results.length);
  console.log("Mean:", sum / results.length);
  console.log("Median:", median(results));
  console.log("Mode:", mode(results));
  console.log("Range:", range(results));
});

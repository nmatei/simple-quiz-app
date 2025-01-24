const fs = require("fs");
const path = require("path");

function processContent(content: string) {
  const lines = content.split("\n");
  const processedLines: string[] = [];
  lines.forEach((line: string) => {
    const isQuestion = line.match(/^\d+\.\s/);
    if (isQuestion || line.match(/^[a-zA-Z]\)\s/)) {
      processedLines.push(isQuestion ? "\n" + line : line);
    } else if (processedLines.length > 0) {
      processedLines[processedLines.length - 1] += " " + line.trim();
    }
  });
  return processedLines.join("\n").trim();
}

function processFile(inputFilePath: string, outputFilePath: string) {
  const content = fs.readFileSync(inputFilePath, "utf-8");
  const processed = processContent(content);
  fs.writeFileSync(outputFilePath, processed);
  console.log("File processed and written to: ", outputFilePath);
}

const inputFilePath = path.join(__dirname, "prepare.txt");
const outputFilePath = path.join(__dirname, "processed.txt");

processFile(inputFilePath, outputFilePath);

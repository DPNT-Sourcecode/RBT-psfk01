#!/usr/bin/env node
import diveSync from "diveSync";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let reporter;
try {
  const nodeunit = await import("nodeunit");
  reporter = nodeunit.reporters.default;
} catch (e) {
  console.log("Cannot find nodeunit module.");
  process.exit();
}

const directoriesToTest = ["test"];

diveSync(directoriesToTest[0], { directories: true }, function (_err, file) {
  if (fs.lstatSync(file).isDirectory()) {
    directoriesToTest.push(file);
  }
});

process.chdir(__dirname);
for (const directory of directoriesToTest) {
  reporter.run([directory]);
}

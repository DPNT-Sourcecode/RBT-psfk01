#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(__filename), "..");
const coverageDir = path.join(repoRoot, "coverage");
const lcovPath = path.join(coverageDir, "lcov.info");
const summaryPath = path.join(coverageDir, "coverage-summary.json");

fs.mkdirSync(coverageDir, { recursive: true });

if (!fs.existsSync(lcovPath)) {
  console.warn(
    `No LCOV report found at ${lcovPath}, skipping summary generation.`,
  );
  process.exit(0);
}

const content = fs.readFileSync(lcovPath, "utf8");
const records = [];
for (const block of content.split("end_of_record")) {
  const record = parseRecord(block.trim());
  if (record) {
    records.push(record);
  }
}

const summary = {};
const total = createEmptyMetrics();

for (const record of records) {
  const relativePath = path.normalize(record.file);
  const metrics = buildMetrics(record);
  summary[relativePath] = metrics;
  addTo(total, metrics);
}

summary.total = total;

fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

function parseRecord(block) {
  if (!block) {
    return null;
  }
  const record = {
    file: null,
    lf: 0,
    lh: 0,
    fnf: 0,
    fnh: 0,
    brf: 0,
    brh: 0,
  };
  for (const line of block.split("\n")) {
    if (!line) continue;
    if (line.startsWith("SF:")) {
      record.file = line.slice(3).trim();
      continue;
    }
    if (line.startsWith("LF:")) {
      record.lf = Number(line.slice(3)) || 0;
      continue;
    }
    if (line.startsWith("LH:")) {
      record.lh = Number(line.slice(3)) || 0;
      continue;
    }
    if (line.startsWith("FNF:")) {
      record.fnf = Number(line.slice(4)) || 0;
      continue;
    }
    if (line.startsWith("FNH:")) {
      record.fnh = Number(line.slice(4)) || 0;
      continue;
    }
    if (line.startsWith("BRF:")) {
      record.brf = Number(line.slice(4)) || 0;
      continue;
    }
    if (line.startsWith("BRH:")) {
      record.brh = Number(line.slice(4)) || 0;
    }
  }
  return record.file ? record : null;
}

function buildMetrics(record) {
  return {
    lines: metric(record.lf, record.lh),
    statements: metric(record.fnf, record.fnh),
    functions: metric(record.fnf, record.fnh),
    branches: metric(record.brf, record.brh),
    branchesTrue: metric(0, 0),
  };
}

function metric(total, covered) {
  return {
    total,
    covered,
    skipped: 0,
    pct: total === 0 ? "Unknown" : ((covered / total) * 100).toFixed(2),
  };
}

function createEmptyMetrics() {
  return {
    lines: metric(0, 0),
    statements: metric(0, 0),
    functions: metric(0, 0),
    branches: metric(0, 0),
    branchesTrue: metric(0, 0),
  };
}

function addTo(target, metrics) {
  for (const key of Object.keys(metrics)) {
    const source = metrics[key];
    const dest = target[key];
    dest.total += source.total;
    dest.covered += source.covered;
    dest.pct =
      dest.total === 0
        ? "Unknown"
        : ((dest.covered / dest.total) * 100).toFixed(2);
  }
}

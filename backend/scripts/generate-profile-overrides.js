/**
 * One-time script: fetches the current faculty list from Purdue ECE and writes
 * backend/profile-overrides.json with one entry per faculty and temp links.
 * Replace the temp values with real profile URLs, then restart the server.
 *
 * Run from repo root: node backend/scripts/generate-profile-overrides.js
 */

import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { scrapeFacultyList } from "../scraper.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log("Fetching faculty list from Purdue ECE...");
  const facultyList = await scrapeFacultyList();
  console.log(`Found ${facultyList.length} faculty members.`);

  const overrides = {};
  for (const f of facultyList) {
    overrides[f.name] = {
      website: "https://example.com/REPLACE_WITH_REAL_LINK",
      profileUrl: "https://example.com/REPLACE_WITH_REAL_LINK",
    };
  }

  const outPath = path.join(__dirname, "..", "profile-overrides.json");
  writeFileSync(outPath, JSON.stringify(overrides, null, 2), "utf8");
  console.log(`Wrote ${outPath}. Replace temp links with real URLs.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

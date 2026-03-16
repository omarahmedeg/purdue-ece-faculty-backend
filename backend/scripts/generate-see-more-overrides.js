/**
 * Fetches the current faculty list and writes backend/see-more-overrides.json
 * with one entry per faculty and a temp "see more" link. Replace those with
 * real URLs (e.g. Google Scholar or OpenAlex author page) for the "see more"
 * button when a professor has more than 5 articles.
 *
 * Run from repo root: node backend/scripts/generate-see-more-overrides.js
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
      seeMoreUrl: "https://example.com/REPLACE_WITH_REAL_LINK",
    };
  }

  const outPath = path.join(__dirname, "..", "see-more-overrides.json");
  writeFileSync(outPath, JSON.stringify(overrides, null, 2), "utf8");
  console.log(`Wrote ${outPath}. Replace seeMoreUrl with real links.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

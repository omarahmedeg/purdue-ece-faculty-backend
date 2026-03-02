import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_PATH = join(__dirname, "data", "cache.json");

/**
 * Read the cache from disk.
 * Returns { facultyData, scholarData, lastScraped }.
 */
export function readCache() {
  try {
    if (!existsSync(CACHE_PATH)) {
      return { facultyData: [], scholarData: {}, lastScraped: null };
    }
    const raw = readFileSync(CACHE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      facultyData: parsed.facultyData || [],
      scholarData: parsed.scholarData || {},
      lastScraped: parsed.lastScraped || null,
    };
  } catch (err) {
    console.error("Failed to read cache:", err.message);
    return { facultyData: [], scholarData: {}, lastScraped: null };
  }
}

/**
 * Write updated data to the cache file.
 * @param {{ facultyData: any[], scholarData: object, lastScraped: string|null }} data
 */
export function writeCache({ facultyData, scholarData, lastScraped }) {
  try {
    const payload = JSON.stringify(
      { facultyData, scholarData, lastScraped },
      null,
      2,
    );
    writeFileSync(CACHE_PATH, payload, "utf-8");
    console.log(`Cache written to ${CACHE_PATH}`);
  } catch (err) {
    console.error("Failed to write cache:", err.message);
  }
}

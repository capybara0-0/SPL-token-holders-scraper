import { fetchTokenAccountsByOwner } from "./clients/fetchTokenAccountsByOwner.js";
import { streamAddressesFromDatabase } from "./utils/streamAddressesFromDatabase.js";
import { updateDataBaseStatus } from "./utils/updateDatabaseStatus.js";
import { TEXT_FILE_NAME } from "./constants/constant.js";
import { checkFileExistence } from "./utils/checkFileExistence.js";
import { initializeDatabase } from "./utils/initializeDatabase.js";
import { streamAddressesFromFile } from "./utils/streamAddressesFromFile.js";

// db.pragma("journal_mode = WAL");

// (async () => {
//   for await (const batch of streamAddressesFromDatabase("pending", 2)) {
//     await Promise.all(
//       batch.map(async (row) => {
//         try {
//           const data = await fetchTokenAccountsByOwner(row.publicKey);
//           updateDataBaseStatus(row.id, "success");
//           // console.log(data);
//         } catch (error) {
//           updateDataBaseStatus(row.id, "failed");
//         }
//       })
//     );
//   }
// })();

async function main() {
  try {
    const startTime = performance.now();
    const fileExists = await checkFileExistence();
    const dbInitialized = await initializeDatabase();

    if (!fileExists || !dbInitialized) return;
    const addressStreamed = await streamAddressesFromFile();
    if (!addressStreamed) return;

    const endTime = performance.now();
    console.log(`Execution time: ${(endTime - startTime).toFixed(2)} ms`);
  } catch (error) {
    console.error("error in main function", error);
  }
}

await main();

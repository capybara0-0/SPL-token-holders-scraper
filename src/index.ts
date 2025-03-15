import { fetchTokenAccountsByOwner } from "./clients/fetchTokenAccountsByOwner.js";
import { streamAddressesFromDatabase } from "./utils/streamAddressesFromDatabase.js";
import { updateDataBaseStatus } from "./utils/updateDatabaseStatus.js";
import { checkFileExistence } from "./utils/checkFileExistence.js";
import { initializeDatabase } from "./utils/initializeDatabase.js";
import { streamAddressesFromFile } from "./utils/streamAddressesFromFile.js";
import { createExcelSheet } from "./utils/initializeExcelSheet.js";
import { insertFetchedDataIntoExcel } from "./utils/insertFetchedDataIntoExcel.js";
import { fetchedDataFromApi } from "./models/interfaces.js";

// db.pragma("journal_mode = WAL");

async function main() {
  let successFetchedData: fetchedDataFromApi[] = [];

  try {
    const startTime = performance.now();

    const fileExists = await checkFileExistence();
    const dbInitialized = await initializeDatabase();
    const excelInitialized = await createExcelSheet();

    if (!fileExists || !dbInitialized || !excelInitialized) return;
    const addressStreamed = await streamAddressesFromFile();
    if (!addressStreamed) return;

    for await (const batch of streamAddressesFromDatabase("pending", 5)) {
      await Promise.all(
        batch.map(async (row) => {
          try {
            const data = await fetchTokenAccountsByOwner(row.publicKey);
            // updateDataBaseStatus(row.id, "success");
            successFetchedData.push(data as fetchedDataFromApi);
            if (successFetchedData.length >= 6) {
              insertFetchedDataIntoExcel(successFetchedData);
              successFetchedData = [];
            }
          } catch (error) {
            // updateDataBaseStatus(row.id, "failed");
            console.error("error in main function");
          }
        })
      );
    }

    if (successFetchedData.length > 0) {
      insertFetchedDataIntoExcel(successFetchedData);
      console.log(`Final batch of fetched data added to excelsheet.`);
    }

    const endTime = performance.now();
    console.log(`Execution time: ${(endTime - startTime).toFixed(2)} ms`);
  } catch (error) {
    console.error("error in main function", error);
  }
}
await main();

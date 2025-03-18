import { checkFileExistence } from "./utils/checkFileExistence.js";
import { createExcelSheet } from "./utils/initializeExcelSheet.js";
import { fetchedDataFromApi } from "./models/interfaces.js";
import { fetchTokenAccountsByOwner } from "./clients/fetchTokenAccountsByOwner.js";
import { initializeDatabase } from "./utils/initializeDatabase.js";
import { insertFetchedDataIntoExcel } from "./utils/insertFetchedDataIntoExcel.js";
import { streamAddressesFromDatabase } from "./utils/streamAddressesFromDatabase.js";
import { streamAddressesFromFile } from "./utils/streamAddressesFromFile.js";
import chalk from "chalk";

async function main() {
  console.log(chalk.yellow(`[START] Main program started.`));
  let successFetchedData: fetchedDataFromApi[] = [];

  try {
    // Checking requirements
    const [fileExists, dbInitialized, excelInitialized] = await Promise.all([
      checkFileExistence(),
      initializeDatabase(),
      createExcelSheet(),
    ]);
    if (!fileExists || !dbInitialized || !excelInitialized) return;

    // Stream addresses from file
    const addressStreamed = await streamAddressesFromFile();
    if (!addressStreamed) return;

    // Process batches from the database
    for await (const batch of streamAddressesFromDatabase("pending", 5)) {
      await Promise.all(
        batch.map(async (row) => {
          try {
            const data = await fetchTokenAccountsByOwner(row.publicKey);
            successFetchedData.push(data as fetchedDataFromApi);

            // Insert data into Excel if batch size is reached.
            if (successFetchedData.length >= 6) {
              insertFetchedDataIntoExcel(successFetchedData);
              successFetchedData = [];
            }
          } catch (error) {
            console.error("error in main function");
          }
        })
      );
    }

    // Insert any remaining data into Excel.
    if (successFetchedData.length > 0) {
      insertFetchedDataIntoExcel(successFetchedData);
    }

    console.log(chalk.yellow(`[END] Main program completed.`));
  } catch (error) {
    console.error(chalk.red("Error in main function: "), error);
  }
}

await main();

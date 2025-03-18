import * as fs from "fs";
import * as readline from "readline";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { insertAddressIntoDatabase } from "./insertAddressIntoDatabase.js";
import { validateAddress } from "./helpers.js";
import { DB_FILE_PATH, TEXT_FILE_PATH } from "../constants/constant.js";
import chalk from "chalk";

export async function streamAddressesFromFile(): Promise<boolean> {
  try {
    const fileStream = fs.createReadStream(TEXT_FILE_PATH);

    const batchLimit = 5;
    const db = await open({
      filename: DB_FILE_PATH,
      driver: sqlite3.Database,
    });
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    let batchedAddresses: string[] = [];
    let invalidAddressCount = 0;

    for await (const line of rl) {
      const address = line.trim();
      if (!address) continue;
      if (validateAddress(address)) {
        batchedAddresses.push(address);
        if (batchedAddresses.length >= batchLimit) {
          await insertAddressIntoDatabase(batchedAddresses, db).then(() => {
            batchedAddresses = [];
          });
        }
      } else {
        invalidAddressCount++;
      }
    }

    if (batchedAddresses.length > 0) {
      await insertAddressIntoDatabase(batchedAddresses, db);
    }
    console.log(
      "Total invalid address count: ",
      chalk.yellow(invalidAddressCount)
    );
    db.close();
    return true;
  } catch (error) {
    console.error(chalk.red("Error in streadAddressesFromFile: "), error);
    return false;
  }
}

import * as fs from "fs";
import * as readline from "readline";
import * as path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { insertAddressIntoDatabase } from "./insertAddressIntoDatabase.js";
import { validateAddress } from "./helpers.js";
import { TEXT_FILE_NAME } from "../constants/constant.js";

export async function streamAddressesFromFile(
  fileName: string = TEXT_FILE_NAME
): Promise<boolean> {
  try {
    const filePath = path.join(process.cwd(), fileName);
    const fileStream = fs.createReadStream(filePath);
    const DB_NAME = path.join(process.cwd(), "SOLANA_ADDRESSES.DB");
    const batchLimit = 10000;
    const db = await open({
      filename: DB_NAME,
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
            console.log("batch of address inserted.");
            batchedAddresses = [];
          });
        }
      } else {
        invalidAddressCount++;
      }
    }

    if (batchedAddresses.length > 0) {
      await insertAddressIntoDatabase(batchedAddresses, db).then(() => {
        console.log("Adding final batch");
      });
    }
    console.log("total invalid address count: ", invalidAddressCount);
    return true;
  } catch (error) {
    console.error(
      "Error while streaming addresses from textfile to database: ",
      error
    );
    return false;
  }
}

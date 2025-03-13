import * as fs from "fs";
import * as readline from "readline";
import * as path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { insertAddressIntoDatabase } from "./insertAddressIntoDatabase.js";
import { validateAddress } from "./helpers.js";

export async function streamAddressesFromFile(
  fileName: string
): Promise<boolean> {
  const filePath = path.join(process.cwd(), fileName);
  const fileStream = fs.createReadStream(filePath);
  const DB_NAME = path.join(process.cwd(), "SOLANA_ADDRESSES.DB");
  const batchLimit = 2;
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
          console.log("A batch of address added.");
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
  console.log(batchedAddresses.length);
  console.log("total invalid address count: ", invalidAddressCount);
  return true;
}

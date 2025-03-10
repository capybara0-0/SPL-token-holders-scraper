import { isAddress } from "@solana/kit";
import pLimit from "p-limit";
import * as fs from "fs";
import * as readline from "readline";
import * as path from "path";

export async function streamAddressesFromFile(
  fileName: string,
  concurrency: number
): Promise<boolean> {
  const filePath = path.join(process.cwd(), fileName);
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const limit = pLimit(concurrency);

  const validationPromises: Promise<void>[] = [];
  let invalidAddressCount = 0;

  for await (const line of rl) {
    const address = line.trim();

    if (!address) continue;

    validationPromises.push(
      limit(async () => {
        const isValid = validateAddress(address);
        if (!isValid) {
          invalidAddressCount++;
        }
      })
    );
  }

  rl.close();

  await Promise.all(validationPromises);

  console.log(
    `All addresses processed. Total invalid Addresses: ${invalidAddressCount}`
  );

  return true;
}

function validateAddress(address: string): boolean {
  return isAddress(address);
}

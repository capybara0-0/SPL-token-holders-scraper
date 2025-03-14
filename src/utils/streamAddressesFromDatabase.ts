import { db } from "../constants/constant.js";
import { streamedDataFromDatabase } from "../models/interfaces.js";

export async function* streamAddressesFromDatabase(
  status: string,
  batchSize: number = 5
): AsyncGenerator<streamedDataFromDatabase[], void, void> {
  try {
    let batchedData: streamedDataFromDatabase[] = [];
    const query = `
      SELECT id, publicKey, status
      FROM solana_addresses
      WHERE status = ?
    `;
    const stmt = db.prepare(query);

    for (const row of stmt.iterate(status)) {
      batchedData.push(row as streamedDataFromDatabase);

      if (batchedData.length === batchSize) {
        yield batchedData;
        batchedData = [];
      }
    }

    if (batchedData.length > 0) {
      yield batchedData;
    }
  } catch (error) {
    console.error("Error streaming addresses:", error);
  }
}

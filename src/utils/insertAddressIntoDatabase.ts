import { Database } from "sqlite";

export async function insertAddressIntoDatabase(
  batchAddress: string[],
  db: Database
): Promise<void> {
  try {
    const sqlStatement = await db.prepare(
      "INSERT INTO solana_addresses (publicKey) VALUES (?)"
    );
    for (const address of batchAddress) {
      await sqlStatement.run(address);
    }
    await sqlStatement.finalize();
  } catch (error) {
    console.error("Error inserting batch: ", error);
    throw error;
  }
}

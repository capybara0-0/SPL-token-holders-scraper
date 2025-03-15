import Database from "better-sqlite3";
import { DB_FILE_NAME } from "../constants/constant.js";

const db = new Database(DB_FILE_NAME);
export function updateDataBaseStatus(
  id: number,
  newStatus: "success" | "failed"
) {
  try {
    const sqlStatement = db.prepare(
      `UPDATE solana_addresses SET status = ? WHERE id = ?`
    );
    const result = sqlStatement.run(newStatus, id);

    if (result.changes === 0) {
      console.log(`Failed to update the status for row ${id}`);
    } else {
      console.log(`Updated status for row ${id} to ${newStatus}`);
    }
  } catch (error) {
    console.error(`Failed to update status for row ${id}}. `, error);
  }
}

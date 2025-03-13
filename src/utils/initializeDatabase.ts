import * as fs from "fs";
import * as path from "path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

export async function initializeDatabase(
  fileName: string,
  schemaFilePath: string
): Promise<boolean> {
  const FILE_NAME = path.join(process.cwd(), fileName);
  const SCHEMA_FILE_PATH = path.join(process.cwd(), schemaFilePath);
  const DB_FILE_EXISTS = fs.existsSync(FILE_NAME);
  const SCHEMA_FILE_EXISTS = fs.existsSync(SCHEMA_FILE_PATH);

  try {
    if (!DB_FILE_EXISTS && !SCHEMA_FILE_EXISTS) {
      console.error(
        "Database and Schema file does not exist, exiting the program.\n(Atleast 1 is required)"
      );
      process.exit(1);
    }

    const db = await open({
      filename: FILE_NAME,
      driver: sqlite3.Database,
    });

    if (DB_FILE_EXISTS) {
      await db.exec("DELETE FROM solana_addresses");
      await db.exec(
        "DELETE FROM sqlite_sequence WHERE name = 'solana_addresses'"
      );
      console.log(`DataBase already exists. Wiping old data.`);
      await db.close();
      return true;
    } else {
      const schemaSQL = fs.readFileSync(SCHEMA_FILE_PATH, "utf-8");
      console.log("Schema file read sucessfully");

      await db.exec(schemaSQL);
      console.log("Schema executed successfully");

      await db.close();
      return true;
    }
  } catch (error) {
    console.error("Unknown error during initializing Database: ", error);
    return false;
  }
}

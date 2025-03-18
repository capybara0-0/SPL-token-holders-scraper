import * as fs from "fs";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import chalk from "chalk";
import { DB_FILE_PATH, SCHEMA_FILE_PATH } from "../constants/constant.js";

export async function initializeDatabase(): Promise<boolean> {
  const DB_FILE_EXISTS = fs.existsSync(DB_FILE_PATH);
  const SCHEMA_FILE_EXISTS = fs.existsSync(SCHEMA_FILE_PATH);

  try {
    if (!DB_FILE_EXISTS && !SCHEMA_FILE_EXISTS) {
      console.error(
        chalk.red(
          "Database and Schema file does not exist, exiting the program.\n(Atleast one of the file is required.)"
        )
      );
      process.exit(1);
    }

    const db = await open({
      filename: DB_FILE_PATH,
      driver: sqlite3.Database,
    });

    if (DB_FILE_EXISTS) {
      const tableExists = await db.get(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'solana_addresses'"
      );
      if (tableExists) {
        await db.exec("DELETE FROM solana_addresses");
        await db.exec(
          "DELETE FROM sqlite_sequence WHERE name = 'solana_addresses'"
        );
        console.log(
          chalk.green(`Database already exists. Cleaned old records.`)
        );
      } else {
        const schemaSQL = fs.readFileSync(SCHEMA_FILE_PATH, "utf-8");
        console.log(
          chalk.blue(
            `Database exists but does not contain the "solana_addresses" table.`
          )
        );
        await db.exec(schemaSQL);
        console.log(chalk.green(`Schema executed successfully.`));
      }

      await db.close();
      return true;
    } else {
      const schemaSQL = fs.readFileSync(SCHEMA_FILE_PATH, "utf-8");
      console.log("Schema file read sucessfully.");

      await db.exec(schemaSQL);
      console.log(chalk.green("Schema executed successfully."));
      await db.close();
      return true;
    }
  } catch (error) {
    console.error(chalk.red("Error during initializing Database: "), error);
    return false;
  }
}

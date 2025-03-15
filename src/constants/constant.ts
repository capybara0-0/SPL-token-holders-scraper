import path from "path";

export const RPC_URI: string = "";

export const TARGET_TOKEN_MINT_ADDRESS: string =
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

export const SPL_TOKEN_PROGRAM_ID: string =
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

export const TEXT_FILE_NAME: string = "addresses.txt";
export const DB_FILE_NAME: string = "solana_addresses.db";

// FOR DEVELOPERS
export const TEXT_FILE_PATH = path.join(process.cwd(), TEXT_FILE_NAME);
export const DB_FILE_PATH = path.join(process.cwd(), DB_FILE_NAME);
export const SCHEMA_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "models",
  "solana_addresses.sql"
);
export const XLSX_FILE_PATH = path.join(
  process.cwd(),
  `${TARGET_TOKEN_MINT_ADDRESS}.xlsx`
);

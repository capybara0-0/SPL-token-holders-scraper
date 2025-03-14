import Database from "better-sqlite3";

// FOR DEVELOPERS
export const db = new Database("SOLANA_ADDRESSES.DB");

export const RPC_URI: string = "";

export const TARGET_TOKEN_MINT_ADDRESS: string =
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

export const TEST_ADDRESS: string =
  "6JKi6Vc45f2fW9TZB8EhXVKCrkoMFQXJbCvwMPjzBmdW";

export const SPL_TOKEN_PROGRAM_ID: string =
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

export const TEXT_FILE_NAME: string = "addresses.txt";

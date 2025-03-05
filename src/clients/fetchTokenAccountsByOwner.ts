import { address } from "@solana/kit";
import { CONNECTION } from "./connection";
import { TARGET_TOKEN_MINT_ADDRESS, TEST_ADDRESS } from "../constants/constant";

const OWNER_ADDRESS = address(TEST_ADDRESS);
const SPL_TOKEN_MINT_ADDRESS = address(TARGET_TOKEN_MINT_ADDRESS);

const ACCOUNT_FILTERS = { mint: SPL_TOKEN_MINT_ADDRESS };

const CONFIG = {
  dataSlice: { offset: 0, length: 32 },
  encoding: "base64",
};

export async function fetchTokenAccountsByOwner() {
  try {
    const data = await CONNECTION.getTokenAccountsByOwner(
      OWNER_ADDRESS,
      ACCOUNT_FILTERS,
      CONFIG
    ).send();
    console.log(data);
  } catch (error) {
    console.error("Error in fetchTokenAccountsByOwner", error);
  }
}

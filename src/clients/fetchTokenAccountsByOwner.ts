import { address } from "@solana/kit";
import { CONNECTION } from "./connection.js";
import { TARGET_TOKEN_MINT_ADDRESS } from "../constants/constant.js";

const SPL_TOKEN_MINT_ADDRESS = address(TARGET_TOKEN_MINT_ADDRESS);
const ACCOUNT_FILTERS = { mint: SPL_TOKEN_MINT_ADDRESS };

export async function fetchTokenAccountsByOwner(owner_address: string) {
  const OWNER_ADDRESS = address(owner_address);

  try {
    const response = await CONNECTION.getTokenAccountsByOwner(
      OWNER_ADDRESS,
      ACCOUNT_FILTERS,
      { encoding: "jsonParsed" }
    ).send();

    const ownerAddress: string = OWNER_ADDRESS;
    const associatedTokenAccount: string = response.value[0].pubkey;
    const tokenAmount: number =
      response.value[0].account.data.parsed.info.tokenAmount.uiAmount ?? 0;
    const tokenAccountState: string =
      response.value[0].account.data.parsed.info.state;

    return {
      ownerAddress,
      associatedTokenAccount,
      tokenAmount,
      tokenAccountState,
    };
  } catch (error) {
    console.error("Error in fetchTokenAccountByOwner: ", error);
  }
}

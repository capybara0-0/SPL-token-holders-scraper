import { address } from "@solana/kit";
import { CONNECTION } from "./connection";
import { TARGET_TOKEN_MINT_ADDRESS } from "../constants/constant";

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
    console.log("owner address: ", OWNER_ADDRESS);
    console.log("associated token address: ", response.value[0].pubkey);
    console.log(
      "token amount: ",
      response.value[0].account.data.parsed.info.tokenAmount.uiAmount
    );
    console.log(
      "token account state: ",
      response.value[0].account.data.parsed.info.state
    );
  } catch (error) {
    console.error("Error in fetchTokenAccountsByOwner", error);
  }
}

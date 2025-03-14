import { address } from "@solana/kit";
import { CONNECTION } from "./connection.js";
import { TARGET_TOKEN_MINT_ADDRESS } from "../constants/constant.js";
import { ErrorResponse, TokenAccountInfo } from "../models/interfaces.js";

const SPL_TOKEN_MINT_ADDRESS = address(TARGET_TOKEN_MINT_ADDRESS);
const ACCOUNT_FILTERS = { mint: SPL_TOKEN_MINT_ADDRESS };

type FetchTokenAccountsByOwnerResponse = TokenAccountInfo | ErrorResponse;

export async function fetchTokenAccountsByOwner(
  owner_address: string
): Promise<FetchTokenAccountsByOwnerResponse> {
  const OWNER_ADDRESS = address(owner_address);

  try {
    const response = await CONNECTION.getTokenAccountsByOwner(
      OWNER_ADDRESS,
      ACCOUNT_FILTERS,
      { encoding: "jsonParsed" }
    ).send();

    const ownerAddress: string = OWNER_ADDRESS;
    const associatedTokenAddress: string = response.value[0].pubkey;
    const tokenAmount: number =
      response.value[0].account.data.parsed.info.tokenAmount.uiAmount ?? 0;
    const tokenAccountState: string =
      response.value[0].account.data.parsed.info.state;

    return {
      ownerAddress,
      associatedTokenAddress,
      tokenAmount,
      tokenAccountState,
    };

    // [ for testing purposes ]
    // console.log("owner address: ", OWNER_ADDRESS);
    // console.log("associated token address: ", response.value[0].pubkey);
    // console.log(
    //   "token amount: ",
    //   response.value[0].account.data.parsed.info.tokenAmount.uiAmount
    // );
    // console.log(
    //   "token account state: ",
    //   response.value[0].account.data.parsed.info.state
    // );
  } catch (error: any) {
    return {
      error: `Error in fetchTokenAccountsByOwner: ${error.message || error}`,
    };
  }
}

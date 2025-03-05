import { createSolanaRpc } from "@solana/kit";
import { RPC_URI } from "../constants/constant";

export const CONNECTION = createSolanaRpc(RPC_URI);

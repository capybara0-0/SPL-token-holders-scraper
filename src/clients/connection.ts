import { createSolanaRpc } from "@solana/kit";
import { RPC_URI } from "../constants/constant.js";

export const CONNECTION = createSolanaRpc(RPC_URI);

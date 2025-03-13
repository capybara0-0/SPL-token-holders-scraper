import { isAddress } from "@solana/kit";

export function validateAddress(address: string): boolean {
  return isAddress(address);
}

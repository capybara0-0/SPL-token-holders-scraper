export type ReadAddressesFromFileResult =
  | { success: true; address: string[] }
  | { success: false; errorMessage: string };

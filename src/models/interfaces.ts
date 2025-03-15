export interface TokenAccountInfo {
  ownerAddress: string;
  associatedTokenAddress: string;
  tokenAmount: number;
  tokenAccountState: string;
}

export interface ErrorResponse {
  error: string;
}

export interface streamedDataFromDatabase {
  id: number;
  publicKey: string;
  status: string;
}

export interface fetchedDataFromApi {
  ownerAddress: string;
  associatedTokenAccount: string;
  tokenAmount: number;
  tokenAccountState: string;
}

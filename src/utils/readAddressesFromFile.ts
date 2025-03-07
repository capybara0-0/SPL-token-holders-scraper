import * as fs from "fs/promises";
import * as path from "path";
import { ReadAddressesFromFileResult } from "../models/types";

export async function readAddressesFromFile(
  fileName: string
): Promise<ReadAddressesFromFileResult> {
  try {
    const filePath = path.join(process.cwd(), fileName);
    const fileContent = await fs.readFile(filePath, "utf-8");

    const addresses = fileContent
      .split(/\r?\n/)
      .map((addr) => addr.trim())
      .filter((addr) => addr.length > 0);

    return { success: true, address: addresses };
  } catch (error) {
    let message = "An unexpected error occured while reading the file.";

    if (error instanceof Error && "code" in error) {
      switch (error.code) {
        case "ENOENT":
          message = `Error: ENOENT: No such file or directory, open ${path.join(
            process.cwd(),
            fileName
          )}`;
          break;
        case "EACCES":
          message = `Error: EACCES: Permission denied, cannot read the file ${fileName}.`;
          break;
        case "EISDIR":
          message = `Error: EISDIR: The provided path ${fileName} is a directory, not a file.`;
          break;
        default:
          message = `Error: ${error.message}`;
          break;
      }
    }
    return {
      success: false,
      errorMessage: message,
    };
  }
}

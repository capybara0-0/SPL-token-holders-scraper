import path from "path";
import * as fs from "fs/promises";
import { TEXT_FILE_NAME } from "../constants/constant.js";

export async function checkFileExistence(
  fileName: string = TEXT_FILE_NAME
): Promise<boolean> {
  console.log(`Starting file existence check...`);

  const filePath = path.join(process.cwd(), fileName);

  try {
    await fs.access(filePath, fs.constants.F_OK);
    console.log("File exists.");
    return true;
  } catch (error) {
    const errnoException = error as NodeJS.ErrnoException;

    switch (errnoException.code) {
      case "ENOENT":
        console.log(
          `Error: The file "${fileName}" does not exist in the current working directory.`
        );
        break;
      case "EACCES":
        console.log(
          `Error: Permission denied while accessing the file "${fileName}". `
        );
        break;
      default:
        console.log(
          `Error while checking file "${fileName}": `,
          errnoException.message
        );
        break;
    }
    return false;
  }
}

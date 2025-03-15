import * as fs from "fs/promises";
import { TEXT_FILE_NAME, TEXT_FILE_PATH } from "../constants/constant.js";

export async function checkFileExistence(): Promise<boolean> {
  console.log(`Starting file existence check...`);

  try {
    await fs.access(TEXT_FILE_PATH, fs.constants.F_OK);
    console.log("File exists.");
    return true;
  } catch (error) {
    const errnoException = error as NodeJS.ErrnoException;

    switch (errnoException.code) {
      case "ENOENT":
        console.log(
          `Error: The file "${TEXT_FILE_NAME}" does not exist in the current working directory.`
        );
        break;
      case "EACCES":
        console.log(
          `Error: Permission denied while accessing the file "${TEXT_FILE_NAME}". `
        );
        break;
      default:
        console.log(
          `Error while checking file "${TEXT_FILE_NAME}": `,
          errnoException.message
        );
        break;
    }
    return false;
  }
}
